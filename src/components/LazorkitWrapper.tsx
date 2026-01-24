"use client";

import { ReactNode } from 'react';
import { LazorkitProvider } from '@lazorkit/monorepo/packages/ts-sdk';

/**
 * Client-side wrapper for LazorkitProvider
 * 
 * This wrapper handles the client-side configuration of the Lazorkit SDK.
 * Environment variables are used for RPC, portal, and paymaster URLs.
 */
export function LazorkitWrapper({ children }: { children: ReactNode }) {
  return (
    <LazorkitProvider
      rpcUrl={process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com'}
      portalUrl={process.env.NEXT_PUBLIC_LAZORKIT_PORTAL_URL || 'https://portal.lazor.sh'}
      paymasterConfig={{
        paymasterUrl: process.env.NEXT_PUBLIC_LAZORKIT_PAYMASTER_URL || 'https://kora.devnet.lazorkit.com'
      }}
    >
      {children}
    </LazorkitProvider>
  );
}
