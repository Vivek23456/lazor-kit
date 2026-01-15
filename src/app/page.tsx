import Link from 'next/link'

/**
 * Home Page - Lazorkit Example Dashboard
 * 
 * This page serves as the main entry point and navigation hub
 * for all Lazorkit integration examples.
 */
export default function Home() {
  return (
    <main className="min-h-screen p-8 md:p-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          Lazorkit Integration Examples
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Practical examples demonstrating passkey authentication and gasless transactions on Solana
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {/* Example 1: Passkey Login */}
          <Link
            href="/examples/passkey-login"
            className="p-6 border rounded-lg hover:border-blue-500 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">🔐 Passkey Login</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Create a wallet using passkey authentication. No seed phrases needed!
            </p>
          </Link>

          {/* Example 2: Gasless Transaction */}
          <Link
            href="/examples/gasless-transaction"
            className="p-6 border rounded-lg hover:border-blue-500 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">⚡ Gasless Transaction</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Send USDC on Solana without paying gas fees using smart wallet.
            </p>
          </Link>

          {/* Example 3: Token Swap */}
          <Link
            href="/examples/token-swap"
            className="p-6 border rounded-lg hover:border-blue-500 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">🔄 Token Swap</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Swap tokens on Solana with passkey-authenticated wallet.
            </p>
          </Link>
        </div>

        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">📚 Documentation</h2>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>
              <Link href="/tutorials/passkey-wallet" className="text-blue-600 hover:underline">
                Tutorial: Creating a Passkey-Based Wallet
              </Link>
            </li>
            <li>
              <Link href="/tutorials/gasless-transactions" className="text-blue-600 hover:underline">
                Tutorial: Gasless Transactions on Solana
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
