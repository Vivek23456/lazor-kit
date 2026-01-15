/**
 * Tutorial: Creating a Passkey-Based Wallet
 * 
 * This tutorial walks you through the process of integrating
 * passkey authentication with Lazorkit to create a seedless wallet.
 */

export default function PasskeyWalletTutorial() {
  return (
    <main className="min-h-screen p-8 md:p-24">
      <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
        <h1>📖 Tutorial: Creating a Passkey-Based Wallet</h1>
        
        <p className="lead">
          Learn how to create a Solana wallet using passkey authentication - no seed phrases required!
        </p>

        <section>
          <h2>Prerequisites</h2>
          <ul>
            <li>Next.js project set up with Lazorkit SDK installed</li>
            <li>Modern browser with WebAuthn support (Chrome, Firefox, Safari, Edge)</li>
            <li>HTTPS connection (required for passkey API)</li>
          </ul>
          
          <p><strong>Note:</strong> Lazorkit does not require an API key - you can start using it immediately!</p>
        </section>

        <section>
          <h2>Step 1: Install Dependencies</h2>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
{`npm install @lazor-kit/react @solana/web3.js`}
          </pre>
        </section>

        <section>
          <h2>Step 2: Set Up Environment Variables</h2>
          <p>Create a <code>.env.local</code> file in your project root:</p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
{`NEXT_PUBLIC_SOLANA_NETWORK=devnet`}
          </pre>
          <p><strong>Note:</strong> Lazorkit does not require an API key - you can start using it immediately!</p>
        </section>

        <section>
          <h2>Step 3: Create Lazorkit Provider</h2>
          <p>Wrap your app with the Lazorkit provider to enable passkey functionality:</p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`'use client'

import { useLazorkit } from '@lazor-kit/react'

export function LazorkitProvider({ children }) {
  const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet'
  
  const lazorkit = useLazorkit({
    network,
  })

  return (
    <LazorkitContext.Provider value={lazorkit}>
      {children}
    </LazorkitContext.Provider>
  )
}`}
          </pre>
        </section>

        <section>
          <h2>Step 4: Implement Passkey Authentication</h2>
          <p>Create a function to handle passkey creation/authentication:</p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`async function authenticateWithPasskey() {
  try {
    // Check if user already has a passkey
    const existingWallet = await lazorkit.getWallet()
    
    if (existingWallet) {
      // Authenticate with existing passkey
      const wallet = await lazorkit.authenticateWithPasskey()
      return wallet
    } else {
      // Create new passkey and wallet
      const wallet = await lazorkit.createWalletWithPasskey({
        name: 'My Solana Wallet', // Optional: wallet name
      })
      return wallet
    }
  } catch (error) {
    console.error('Passkey authentication failed:', error)
    throw error
  }
}`}
          </pre>
        </section>

        <section>
          <h2>Step 5: Handle User Interaction</h2>
          <p>Trigger passkey authentication on button click:</p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`function LoginButton() {
  const [wallet, setWallet] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const handleLogin = async () => {
    setLoading(true)
    try {
      const wallet = await authenticateWithPasskey()
      setWallet(wallet)
      console.log('Wallet address:', wallet.address)
    } catch (error) {
      alert('Authentication failed: ' + error.message)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <button onClick={handleLogin} disabled={loading}>
      {loading ? 'Authenticating...' : 'Login with Passkey'}
    </button>
  )
}`}
          </pre>
        </section>

        <section>
          <h2>Step 6: Retrieve Wallet Information</h2>
          <p>After authentication, you can access wallet details:</p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto">
{`// Get wallet address
const address = wallet.address

// Get balance
const balance = await lazorkit.getBalance(address)

// Get public key
const publicKey = wallet.publicKey`}
          </pre>
        </section>

        <section>
          <h2>How It Works</h2>
          <ol>
            <li><strong>User clicks "Login with Passkey"</strong> - Triggers WebAuthn API</li>
            <li><strong>Browser prompts for authentication</strong> - Biometrics, PIN, or security key</li>
            <li><strong>Lazorkit creates/authenticates smart wallet</strong> - No seed phrase needed</li>
            <li><strong>Wallet address is returned</strong> - Ready to use for transactions</li>
            <li><strong>Session persists</strong> - User can use wallet across devices</li>
          </ol>
        </section>

        <section>
          <h2>Best Practices</h2>
          <ul>
            <li>Always handle errors gracefully - passkey may not be available on all devices</li>
            <li>Provide fallback options for users without passkey support</li>
            <li>Store wallet session securely (Lazorkit handles this automatically)</li>
            <li>Test on multiple browsers and devices</li>
            <li>Use HTTPS in production (required for WebAuthn)</li>
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
