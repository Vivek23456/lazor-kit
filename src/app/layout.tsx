import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LazorkitProvider } from '@/components/LazorkitProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lazorkit Example - Solana Passkey Integration',
  description: 'Example integration of Lazorkit SDK for passkey authentication and gasless transactions on Solana',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LazorkitProvider>
          {children}
        </LazorkitProvider>
      </body>
    </html>
  )
}
