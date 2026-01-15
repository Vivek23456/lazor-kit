'use client'

import { LazorkitProvider as LazorkitProviderSDK, useWallet } from '@lazorkit/monorepo/react'
import { ReactNode } from 'react'

/**
 * Lazorkit Provider Wrapper
 * 
 * This wraps the Lazorkit SDK provider with the required configuration.
 * The SDK handles:
 * - Passkey authentication via Lazor Portal
 * - MPC smart wallet creation
 * - Gasless transactions via paymaster
 * - Session persistence across devices
 */
export function LazorkitProvider({ children }: { children: ReactNode }) {
  return (
    <LazorkitProviderSDK
      rpcUrl={process.env.NEXT_PUBLIC_SOLANA_RPC_URL!}
      portalUrl={process.env.NEXT_PUBLIC_LAZORKIT_PORTAL_URL}
      paymasterConfig={{
        paymasterUrl: process.env.NEXT_PUBLIC_LAZORKIT_PAYMASTER_URL!
      }}
    >
      {children}
    </LazorkitProviderSDK>
  )
}

// Export useWallet hook for components
export { useWallet }
