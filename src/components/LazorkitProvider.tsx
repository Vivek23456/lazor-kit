'use client'

import { createContext, useContext, ReactNode } from 'react'
// Import from the installed monorepo package
// The webpack alias in next.config.js maps @lazor-kit/react to @lazorkit/monorepo
// Try importing directly from the monorepo as fallback
import { useLazorkit } from '@lazorkit/monorepo'

/**
 * Lazorkit Context
 * 
 * This provider wraps the application and provides Lazorkit SDK functionality
 * to all child components. It handles:
 * - Passkey authentication
 * - Smart wallet creation and management
 * - Gasless transaction capabilities
 * - Session persistence across devices
 */
interface LazorkitContextType {
  // Lazorkit hooks and methods will be available here
  // This is a placeholder - actual implementation depends on @lazor-kit/react API
}

const LazorkitContext = createContext<LazorkitContextType | null>(null)

export function LazorkitProvider({ children }: { children: ReactNode }) {
  // Initialize Lazorkit - API key is not needed
  const network = (process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet') as 'devnet' | 'mainnet'
  
  // Initialize Lazorkit SDK
  // Note: Actual implementation depends on @lazor-kit/react API
  // This is a template structure
  const lazorkit = useLazorkit({
    network,
  })

  return (
    <LazorkitContext.Provider value={lazorkit as any}>
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
