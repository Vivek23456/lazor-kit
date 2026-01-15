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
            for transaction fees. The paymaster (configured in LazorkitProvider) sponsors the fees,
            making it easier for new users to get started with Solana.
          </p>
        </section>

        <section>
          <h2>Prerequisites</h2>
          <ul>
            <li>Lazorkit SDK installed and configured</li>
            <li>User authenticated with passkey (see <a href="/tutorials/passkey-wallet">previous tutorial</a>)</li>
            <li>Paymaster configured in LazorkitProvider</li>
          </ul>
        </section>

        <section>
          <h2>Step 1: Authenticate User</h2>
          <p>Ensure the user is authenticated with their passkey wallet:</p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`"use client";
import { useWallet } from "@lazorkit/wallet";

export default function MyComponent() {
  const wallet = useWallet();

  // Check if wallet is connected
  if (!wallet.publicKey) {
    // User needs to connect first
    await wallet.connect();
  }
}`}
          </pre>
        </section>

        <section>
          <h2>Step 2: Prepare Transaction</h2>
          <p>Create a transaction using Solana Web3.js:</p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

// Create connection
const rpcUrl = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com';
const connection = new Connection(rpcUrl, 'confirmed');

// Create transaction
const recipientPubkey = new PublicKey('RecipientWalletAddress...');
const amountLamports = 0.1 * LAMPORTS_PER_SOL; // 0.1 SOL

const transaction = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: wallet.publicKey,
    toPubkey: recipientPubkey,
    lamports: amountLamports,
  })
);

// Get recent blockhash
const { blockhash } = await connection.getLatestBlockhash();
transaction.recentBlockhash = blockhash;
transaction.feePayer = wallet.publicKey;`}
          </pre>
        </section>

        <section>
          <h2>Step 3: Execute Gasless Transaction</h2>
          <p>Send the transaction using wallet.sendTransaction(). The paymaster will automatically sponsor fees:</p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`async function sendGaslessTransaction(recipient, amount) {
  try {
    if (!wallet.publicKey) {
      throw new Error('Wallet not connected')
    }

    const connection = new Connection(
      process.env.NEXT_PUBLIC_SOLANA_RPC_URL!,
      'confirmed'
    );
    
    const recipientPubkey = new PublicKey(recipient);
    const amountLamports = parseFloat(amount) * LAMPORTS_PER_SOL;

    // Create transaction
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: recipientPubkey,
        lamports: amountLamports,
      })
    );

    // Get recent blockhash
    const { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = wallet.publicKey;

    // Send transaction - paymaster sponsors fees automatically
    const signature = await wallet.sendTransaction(transaction, connection);
    
    // Wait for confirmation
    await connection.confirmTransaction(signature, 'confirmed');
    
    console.log('Transaction signature:', signature);
    return signature;
  } catch (error) {
    console.error('Gasless transaction failed:', error);
    throw error;
  }
}`}
          </pre>
        </section>

        <section>
          <h2>Step 4: Complete Example</h2>
          <p>Here&apos;s a complete React component example:</p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`'use client'

import { useState } from 'react'
import { useWallet } from "@lazorkit/wallet"
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'

export function GaslessTransferForm() {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [signature, setSignature] = useState<string | null>(null)
  
  const wallet = useWallet()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!wallet.publicKey) {
        await wallet.connect()
      }

      const connection = new Connection(
        process.env.NEXT_PUBLIC_SOLANA_RPC_URL!,
        'confirmed'
      )
      
      const recipientPubkey = new PublicKey(recipient)
      const amountLamports = parseFloat(amount) * LAMPORTS_PER_SOL

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey!,
          toPubkey: recipientPubkey,
          lamports: amountLamports,
        })
      )

      const { blockhash } = await connection.getLatestBlockhash()
      transaction.recentBlockhash = blockhash
      transaction.feePayer = wallet.publicKey!

      // Send transaction - paymaster sponsors fees
      const txSignature = await wallet.sendTransaction(transaction, connection)
      await connection.confirmTransaction(txSignature, 'confirmed')

      setSignature(txSignature)
    } catch (error: any) {
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
        placeholder="Amount (SOL)"
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
            <li><strong>Transaction is created</strong> - Using Solana Web3.js</li>
            <li><strong>Paymaster sponsors fees</strong> - Configured in LazorkitProvider</li>
            <li><strong>Transaction is signed</strong> - Using passkey authentication</li>
            <li><strong>Transaction is broadcast</strong> - To Solana network</li>
            <li><strong>Confirmation received</strong> - Transaction signature returned</li>
          </ol>
        </section>

        <section>
          <h2>Supported Transaction Types</h2>
          <ul>
            <li><strong>SOL transfers</strong> - Send native SOL gaslessly</li>
            <li><strong>SPL token transfers</strong> - Send any SPL token</li>
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
            <li>Wait for transaction confirmation before showing success</li>
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
