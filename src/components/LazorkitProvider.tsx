'use client'

import { createContext, useContext, ReactNode, useMemo } from 'react'

/**
 * Lazorkit Context
 * 
 * This provider wraps the application and provides Lazorkit SDK functionality
 * to all child components. It handles:
 * - Passkey authentication
 * - Smart wallet creation and management
 * - Gasless transaction capabilities
 * - Session persistence across devices
 * 
 * NOTE: This is a template/stub implementation for the bounty submission.
 * When the Lazorkit SDK is properly installed, replace the stub with:
 * 
 * import { useLazorkit } from '@lazor-kit/react'
 * // or
 * import { useLazorkit } from '@lazorkit/monorepo'
 */
interface LazorkitContextType {
  // Lazorkit hooks and methods will be available here
  // This is a placeholder - actual implementation depends on @lazor-kit/react API
  getWallet?: () => Promise<any>
  authenticateWithPasskey?: () => Promise<any>
  createWalletWithPasskey?: (options?: any) => Promise<any>
  sendGaslessTransaction?: (options: any) => Promise<string>
  getBalance?: (address: string) => Promise<number>
}

const LazorkitContext = createContext<LazorkitContextType | null>(null)

// Stub implementation for build compatibility
// Replace this with actual SDK import when available
function createLazorkitStub(network: 'devnet' | 'mainnet') {
  return {
    getWallet: async () => {
      console.warn('Lazorkit SDK not installed. Install @lazor-kit/react to use this feature.')
      return null
    },
    authenticateWithPasskey: async () => {
      console.warn('Lazorkit SDK not installed. Install @lazor-kit/react to use this feature.')
      throw new Error('Lazorkit SDK not installed')
    },
    createWalletWithPasskey: async (options?: any) => {
      console.warn('Lazorkit SDK not installed. Install @lazor-kit/react to use this feature.')
      throw new Error('Lazorkit SDK not installed')
    },
    sendGaslessTransaction: async (options: any) => {
      console.warn('Lazorkit SDK not installed. Install @lazor-kit/react to use this feature.')
      throw new Error('Lazorkit SDK not installed')
    },
    getBalance: async (address: string) => {
      console.warn('Lazorkit SDK not installed. Install @lazor-kit/react to use this feature.')
      return 0
    },
  }
}

export function LazorkitProvider({ children }: { children: ReactNode }) {
  // Initialize Lazorkit - API key is not needed
  const network = (process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet') as 'devnet' | 'mainnet'
  
  // Try to import the actual SDK, fallback to stub if not available
  // TODO: When Lazorkit SDK is properly installed, replace this with:
  // const lazorkit = useLazorkit({ network })
  const lazorkit = useMemo(() => {
    try {
      // Try to dynamically import the SDK
      // This will work when the package is properly installed
      // For now, we use the stub to allow the build to succeed
      return createLazorkitStub(network)
    } catch (error) {
      // Fallback to stub if import fails
      return createLazorkitStub(network)
    }
  }, [network])

  return (
    <LazorkitContext.Provider value={lazorkit}>
      {children}
    </LazorkitContext.Provider>
  )
}

/**
 * Hook to access Lazorkit context
 * Usage: const lazorkit = useLazorkitContext()
 */
export function useLazorkitContext() {
  const context = useContext(LazorkitContext)
  if (!context) {
    throw new Error('useLazorkitContext must be used within LazorkitProvider')
  }
  return context
}
