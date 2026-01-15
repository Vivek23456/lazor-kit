'use client'

import { useState } from 'react'
import { useWallet } from '@/components/LazorkitProvider'
import Link from 'next/link'

/**
 * Token Swap Example
 * 
 * This example demonstrates how to:
 * 1. Swap tokens on Solana using passkey-authenticated wallet
 * 2. Integrate with DEX (e.g., Jupiter, Raydium)
 * 3. Execute swap transactions with smart wallet
 * 
 * Note: This is a template showing the integration pattern.
 * Full implementation requires Jupiter API integration.
 */
export default function TokenSwapPage() {
  const [fromToken, setFromToken] = useState('SOL')
  const [toToken, setToToken] = useState('USDC')
  const [amount, setAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [txSignature, setTxSignature] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  const wallet = useWallet()

  const handleSwap = async () => {
    if (!wallet.publicKey) {
      setError('Please connect your wallet first')
      return
    }

    if (!amount) {
      setError('Please enter amount to swap')
      return
    }

    setIsLoading(true)
    setError(null)
    setTxSignature(null)

    try {
      // Step 1: Get swap quote from DEX (e.g., Jupiter)
      // const quote = await fetchJupiterQuote({
      //   inputMint: fromToken,
      //   outputMint: toToken,
      //   amount: parseFloat(amount),
      // })

      // Step 2: Execute swap using Lazorkit smart wallet
      // const swapTransaction = await buildJupiterSwapTransaction(quote, wallet.publicKey)
      // const signature = await wallet.sendTransaction(swapTransaction, connection)
      
      console.log('Executing token swap...')
      setError('Token swap integration requires Jupiter API. See tutorial for implementation details.')
    } catch (err: any) {
      setError(err.message || 'Failed to execute swap')
      console.error('Swap error:', err)
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

        <h1 className="text-3xl font-bold mb-4">🔄 Token Swap Example</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Swap tokens on Solana using your passkey-authenticated wallet.
        </p>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
          {!wallet.publicKey && (
            <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
              <p className="text-yellow-800 dark:text-yellow-200">
                Please connect your wallet first using the passkey login example.
              </p>
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {txSignature ? (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-green-600">✅ Swap Successful!</h2>
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
                    setAmount('')
                  }}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Swap Again
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">From</label>
                  <select
                    value={fromToken}
                    onChange={(e) => setFromToken(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="SOL">SOL</option>
                    <option value="USDC">USDC</option>
                    <option value="USDT">USDT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">To</label>
                  <select
                    value={toToken}
                    onChange={(e) => setToToken(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="USDC">USDC</option>
                    <option value="SOL">SOL</option>
                    <option value="USDT">USDT</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Amount</label>
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
                onClick={handleSwap}
                disabled={isLoading || !amount || !wallet.publicKey}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing Swap...' : 'Swap Tokens'}
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold mb-2">💡 Integration Notes:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>Integrate with Jupiter Aggregator API for best swap rates</li>
            <li>Use Lazorkit smart wallet to sign swap transactions</li>
            <li>Support gasless swaps if configured</li>
            <li>Display estimated output amount before confirmation</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
