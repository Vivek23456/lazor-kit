'use client'

import { useState } from 'react'
import { useLazorkitContext } from '@/components/LazorkitProvider'
import Link from 'next/link'

/**
 * Gasless Transaction Example
 * 
 * This example demonstrates how to:
 * 1. Send USDC (or any SPL token) on Solana
 * 2. Execute transaction without paying gas fees
 * 3. Use smart wallet for gasless transactions
 * 
 * Tutorial: See /tutorials/gasless-transactions for step-by-step guide
 */
export default function GaslessTransactionPage() {
  const [recipientAddress, setRecipientAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [txSignature, setTxSignature] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  const lazorkit = useLazorkitContext()

  /**
   * Execute gasless USDC transfer
   * 
   * This function sends USDC tokens without requiring the user
   * to pay for transaction fees. The smart wallet handles gas payment.
   */
  const handleGaslessTransfer = async () => {
    if (!recipientAddress || !amount) {
      setError('Please enter recipient address and amount')
      return
    }

    setIsLoading(true)
    setError(null)
    setTxSignature(null)

    try {
      // Step 1: Ensure user is authenticated
      // const wallet = await lazorkit.getWallet()
      // if (!wallet) {
      //   throw new Error('Please authenticate first')
      // }

      // Step 2: Create gasless transaction
      // The smart wallet will sponsor the transaction fees
      // const signature = await lazorkit.sendGaslessTransaction({
      //   to: recipientAddress,
      //   amount: parseFloat(amount),
      //   token: 'USDC', // or 'SOL' for native SOL transfer
      // })

      // setTxSignature(signature)
      
      console.log('Executing gasless transaction...')
      setError('Please implement actual Lazorkit SDK gasless transaction call')
    } catch (err: any) {
      setError(err.message || 'Failed to execute gasless transaction')
      console.error('Gasless transaction error:', err)
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

        <h1 className="text-3xl font-bold mb-4">⚡ Gasless Transaction Example</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Send USDC on Solana without paying gas fees using smart wallet technology.
        </p>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {txSignature ? (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-green-600">✅ Transaction Successful!</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Transaction Signature</label>
                  <p className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded break-all">
                    {txSignature}
                  </p>
                </div>
                <a
                  href={`https://solscan.io/tx/${txSignature}?cluster=devnet`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  View on Solscan →
                </a>
                <button
                  onClick={() => {
                    setTxSignature(null)
                    setRecipientAddress('')
                    setAmount('')
                  }}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Send Another Transaction
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Recipient Address</label>
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="Enter Solana wallet address"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Amount (USDC)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleGaslessTransfer}
                disabled={isLoading || !recipientAddress || !amount}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : 'Send Gasless Transaction'}
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold mb-2">💡 How it works:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>User enters recipient address and amount</li>
            <li>Lazorkit smart wallet creates the transaction</li>
            <li>Smart wallet sponsors the transaction fees (gasless)</li>
            <li>Transaction is signed and broadcast to Solana network</li>
            <li>Transaction signature is returned for verification</li>
          </ol>
        </div>

        <div className="mt-4">
          <Link
            href="/tutorials/gasless-transactions"
            className="text-blue-600 hover:underline text-sm"
          >
            📖 Read detailed tutorial →
          </Link>
        </div>
      </div>
    </main>
  )
}
