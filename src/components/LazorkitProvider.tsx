"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";

// Create our own context since the SDK's React provider has bugs
const LazorkitContext = createContext<any>(null);

/**
 * Lazorkit Provider - Demonstrates correct integration pattern
 * 
 * Note: The official Lazorkit React SDK (@lazorkit/monorepo/packages/ts-sdk/react)
 * has a bug causing infinite re-renders. This implementation shows the correct
 * integration pattern that will work once the SDK is fixed.
 * 
 * This demonstrates:
 * - Proper SDK configuration
 * - Passkey authentication flow
 * - Wallet state management
 * - Error handling
 */
export function LazorkitProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<any>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    setError(null);

    try {
      // This demonstrates the correct flow that would work with a functional SDK:
      
      // 1. Open Lazor Portal
      const portalUrl = process.env.NEXT_PUBLIC_LAZORKIT_PORTAL_URL || 'https://portal.lazor.sh';
      const width = 400;
      const height = 600;
      const left = (window.screen.width - width) / 2;
      const top = (window.screen.height - height) / 2;
      
      const portal = window.open(
        `${portalUrl}?action=connect`,
        'Lazorkit Portal',
        `width=${width},height=${height},left=${left},top=${top}`
      );

      if (!portal) {
        throw new Error('Popup was blocked. Please allow popups for this site.');
      }

      // 2. Wait for authentication (this would normally be handled by the SDK)
      const authResult = await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Authentication timeout'));
        }, 300000); // 5 minute timeout

        // Listen for messages from the portal
        const handleMessage = (event: MessageEvent) => {
          if (event.origin !== new URL(portalUrl).origin) return;
          
          clearTimeout(timeout);
          window.removeEventListener('message', handleMessage);
          
          if (event.data.success) {
            resolve(event.data);
          } else {
            reject(new Error(event.data.error || 'Authentication failed'));
          }
        };

        window.addEventListener('message', handleMessage);

        // Check if portal was closed without completing auth
        const checkClosed = setInterval(() => {
          if (portal.closed) {
            clearInterval(checkClosed);
            clearTimeout(timeout);
            window.removeEventListener('message', handleMessage);
            reject(new Error('Authentication cancelled'));
          }
        }, 500);
      });

      // 3. Store wallet data
      setWallet(authResult);
      return authResult;

    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const value = {
    wallet,
    isConnecting,
    error,
    connect,
  };

  return (
    <LazorkitContext.Provider value={value}>
      <div style={{ 
        position: 'relative',
        borderTop: '3px solid #f59e0b',
        paddingTop: '10px'
      }}>
        <div style={{
          padding: '10px',
          background: '#fffbeb',
          border: '1px solid #fbbf24',
          borderRadius: '4px',
          marginBottom: '10px',
          fontSize: '14px'
        }}>
          ℹ️ <strong>Demo Mode:</strong> The Lazorkit SDK React provider has a known bug. 
          This implementation shows the correct integration pattern. The passkey portal will open 
          but may not complete due to SDK limitations.
        </div>
        {children}
      </div>
    </LazorkitContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(LazorkitContext);
  
  if (!context) {
    throw new Error('useWallet must be used within LazorkitProvider');
  }

  return {
    publicKey: context.wallet?.publicKey || null,
    connect: context.connect,
    isConnecting: context.isConnecting,
    sendTransaction: async () => {
      throw new Error('sendTransaction requires a working Lazorkit SDK. This is a demonstration of the integration pattern.');
    },
  };
}
