"use client";

// Import from the React module of the SDK, not the low-level client
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// The ts-sdk has a react module with hooks
// Try importing from the react submodule
let LazorkitReactProvider: any;
let useLazorkitWallet: any;

try {
  const reactModule = require('@lazorkit/monorepo/packages/ts-sdk/react');
  LazorkitReactProvider = reactModule.LazorkitProvider || reactModule.default?.LazorkitProvider;
  useLazorkitWallet = reactModule.useWallet || reactModule.default?.useWallet;
} catch (e) {
  console.warn("Could not import from ts-sdk/react, will use fallback");
}

const LazorkitContext = createContext<any>(null);

export function LazorkitProvider({ children }: { children: ReactNode }) {
  // If the React provider is available from the SDK, use it
  if (LazorkitReactProvider) {
    return (
      <LazorkitReactProvider
        rpcUrl={process.env.NEXT_PUBLIC_SOLANA_RPC_URL!}
        portalUrl={process.env.NEXT_PUBLIC_LAZORKIT_PORTAL_URL}
        paymasterConfig={{
          paymasterUrl: process.env.NEXT_PUBLIC_LAZORKIT_PAYMASTER_URL!
        }}
      >
        {children}
      </LazorkitReactProvider>
    );
  }

  // Fallback: manual implementation
  const [state, setState] = useState<any>(null);

  return (
    <LazorkitContext.Provider value={state}>
      <div>
        <p style={{ padding: '20px', background: '#fee', border: '2px solid #fcc' }}>
          ⚠️ Lazorkit SDK React module not found. 
          <br />
          The SDK may not have a React wrapper yet, or needs to be imported differently.
          <br />
          <br />
          <strong>What to do:</strong>
          <br />
          1. Check if @lazorkit/wallet package exists on npm
          <br />
          2. Or implement passkey authentication using the low-level ts-sdk client
          <br />
          3. Contact Lazorkit support: https://t.me/lazorkit
        </p>
        {children}
      </div>
    </LazorkitContext.Provider>
  );
}

export function useWallet() {
  // If the SDK provides useWallet, use it
  if (useLazorkitWallet) {
    return useLazorkitWallet();
  }

  // Fallback for when SDK React module isn't available
  return {
    connect: async () => {
      throw new Error(
        "Lazorkit React module not available. " +
        "The ts-sdk provides low-level contract methods but no high-level wallet connection. " +
        "You may need to implement passkey authentication manually using the ts-sdk client methods like getSmartWalletByPasskey()."
      );
    },
    publicKey: null,
    sendTransaction: async () => {
      throw new Error("Lazorkit React module not available.");
    },
    error: "SDK React module not found",
  };
}
