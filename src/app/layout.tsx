import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LazorkitWrapper } from '@/components/LazorkitWrapper'

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
        <LazorkitWrapper>
          {children}
        </LazorkitWrapper>
      </body>
    </html>
  )
}
