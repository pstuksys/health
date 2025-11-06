import { getPayload } from 'payload'
import { checkBotId } from 'botid/server'
import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

type SubmissionDataItem = {
  field: string
  value: unknown
}

type NormalizedEntry = {
  field: string
  value: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isSubmissionDataItem(value: unknown): value is SubmissionDataItem {
  if (!isRecord(value)) {
    return false
  }

  return typeof value.field === 'string'
}

function normalizeSubmissionValue(value: unknown): string {
  if (value === null || value === undefined) {
    return ''
  }

  if (typeof value === 'string') {
    return value
  }

  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}

function truncate(value: string): string {
  return value.length > 4000 ? `${value.slice(0, 4000)}…` : value
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(request: NextRequest) {
  try {
    const verification = await checkBotId()
    console.log({ verification })

    if (verification.isBot) {
      return NextResponse.json({ error: 'Bot detected. Access denied.' }, { status: 403 })
    }

    const payload = await getPayload({ config: configPromise })
    const rawBody: unknown = await request.json()
    console.log({ rawBody })

    if (!isRecord(rawBody)) {
      return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 })
    }
    console.log('passed isRecord check', !isRecord(rawBody))

    if (!('form' in rawBody) || !('submissionData' in rawBody)) {
      return NextResponse.json(
        { error: 'Missing required fields: form and submissionData' },
        { status: 400 },
      )
    }

    const formCandidate = rawBody.form
    const submissionData = rawBody.submissionData

    const form =
      typeof formCandidate === 'string'
        ? formCandidate.trim()
        : typeof formCandidate === 'number'
          ? String(formCandidate)
          : null

    if (!form || form.length === 0) {
      return NextResponse.json({ error: 'Form name must be a non-empty string.' }, { status: 400 })
    }

    if (!Array.isArray(submissionData)) {
      return NextResponse.json({ error: 'submissionData must be an array.' }, { status: 400 })
    }

    const entries = submissionData.reduce<NormalizedEntry[]>((acc, item) => {
      if (!isSubmissionDataItem(item)) {
        return acc
      }

      const normalized = truncate(normalizeSubmissionValue(item.value))

      acc.push({ field: item.field, value: normalized })
      return acc
    }, [])

    if (entries.length === 0) {
      return NextResponse.json({ error: 'No valid submission fields provided.' }, { status: 400 })
    }

    const textBody = entries.map((entry) => `${entry.field}: ${entry.value}`).join('\n')
    const htmlBody = `
      <h1>New form submission</h1>
      <p>Form: ${escapeHtml(form)}</p>
      <ul>
        ${entries
          .map((entry) => {
            const escapedValue = entry.value ? escapeHtml(entry.value) : '(empty)'
            return `<li><strong>${escapeHtml(entry.field)}:</strong> ${escapedValue}</li>`
          })
          .join('')}
      </ul>
      <p>Received at: ${escapeHtml(new Date().toISOString())}</p>
    `

    const replyToEntry = entries.find((entry) => entry.field.toLowerCase() === 'email')
    const replyTo =
      replyToEntry && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyToEntry.value)
        ? replyToEntry.value
        : undefined

    const receiver = process.env.RESEND_EMAIL_RECEIVER

    if (!receiver) {
      return NextResponse.json({ error: 'Email receiver is not configured.' }, { status: 500 })
    }

    await payload.sendEmail({
      to: receiver,
      subject: `New form submission (${form})`,
      text: textBody,
      html: htmlBody,
      replyTo,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Form submission error:', error)
    console.log('ERRROR:', error)
    return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 })
  }
}
