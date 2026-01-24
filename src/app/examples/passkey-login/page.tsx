'use client'

import { useState } from 'react'
import { useWallet } from '@/components/LazorkitProvider'
import Link from 'next/link'
import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js'

/**
 * Passkey Login Example
 * 
 * This example demonstrates how to:
 * 1. Create a new passkey-based wallet using Lazorkit
 * 2. Authenticate using passkey (opens Lazor Portal + WebAuthn)
 * 3. Retrieve wallet address
 * 4. Display wallet balance
 * 
 * Tutorial: See /tutorials/passkey-wallet for step-by-step guide
 */
export default function PasskeyLoginPage() {
  const [balance, setBalance] = useState<string>('0')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const wallet = useWallet()

  /**
   * Step 1: Connect wallet with passkey
   * 
   * This function calls wallet.connect() which:
   * - Opens Lazor Portal
   * - Triggers WebAuthn (biometrics/PIN)
   * - Creates MPC smart wallet
   * - Returns Solana address
   */
  const handleLogin = async () => {
    setIsLoading(true)
    setError(null)

    try {
      console.log('Starting passkey authentication...')
      await wallet.connect() // Opens Lazor Portal + WebAuthn
      console.log('Authentication completed!')
      console.log('Wallet object:', wallet)
      console.log('Public key:', wallet.publicKey)
      console.log('Public key base58:', wallet.publicKey?.toBase58())
      
      // Fetch balance after connection
      if (wallet.publicKey) {
        await fetchBalance()
      } else {
        console.warn('No public key found after authentication')
      }
    } catch (err: any) {
      console.error('Full error:', err)
      
      // Handle specific errors
      if (err.message && err.message.includes('payer')) {
        setError('Wallet created but paymaster initialization failed. This is a known issue with devnet. Your wallet was created successfully!')
      } else {
        setError(err.message || 'Failed to authenticate with passkey')
      }
      console.error('Passkey auth error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Step 2: Fetch wallet balance
   * 
   * After successful authentication, fetch the current SOL balance
   * using Solana Web3.js
   */
  const fetchBalance = async () => {
    if (!wallet.publicKey) return

    setIsLoading(true)
    try {
      const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com'
      const connection = new Connection(rpcUrl, 'confirmed')
      const balance = await connection.getBalance(wallet.publicKey)
      setBalance((balance / LAMPORTS_PER_SOL).toFixed(4))
    } catch (err: any) {
      setError(err.message || 'Failed to fetch balance')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen p-8 md:p-24">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-4">🔐 Passkey Login Example</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Authenticate using passkey (biometrics/device PIN) - no seed phrases required!
        </p>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {!wallet.publicKey ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">Step 1: Authenticate with Passkey</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Click the button below to create a new wallet or authenticate with an existing passkey.
                This will open Lazor Portal and prompt you to use biometrics or device PIN.
              </p>
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Authenticating...' : 'Login with Passkey'}
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">✅ Authenticated!</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Wallet Address</label>
                  <p className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded break-all">
                    {wallet.publicKey.toBase58()}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Balance</label>
                  <p className="text-2xl font-bold">{balance} SOL</p>
                </div>
                <button
                  onClick={fetchBalance}
                  disabled={isLoading}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Refresh Balance
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold mb-2">💡 How it works:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>User clicks &quot;Login with Passkey&quot;</li>
            <li>Lazor Portal opens</li>
            <li>WebAuthn prompts for biometric/PIN authentication</li>
            <li>MPC smart wallet is created</li>
            <li>Solana address is returned and displayed</li>
          </ol>
        </div>

        <div className="mt-4">
          <Link
            href="/tutorials/passkey-wallet"
            className="text-blue-600 hover:underline text-sm"
          >
            📖 Read detailed tutorial →
          </Link>
        </div>
      </div>
    </main>
  )
}
