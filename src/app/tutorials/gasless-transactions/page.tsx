/**
 * Tutorial: Gasless Transactions on Solana
 * 
 * This tutorial explains how to execute transactions on Solana
 * without requiring users to pay gas fees using Lazorkit smart wallets.
 */

export default function GaslessTransactionsTutorial() {
  return (
    <main className="min-h-screen p-8 md:p-24">
      <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
        <h1>📖 Tutorial: Gasless Transactions on Solana</h1>
        
        <p className="lead">
          Learn how to send tokens and execute transactions on Solana without paying gas fees
          using Lazorkit smart wallet technology.
        </p>

        <section>
          <h2>What are Gasless Transactions?</h2>
          <p>
            Gasless transactions allow users to interact with Solana without holding SOL
            for transaction fees. The smart wallet sponsors the fees, making it easier
            for new users to get started with Solana.
          </p>
        </section>

        <section>
          <h2>Prerequisites</h2>
          <ul>
            <li>Lazorkit SDK installed and configured</li>
            <li>User authenticated with passkey (see <a href="/tutorials/passkey-wallet">previous tutorial</a>)</li>
            <li>Smart wallet created and funded (Lazorkit handles this)</li>
          </ul>
        </section>

        <section>
          <h2>Step 1: Authenticate User</h2>
          <p>Ensure the user is authenticated with their passkey wallet:</p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`// Get authenticated wallet
const wallet = await lazorkit.getWallet()

if (!wallet) {
  // Redirect to login
  await lazorkit.authenticateWithPasskey()
}`}
          </pre>
        </section>

        <section>
          <h2>Step 2: Prepare Transaction</h2>
          <p>Create a transaction object with recipient and amount:</p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`// For USDC transfer
const transaction = {
  to: 'RecipientWalletAddress...',
  amount: 10.5, // Amount in USDC
  token: 'USDC', // or 'SOL' for native SOL
}

// For native SOL transfer
const solTransaction = {
  to: 'RecipientWalletAddress...',
  amount: 0.1, // Amount in SOL
  token: 'SOL',
}`}
          </pre>
        </section>

        <section>
          <h2>Step 3: Execute Gasless Transaction</h2>
          <p>Send the transaction using Lazorkit&apos;s gasless method:</p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`async function sendGaslessTransaction(recipient, amount, token = 'USDC') {
  try {
    const wallet = await lazorkit.getWallet()
    
    if (!wallet) {
      throw new Error('Wallet not authenticated')
    }

    // Execute gasless transaction
    // Smart wallet will sponsor the fees
    const signature = await lazorkit.sendGaslessTransaction({
      from: wallet.address,
      to: recipient,
      amount: amount,
      token: token,
    })

    console.log('Transaction signature:', signature)
    return signature
  } catch (error) {
    console.error('Gasless transaction failed:', error)
    throw error
  }
}`}
          </pre>
        </section>

        <section>
          <h2>Step 4: Handle Transaction Status</h2>
          <p>Monitor transaction confirmation:</p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`async function waitForConfirmation(signature) {
  const connection = new Connection(
    process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com'
  )

  // Wait for confirmation
  const confirmation = await connection.confirmTransaction(signature, 'confirmed')
  
  if (confirmation.value.err) {
    throw new Error('Transaction failed')
  }

  return confirmation
}`}
          </pre>
        </section>

        <section>
          <h2>Step 5: Complete Example</h2>
          <p>Here&apos;s a complete React component example:</p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`'use client'

import { useState } from 'react'
import { useLazorkitContext } from '@/components/LazorkitProvider'

export function GaslessTransferForm() {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [signature, setSignature] = useState(null)
  
  const lazorkit = useLazorkitContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const txSignature = await lazorkit.sendGaslessTransaction({
        to: recipient,
        amount: parseFloat(amount),
        token: 'USDC',
      })

      setSignature(txSignature)
      alert('Transaction sent! Signature: ' + txSignature)
    } catch (error) {
      alert('Transaction failed: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient address"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        step="0.01"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send Gasless Transaction'}
      </button>
      {signature && (
        <p>Transaction: {signature}</p>
      )}
    </form>
  )
}`}
          </pre>
        </section>

        <section>
          <h2>How Gasless Transactions Work</h2>
          <ol>
            <li><strong>User initiates transaction</strong> - Clicks send button</li>
            <li><strong>Smart wallet creates transaction</strong> - Lazorkit prepares the transaction</li>
            <li><strong>Smart wallet sponsors fees</strong> - No SOL required from user</li>
            <li><strong>Transaction is signed</strong> - Using passkey authentication</li>
            <li><strong>Transaction is broadcast</strong> - To Solana network</li>
            <li><strong>Confirmation received</strong> - Transaction signature returned</li>
          </ol>
        </section>

        <section>
          <h2>Supported Transaction Types</h2>
          <ul>
            <li><strong>USDC transfers</strong> - Send USDC tokens gaslessly</li>
            <li><strong>SOL transfers</strong> - Send native SOL (fees still sponsored)</li>
            <li><strong>SPL token transfers</strong> - Any SPL token can be sent</li>
            <li><strong>Smart contract interactions</strong> - Call programs without gas fees</li>
            <li><strong>NFT transfers</strong> - Transfer NFTs gaslessly</li>
          </ul>
        </section>

        <section>
          <h2>Best Practices</h2>
          <ul>
            <li>Always validate recipient addresses before sending</li>
            <li>Show transaction status to users (pending, confirmed, failed)</li>
            <li>Handle errors gracefully - network issues can occur</li>
            <li>Provide transaction explorer links (Solscan, Explorer)</li>
            <li>Consider rate limiting to prevent abuse</li>
            <li>Monitor smart wallet balance to ensure fees can be sponsored</li>
          </ul>
        </section>

        <section>
          <h2>Limitations</h2>
          <ul>
            <li>Gasless transactions require smart wallet to have SOL for fees</li>
            <li>Some complex transactions may not be eligible for gasless execution</li>
            <li>Rate limits may apply depending on Lazorkit configuration</li>
          </ul>
        </section>

        <section>
          <h2>Next Steps</h2>
          <p>Now that you can execute gasless transactions, try:</p>
          <ul>
            <li><a href="/examples/gasless-transaction">See the working example</a></li>
            <li>Integrate with your own dApp</li>
            <li>Build subscription services with automated billing</li>
          </ul>
        </section>

        <div className="mt-8">
          <a href="/" className="text-blue-600 hover:underline">← Back to Home</a>
        </div>
      </div>
    </main>
  )
}
