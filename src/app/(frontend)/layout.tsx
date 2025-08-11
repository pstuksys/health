import React from 'react'
import './globals.css'
export const dynamic = 'force-dynamic'
import { NavigationMenu } from './components/navigation-menu'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main className="w-full h-full bg-red-400">
          <NavigationMenu>{children}</NavigationMenu>
        </main>

        {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
      </body>
    </html>
  )
}
