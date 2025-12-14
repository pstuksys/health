import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'
import { checkBotId } from 'botid/server'
import type { Form } from '@/payload-types'

type SubmissionField = {
  field: string
  value: string
}

function formatSubmissionData(submissionData: SubmissionField[]): string {
  return submissionData
    .map(
      ({ field, value }) =>
        `<tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">${field}</td><td style="padding: 8px; border: 1px solid #ddd;">${value}</td></tr>`,
    )
    .join('')
}

function buildEmailHtml(formTitle: string, submissionData: SubmissionField[]): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3d426a;">New Form Submission: ${formTitle}</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <thead>
          <tr style="background-color: #f5f5f5;">
            <th style="padding: 12px; border: 1px solid #ddd; text-align: left;">Field</th>
            <th style="padding: 12px; border: 1px solid #ddd; text-align: left;">Value</th>
          </tr>
        </thead>
        <tbody>
          ${formatSubmissionData(submissionData)}
        </tbody>
      </table>
      <p style="color: #666; margin-top: 20px; font-size: 12px;">
        Submitted at: ${new Date().toLocaleString()}
      </p>
    </div>
  `
}

function replaceFieldPlaceholders(template: string, submissionData: SubmissionField[]): string {
  let result = template

  for (const { field, value } of submissionData) {
    result = result.replace(new RegExp(`{{${field}}}`, 'g'), value)
  }

  if (result.includes('{{*:table}}')) {
    const tableHtml = `<table style="width: 100%; border-collapse: collapse;">${formatSubmissionData(submissionData)}</table>`
    result = result.replace(/\{\{\*:table\}\}/g, tableHtml)
  }

  if (result.includes('{{*}}')) {
    const allData = submissionData.map(({ field, value }) => `${field}: ${value}`).join('\n')
    result = result.replace(/\{\{\*\}\}/g, allData)
  }

  return result
}

export async function POST(request: NextRequest) {
  try {
    const { isBot } = await checkBotId()
    if (isBot) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    const payload = await getPayload({ config: configPromise })
    const body = await request.json()

    if (!body.form || !body.submissionData) {
      return NextResponse.json(
        { error: 'Missing required fields: form and submissionData' },
        { status: 400 },
      )
    }

    const formId = typeof body.form === 'number' ? body.form : parseInt(body.form, 10)
    if (isNaN(formId)) {
      return NextResponse.json({ error: 'Invalid form ID' }, { status: 400 })
    }

    const form = (await payload.findByID({
      collection: 'forms',
      id: formId,
    })) as Form

    if (!form) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 })
    }

    const submissionData: SubmissionField[] = body.submissionData
    const adminEmail = process.env.FORM_NOTIFICATION_EMAIL || process.env.RESEND_FROM_EMAIL

    if (form.emails && form.emails.length > 0) {
      for (const emailConfig of form.emails) {
        const emailTo = emailConfig.emailTo
          ? replaceFieldPlaceholders(emailConfig.emailTo, submissionData)
          : adminEmail

        if (!emailTo) continue

        const subject = replaceFieldPlaceholders(
          emailConfig.subject || `New submission: ${form.title}`,
          submissionData,
        )

        let messageHtml = buildEmailHtml(form.title, submissionData)
        if (emailConfig.message) {
          const messageText =
            typeof emailConfig.message === 'object'
              ? JSON.stringify(emailConfig.message)
              : String(emailConfig.message)
          messageHtml = replaceFieldPlaceholders(messageText, submissionData)
        }

        await payload.sendEmail({
          to: emailTo,
          cc: emailConfig.cc ? replaceFieldPlaceholders(emailConfig.cc, submissionData) : undefined,
          bcc: emailConfig.bcc
            ? replaceFieldPlaceholders(emailConfig.bcc, submissionData)
            : undefined,
          replyTo: emailConfig.replyTo
            ? replaceFieldPlaceholders(emailConfig.replyTo, submissionData)
            : undefined,
          from: emailConfig.emailFrom || undefined,
          subject,
          html: messageHtml,
        })
      }
    } else if (adminEmail) {
      await payload.sendEmail({
        to: adminEmail,
        subject: `New form submission: ${form.title}`,
        html: buildEmailHtml(form.title, submissionData),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json({ error: 'Failed to process form submission' }, { status: 500 })
  }
}
