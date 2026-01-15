/**
 * Tutorial: Creating a Passkey-Based Solana Wallet
 * 
 * This tutorial shows how to create a Solana smart wallet using Lazorkit passkeys
 * — no seed phrases, no extensions.
 */

export default function PasskeyWalletTutorial() {
  return (
    <main className="min-h-screen p-8 md:p-24">
      <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
        <h1>📖 Creating a Passkey-Based Solana Wallet</h1>
        
        <p className="lead">
          Learn how to create a Solana smart wallet using Lazorkit passkeys — no seed phrases, no extensions.
        </p>

        <section>
          <h2>1️⃣ Install</h2>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
{`npm install @lazorkit/wallet @solana/web3.js`}
          </pre>
        </section>

        <section>
          <h2>2️⃣ Environment</h2>
          <p>Create <code>.env.local</code>:</p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
{`NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_LAZORKIT_PORTAL_URL=https://portal.lazor.sh
NEXT_PUBLIC_LAZORKIT_PAYMASTER_URL=https://kora.devnet.lazorkit.com`}
          </pre>
          <p><strong>No API key required.</strong></p>
        </section>

        <section>
          <h2>3️⃣ Wrap your app</h2>
          <p>Update your root layout to include the LazorkitProvider:</p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`import { LazorkitProvider } from "@lazorkit/wallet";

export default function RootLayout({ children }) {
  return (
    <LazorkitProvider
      rpcUrl={process.env.NEXT_PUBLIC_SOLANA_RPC_URL!}
      portalUrl={process.env.NEXT_PUBLIC_LAZORKIT_PORTAL_URL}
      paymasterConfig={{
        paymasterUrl: process.env.NEXT_PUBLIC_LAZORKIT_PAYMASTER_URL!
      }}
    >
      {children}
    </LazorkitProvider>
  );
}`}
          </pre>
        </section>

        <section>
          <h2>4️⃣ Passkey Login</h2>
          <p>Create a component that uses the <code>useWallet</code> hook:</p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`"use client";
import { useWallet } from "@lazorkit/wallet";

export default function PasskeyLogin() {
  const wallet = useWallet();

  async function login() {
    await wallet.connect(); // opens Lazor Portal + WebAuthn
    console.log("Wallet:", wallet.publicKey.toBase58());
  }

  return <button onClick={login}>Login with Passkey</button>;
}`}
          </pre>
          <p>
            <strong>This one call does everything:</strong>
          </p>
          <ul>
            <li>Opens Lazor portal</li>
            <li>Triggers biometric / PIN</li>
            <li>Creates MPC smart wallet</li>
            <li>Returns Solana address</li>
          </ul>
        </section>

        <section>
          <h2>5️⃣ Get wallet</h2>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`wallet.publicKey.toBase58();`}
          </pre>
          <p>That is the user&apos;s smart wallet address.</p>
        </section>

        <section>
          <h2>🧠 How it works</h2>
          <ol>
            <li><strong>User clicks</strong> → Lazor Portal opens</li>
            <li><strong>WebAuthn</strong> → Biometric/PIN authentication</li>
            <li><strong>MPC wallet</strong> → Smart wallet is created</li>
            <li><strong>Solana address returned</strong> → Ready to use</li>
          </ol>
          <p>
            <strong>No seed phrase. No Phantom. No extension.</strong>
          </p>
          <p>This is exactly what the bounty is about.</p>
        </section>

        <section>
          <h2>Complete Example</h2>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`"use client";
import { useState } from 'react';
import { useWallet } from "@lazorkit/wallet";
import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';

export default function PasskeyExample() {
  const wallet = useWallet();
  const [balance, setBalance] = useState<string>('0');

  async function handleLogin() {
    try {
      await wallet.connect();
      console.log('Wallet:', wallet.publicKey?.toBase58());
      
      // Fetch balance
      if (wallet.publicKey) {
        const connection = new Connection(
          process.env.NEXT_PUBLIC_SOLANA_RPC_URL!,
          'confirmed'
        );
        const balance = await connection.getBalance(wallet.publicKey);
        setBalance((balance / LAMPORTS_PER_SOL).toFixed(4));
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  return (
    <div>
      {!wallet.publicKey ? (
        <button onClick={handleLogin}>Login with Passkey</button>
      ) : (
        <div>
          <p>Address: {wallet.publicKey.toBase58()}</p>
          <p>Balance: {balance} SOL</p>
        </div>
      )}
    </div>
  );
}`}
          </pre>
        </section>

        <section>
          <h2>Best Practices</h2>
          <ul>
            <li>Always handle errors gracefully - passkey may not be available on all devices</li>
            <li>Use HTTPS in production (required for WebAuthn)</li>
            <li>Test on multiple browsers and devices</li>
            <li>The wallet session persists automatically across devices</li>
            <li>No need to manage seed phrases or private keys</li>
          </ul>
        </section>

        <section>
          <h2>Next Steps</h2>
          <p>Now that you have a passkey-based wallet, learn how to:</p>
          <ul>
            <li><a href="/tutorials/gasless-transactions">Execute gasless transactions</a></li>
            <li><a href="/examples/passkey-login">See the working example</a></li>
          </ul>
        </section>

        <div className="mt-8">
          <a href="/" className="text-blue-600 hover:underline">← Back to Home</a>
        </div>
      </div>
    </main>
  )
}
