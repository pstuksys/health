'use client'

import React from 'react'
import NotFound from './not-found'

export default function Error(props: { error: Error & { digest?: string }; reset: () => void }) {
  // const { error, reset } = props

  // Log full details to server logs (visible in Vercel)
  // eslint-disable-next-line no-console
  // console.error('RSC Error:', { message: error.message, digest: error.digest, stack: error.stack })

  return (
    <NotFound />
    // <div className="container mx-auto max-w-2xl py-10">
    //   <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
    //   <p className="text-sm text-muted-foreground mb-4">
    //     If this persists, please contact support. Reference digest: {error.digest ?? 'n/a'}
    //   </p>
    //   <button
    //     type="button"
    //     onClick={() => reset()}
    //     className="rounded bg-black text-white px-3 py-1"
    //   >
    //     Try again
    //   </button>
    // </div>
  )
}
