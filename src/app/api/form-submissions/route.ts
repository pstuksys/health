import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const body = await request.json()

    // Validate required fields
    if (!body.form || !body.submissionData) {
      return NextResponse.json(
        { error: 'Missing required fields: form and submissionData' },
        { status: 400 },
      )
    }

    // Create the form submission
    const result = await payload.create({
      collection: 'form-submissions',
      data: {
        form: body.form,
        submissionData: body.submissionData,
      },
    })

    return NextResponse.json({ success: true, id: result.id })
  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json({ error: 'Failed to submit form' }, { status: 500 })
  }
}
