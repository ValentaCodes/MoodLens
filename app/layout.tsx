import './globals.css'
// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })
import { ClerkProvider } from '@clerk/nextjs'

export const metadata = {
  title: 'MoodLens',
  description: 'Your ultimate writing companion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen">{children}</body>
      </html>
    </ClerkProvider>
  )
}
