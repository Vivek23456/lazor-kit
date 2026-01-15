'use client'

import { useState } from 'react'
import { useLazorkitContext } from '@/components/LazorkitProvider'
import Link from 'next/link'

/**
 * Passkey Login Example
 * 
 * This example demonstrates how to:
 * 1. Create a new passkey-based wallet
 * 2. Authenticate using passkey
 * 3. Retrieve wallet address
 * 4. Display wallet balance
 * 
 * Tutorial: See /tutorials/passkey-wallet for step-by-step guide
 */
export default function PasskeyLoginPage() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState<string>('0')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const lazorkit = useLazorkitContext()

  /**
   * Step 1: Create or authenticate with passkey
   * 
   * This function triggers the passkey creation/authentication flow.
   * The user will be prompted by their browser/device to use biometrics
   * or device PIN to authenticate.
   */
  const handlePasskeyAuth = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Check if user already has a passkey registered
      // If yes, authenticate; if no, create new passkey
      
      // Example implementation (actual API may vary):
      // const wallet = await lazorkit.createWalletWithPasskey()
      // or
      // const wallet = await lazorkit.authenticateWithPasskey()
      
      console.log('Initiating passkey authentication...')
      
      // Try to use the Lazorkit SDK methods
      if (lazorkit.createWalletWithPasskey) {
        try {
          const wallet = await lazorkit.createWalletWithPasskey({
            name: 'My Solana Wallet',
          })
          if (wallet && wallet.address) {
            setWalletAddress(wallet.address)
            // Fetch balance after wallet creation
            if (lazorkit.getBalance) {
              const bal = await lazorkit.getBalance(wallet.address)
              setBalance(bal.toString())
            }
            return
          }
        } catch (createError) {
          // If creation fails, try authentication
          if (lazorkit.authenticateWithPasskey) {
            const wallet = await lazorkit.authenticateWithPasskey()
            if (wallet && wallet.address) {
              setWalletAddress(wallet.address)
              if (lazorkit.getBalance) {
                const bal = await lazorkit.getBalance(wallet.address)
                setBalance(bal.toString())
              }
              return
            }
          }
        }
      }
      
      // If SDK is not installed, show informative message
      setError(
        'Lazorkit SDK is not installed. This is a template/demo implementation. ' +
        'To use actual passkey authentication, install @lazor-kit/react and update LazorkitProvider.tsx'
      )
    } catch (err: any) {
      // Check if it's the stub error
      if (err.message && err.message.includes('Lazorkit SDK not installed')) {
        setError(
          'Lazorkit SDK is not installed. This is a template/demo implementation. ' +
          'To use actual passkey authentication, install @lazor-kit/react and update LazorkitProvider.tsx'
        )
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
   * of the authenticated wallet.
   */
  const fetchBalance = async () => {
    if (!walletAddress) return

    setIsLoading(true)
    try {
      // Fetch balance using Solana Web3.js or Lazorkit SDK
      // const balance = await lazorkit.getBalance(walletAddress)
      // setBalance(balance.toString())
      
      console.log('Fetching balance for:', walletAddress)
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
            <div className={`mb-4 p-4 rounded border ${
              error.includes('Lazorkit SDK is not installed') 
                ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' 
                : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
            }`}>
              <p className={error.includes('Lazorkit SDK is not installed') 
                ? 'text-yellow-800 dark:text-yellow-200' 
                : 'text-red-800 dark:text-red-200'
              }>
                {error}
              </p>
              {error.includes('Lazorkit SDK is not installed') && (
                <div className="mt-3 text-sm">
                  <p className="font-semibold mb-2">To enable actual passkey authentication:</p>
                  <ol className="list-decimal list-inside space-y-1 text-yellow-700 dark:text-yellow-300">
                    <li>Install the Lazorkit SDK: <code className="bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded">npm install @lazor-kit/react</code></li>
                    <li>Update <code className="bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded">src/components/LazorkitProvider.tsx</code> with the actual SDK import</li>
                    <li>See the <Link href="/tutorials/passkey-wallet" className="underline">tutorial</Link> for detailed instructions</li>
                  </ol>
                </div>
              )}
            </div>
          )}

          {!walletAddress ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">Step 1: Authenticate with Passkey</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Click the button below to create a new wallet or authenticate with an existing passkey.
                Your browser will prompt you to use biometrics or device PIN.
              </p>
              <button
                onClick={handlePasskeyAuth}
                disabled={isLoading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Authenticating...' : 'Authenticate with Passkey'}
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">✅ Authenticated!</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Wallet Address</label>
                  <p className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded break-all">
                    {walletAddress}
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
            <li>User clicks &quot;Authenticate with Passkey&quot;</li>
            <li>Browser prompts for biometric/PIN authentication</li>
            <li>Lazorkit creates/authenticates smart wallet</li>
            <li>Wallet address is returned and displayed</li>
            <li>Balance can be fetched from Solana network</li>
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
