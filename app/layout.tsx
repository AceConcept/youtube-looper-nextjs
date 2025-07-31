import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'YouTube Video Looper',
  description: 'Loop any section of a YouTube video with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://www.youtube.com/iframe_api" async></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
} 