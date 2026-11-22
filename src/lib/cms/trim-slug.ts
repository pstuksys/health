import type { FieldHook } from 'payload'

/**
 * Strip stray spaces and leading/trailing slashes from a slug before it is
 * saved. A slug saved as "sleep-apnoea " made /education-hub/sleep-apnoea
 * show "Article Not Found".
 */
export const trimSlug: FieldHook = ({ value }) =>
  typeof value === 'string' ? value.trim().replace(/^\/+|\/+$/g, '') : value
