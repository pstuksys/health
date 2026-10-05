// Forms are hidden (mailto fallback) and the submission API is closed unless either:
// - NEXT_PUBLIC_FORMS_ENABLED=true (forms live for everyone), or
// - the page is opened with ?forms-preview=<FORMS_PREVIEW_TOKEN>, which shows the form
//   and lets the API accept that browser's submissions (for testing in production).
export const FORMS_PUBLICLY_ENABLED = process.env.NEXT_PUBLIC_FORMS_ENABLED === 'true'

export const FORMS_PREVIEW_PARAM = 'forms-preview'
export const FORMS_PREVIEW_HEADER = 'x-forms-preview'
