export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4"
    >
      <div
        aria-hidden="true"
        className="h-14 w-14 animate-spin rounded-full border-4 border-ds-light-neutral border-t-ds-accent-yellow"
      />
      <p className="text-base font-light text-ds-dark-blue">Loading…</p>
    </div>
  )
}
