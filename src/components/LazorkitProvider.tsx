"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { LazorkitClient } from "@lazorkit/monorepo/packages/ts-sdk";

const LazorkitContext = createContext<any>(null);

export function LazorkitProvider({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState<LazorkitClient | null>(null);

  useEffect(() => {
    const lazor = new LazorkitClient({
      rpcUrl: process.env.NEXT_PUBLIC_SOLANA_RPC_URL!,
      portalUrl: process.env.NEXT_PUBLIC_LAZORKIT_PORTAL_URL!,
      paymasterUrl: process.env.NEXT_PUBLIC_LAZORKIT_PAYMASTER_URL!,
    });

    setClient(lazor);
  }, []);

  return (
    <LazorkitContext.Provider value={client}>
      {children}
    </LazorkitContext.Provider>
  );
}

export function useWallet() {
  const lazor = useContext(LazorkitContext);
  if (!lazor) throw new Error("Lazorkit not ready");

  return {
    connect: async () => {
      await lazor.connect(); // passkey
      return lazor.wallet;
    },
    publicKey: lazor.wallet?.publicKey,
    sendTransaction: lazor.sendTransaction.bind(lazor),
  };
}
