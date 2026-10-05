import { timingSafeEqual } from 'crypto'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'
import { checkBotId } from 'botid/server'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { Form } from '@/payload-types'
import { FORMS_PUBLICLY_ENABLED, FORMS_PREVIEW_HEADER } from '@/lib/forms'

type SubmissionField = {
  field: string
  label: string
  value: string
}

const MAX_FIELDS = 50
const MAX_VALUE_LENGTH = 5000
const EMAIL_LIST_PATTERN = /^[^\s@,]+@[^\s@,]+\.[^\s@,]+(\s*,\s*[^\s@,]+@[^\s@,]+\.[^\s@,]+)*$/

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function isPreviewTokenValid(request: NextRequest): boolean {
  const expected = process.env.FORMS_PREVIEW_TOKEN
  const received = request.headers.get(FORMS_PREVIEW_HEADER)
  if (!expected || !received) return false

  const expectedBuffer = Buffer.from(expected)
  const receivedBuffer = Buffer.from(received)
  return (
    expectedBuffer.length === receivedBuffer.length &&
    timingSafeEqual(expectedBuffer, receivedBuffer)
  )
}

// Keeps only fields defined on the form, so clients cannot inject extra placeholders or data
function parseSubmission(form: Form, raw: unknown): SubmissionField[] | string {
  if (!Array.isArray(raw) || raw.length > MAX_FIELDS) return 'Invalid submission data'

  const received = new Map<string, string>()
  for (const entry of raw) {
    if (!entry || typeof entry !== 'object') return 'Invalid submission data'
    const { field, value } = entry as Record<string, unknown>
    if (typeof field !== 'string' || typeof value !== 'string') return 'Invalid submission data'
    if (value.length > MAX_VALUE_LENGTH) return `Value for "${field}" is too long`
    received.set(field, value.trim())
  }

  const submission: SubmissionField[] = []
  for (const definition of form.fields ?? []) {
    if (!('name' in definition) || !definition.name) continue
    const value = received.get(definition.name) ?? ''
    const isRequired = 'required' in definition && Boolean(definition.required)
    if (isRequired && !value) return `Missing required field "${definition.name}"`
    if (definition.blockType === 'email' && value && !EMAIL_LIST_PATTERN.test(value)) {
      return `Invalid email in "${definition.name}"`
    }
    if (value) {
      submission.push({ field: definition.name, label: definition.label || definition.name, value })
    }
  }

  return submission
}

function buildTableHtml(submission: SubmissionField[]): string {
  return submission
    .map(
      ({ label, value }) =>
        `<tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">${escapeHtml(label)}</td><td style="padding: 8px; border: 1px solid #ddd; white-space: pre-wrap;">${escapeHtml(value)}</td></tr>`,
    )
    .join('')
}

function buildEmailHtml(formTitle: string, submission: SubmissionField[]): string {
  const submittedAt = new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3d426a;">New Form Submission: ${escapeHtml(formTitle)}</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <thead>
          <tr style="background-color: #f5f5f5;">
            <th style="padding: 12px; border: 1px solid #ddd; text-align: left;">Field</th>
            <th style="padding: 12px; border: 1px solid #ddd; text-align: left;">Value</th>
          </tr>
        </thead>
        <tbody>
          ${buildTableHtml(submission)}
        </tbody>
      </table>
      <p style="color: #666; margin-top: 20px; font-size: 12px;">
        Submitted at: ${submittedAt}
      </p>
    </div>
  `
}

// Replaces {{field}}, {{*}} and {{*:table}} placeholders (Payload form-builder syntax)
function fillTemplate(template: string, submission: SubmissionField[], asHtml: boolean): string {
  const format = (value: string) => (asHtml ? escapeHtml(value) : value)
  let result = template

  for (const { field, value } of submission) {
    result = result.split(`{{${field}}}`).join(format(value))
  }

  if (result.includes('{{*:table}}')) {
    const tableHtml = `<table style="width: 100%; border-collapse: collapse;">${buildTableHtml(submission)}</table>`
    result = result.split('{{*:table}}').join(asHtml ? tableHtml : '')
  }

  if (result.includes('{{*}}')) {
    const allData = submission
      .map(({ label, value }) => `${format(label)}: ${format(value)}`)
      .join(asHtml ? '<br>' : '\n')
    result = result.split('{{*}}').join(allData)
  }

  return result
}

// A CMS message without placeholders would otherwise drop the submitted data entirely
function buildMessageHtml(
  messageHtml: string,
  formTitle: string,
  submission: SubmissionField[],
): string {
  if (messageHtml.includes('{{')) return fillTemplate(messageHtml, submission, true)
  return messageHtml + buildEmailHtml(formTitle, submission)
}

function fillAddressTemplate(
  template: string | null | undefined,
  submission: SubmissionField[],
): string | undefined {
  if (!template) return undefined
  const filled = fillTemplate(template, submission, false).trim()
  return EMAIL_LIST_PATTERN.test(filled) ? filled : undefined
}

function fillSubjectTemplate(template: string, submission: SubmissionField[]): string {
  return fillTemplate(template, submission, false).replace(/[\r\n]+/g, ' ')
}

export async function POST(request: NextRequest) {
  if (!FORMS_PUBLICLY_ENABLED && !isPreviewTokenValid(request)) {
    return NextResponse.json({ error: 'Form submissions temporarily disabled' }, { status: 503 })
  }

  try {
    const { isBot } = await checkBotId()
    if (isBot) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    const body = (await request.json().catch(() => null)) as Record<string, unknown> | null
    if (!body?.form || !body.submissionData) {
      return NextResponse.json(
        { error: 'Missing required fields: form and submissionData' },
        { status: 400 },
      )
    }

    const formId = typeof body.form === 'number' ? body.form : parseInt(String(body.form), 10)
    if (isNaN(formId)) {
      return NextResponse.json({ error: 'Invalid form ID' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })
    const form = await payload
      .findByID({ collection: 'forms', id: formId, depth: 0 })
      .catch(() => null)
    if (!form) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 })
    }

    const submission = parseSubmission(form, body.submissionData)
    if (typeof submission === 'string') {
      return NextResponse.json({ error: submission }, { status: 400 })
    }

    const adminEmail = process.env.FORM_NOTIFICATION_EMAIL || process.env.RESEND_FROM_EMAIL

    if (form.emails && form.emails.length > 0) {
      for (const emailConfig of form.emails) {
        const emailTo = fillAddressTemplate(emailConfig.emailTo, submission) ?? adminEmail
        if (!emailTo) continue

        const messageHtml = emailConfig.message
          ? buildMessageHtml(
              convertLexicalToHTML({ data: emailConfig.message as SerializedEditorState }),
              form.title,
              submission,
            )
          : buildEmailHtml(form.title, submission)

        // `from` is always the verified Resend sender (RESEND_FROM_EMAIL); the CMS "Email From"
        // field is ignored because Resend rejects addresses on unverified domains.
        await payload.sendEmail({
          to: emailTo,
          cc: fillAddressTemplate(emailConfig.cc, submission),
          bcc: fillAddressTemplate(emailConfig.bcc, submission),
          replyTo: fillAddressTemplate(emailConfig.replyTo, submission),
          subject: fillSubjectTemplate(
            emailConfig.subject || `New submission: ${form.title}`,
            submission,
          ),
          html: messageHtml,
        })
      }
    } else if (adminEmail) {
      await payload.sendEmail({
        to: adminEmail,
        subject: fillSubjectTemplate(`New form submission: ${form.title}`, submission),
        html: buildEmailHtml(form.title, submission),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json({ error: 'Failed to process form submission' }, { status: 500 })
  }
}
