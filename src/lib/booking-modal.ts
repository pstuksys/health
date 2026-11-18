export const BOOKING_MODAL_HASH = '#book-video-consultation'

// Links to `#book-video-consultation` open the booking modal with its default booking links.
// `#book-video-consultation=https://...` opens the same modal but books through that URL instead.
// Returns null when the hash isn't a booking modal link.
export function parseBookingModalHash(hash: string): { bookingHref: string | null } | null {
  if (hash === BOOKING_MODAL_HASH) return { bookingHref: null }
  if (!hash.startsWith(`${BOOKING_MODAL_HASH}=`)) return null
  const bookingHref = hash.slice(BOOKING_MODAL_HASH.length + 1)
  return { bookingHref: bookingHref.startsWith('https://') ? bookingHref : null }
}
