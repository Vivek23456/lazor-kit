'use client'

import { useState, useEffect } from 'react'
import { useWallet } from '@lazorkit/monorepo/packages/ts-sdk'
import Link from 'next/link'
import { Connection, PublicKey, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'

/**
 * Gasless Transaction Example
 * 
 * This example demonstrates how to:
 * 1. Send SOL on Solana using Lazorkit smart wallet
 * 2. Execute transaction with gasless/sponsored fees via paymaster
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
  const [balance, setBalance] = useState<number | null>(null)
  const [isLoadingBalance, setIsLoadingBalance] = useState(false)
  
  const { smartWalletPubkey, isConnected, signAndSendTransaction } = useWallet()

  /**
   * Fetch wallet balance when connected
   */
  useEffect(() => {
    if (smartWalletPubkey && isConnected) {
      fetchBalance()
    }
  }, [smartWalletPubkey, isConnected])

  const fetchBalance = async () => {
    if (!smartWalletPubkey) return

    setIsLoadingBalance(true)
    try {
      const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com'
      const connection = new Connection(rpcUrl, 'confirmed')
      const balanceValue = await connection.getBalance(smartWalletPubkey)
      setBalance(balanceValue / LAMPORTS_PER_SOL)
    } catch (err: any) {
      console.error('Failed to fetch balance:', err)
      setBalance(0)
    } finally {
      setIsLoadingBalance(false)
    }
  }

  const hasInsufficientBalance = balance !== null && balance === 0

  /**
   * Execute gasless SOL transfer
   * 
   * This function sends SOL tokens using the Lazorkit smart wallet.
   * The paymaster (configured in LazorkitProvider) will sponsor the transaction fees.
   */
  const handleGaslessTransfer = async () => {
    if (!smartWalletPubkey) {
      setError('Please connect your wallet first')
      return
    }

    if (!recipientAddress || !amount) {
      setError('Please enter recipient address and amount')
      return
    }

    setIsLoading(true)
    setError(null)
    setTxSignature(null)

    try {
      // Validate recipient address
      const recipientPubkey = new PublicKey(recipientAddress)
      const amountLamports = parseFloat(amount) * LAMPORTS_PER_SOL

      // Create transfer instruction
      const transferInstruction = SystemProgram.transfer({
        fromPubkey: smartWalletPubkey,
        toPubkey: recipientPubkey,
        lamports: amountLamports,
      })

      // Sign and send transaction using Lazorkit SDK
      // The paymaster will sponsor fees automatically
      const signature = await signAndSendTransaction({
        instructions: [transferInstruction],
      })
      
      setTxSignature(signature)
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
          Send SOL on Solana without paying gas fees using Lazorkit smart wallet technology.
        </p>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
          {!isConnected && (
            <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
              <p className="text-yellow-800 dark:text-yellow-200">
                Please connect your wallet first using the <Link href="/examples/passkey-login" className="underline">passkey login example</Link>.
              </p>
            </div>
          )}

          {isConnected && hasInsufficientBalance && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
              <p className="text-red-800 dark:text-red-200 font-semibold mb-2">
                Account does not exist or has no data
              </p>
              <p className="text-red-700 dark:text-red-300 text-sm mb-2">
                {smartWalletPubkey?.toBase58()}
              </p>
              <p className="text-red-700 dark:text-red-300 text-sm mb-3">
                Your smart wallet needs SOL to send transactions. Since you&apos;re on devnet, you can get free test SOL from a faucet.
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={`https://faucet.solana.com/?address=${smartWalletPubkey?.toBase58()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm"
                >
                  Get Devnet SOL (Solana Faucet)
                </a>
                <button
                  onClick={fetchBalance}
                  disabled={isLoadingBalance}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
                >
                  {isLoadingBalance ? 'Checking...' : 'Refresh Balance'}
                </button>
              </div>
            </div>
          )}

          {isConnected && balance !== null && balance > 0 && (
            <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
              <p className="text-green-800 dark:text-green-200">
                Wallet Balance: <span className="font-bold">{balance.toFixed(4)} SOL</span>
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
                <label className="block text-sm font-medium mb-2">Amount (SOL)</label>
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
                disabled={isLoading || !recipientAddress || !amount || !isConnected}
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
            <li>Paymaster sponsors the transaction fees (gasless)</li>
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
