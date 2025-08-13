import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  const size = 32
  const image = new ImageResponse(
    (
      <div
        style={{
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
          color: '#111827',
          fontSize: 20,
          borderRadius: 6,
        }}
      >
        H
      </div>
    ),
    { width: size, height: size },
  )

  // Next will set content-type to image/png for ImageResponse; browsers accept this at /favicon.ico
  return image
}
