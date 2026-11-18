'use client'

// Shown when a root layout fails (e.g. header/footer can't be loaded), which
// bypasses (frontend)/error.tsx. It replaces the layout, so it renders its own
// <html>/<body> and uses inline styles because globals.css isn't loaded.
export default function GlobalError(props: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { error, reset } = props

  console.error('Global error:', { message: error.message, digest: error.digest })

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          color: '#3d426a',
          background: '#fff',
        }}
      >
        <main style={{ maxWidth: 480, padding: 16, textAlign: 'center' }}>
          <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>Something went wrong</h1>
          <p style={{ marginBottom: 16 }}>
            Please try again in a moment. Reference: {error.digest ?? 'n/a'}
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              border: 0,
              borderRadius: 6,
              padding: '8px 16px',
              background: '#3d426a',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  )
}
