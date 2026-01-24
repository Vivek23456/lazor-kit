dont use the netlify link

# Lazorkit Integration Example

A comprehensive example repository demonstrating how to integrate [Lazorkit SDK](https://docs.lazorkit.com/) with Next.js for Solana passkey authentication and gasless transactions.

## 🎯 Project Overview

This project provides practical, production-ready examples of:
- **Passkey Authentication** - Create Solana wallets without seed phrases
- **Gasless Transactions** - Send tokens without paying gas fees
- **Smart Wallet Integration** - Leverage Lazorkit's smart wallet technology
- **Token Swaps** - Swap tokens using passkey-authenticated wallets

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Modern browser with WebAuthn support (Chrome, Firefox, Safari, Edge)

**Note:** Lazorkit does not require an API key - you can start using it immediately!

### Installation

1. **Clone or download this repository**

```bash
cd lazor-kit
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_LAZORKIT_PORTAL_URL=https://portal.lazor.sh
NEXT_PUBLIC_LAZORKIT_PAYMASTER_URL=https://kora.devnet.lazorkit.com
```

**Note:** Lazorkit does not require an API key - you can start using it immediately!

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
lazorkit-example/
├── src/
│   ├── app/
│   │   ├── examples/          # Working examples
│   │   │   ├── passkey-login/ # Passkey authentication example
│   │   │   ├── gasless-transaction/ # Gasless transaction example
│   │   │   └── token-swap/    # Token swap example
│   │   ├── tutorials/         # Step-by-step tutorials
│   │   │   ├── passkey-wallet/ # How to create passkey wallet
│   │   │   └── gasless-transactions/ # How to execute gasless transactions
│   │   ├── layout.tsx         # Root layout with LazorkitProvider
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   └── components/
│       └── LazorkitProvider.tsx # Lazorkit context provider
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

## 📚 Examples

### 1. Passkey Login (`/examples/passkey-login`)

Demonstrates how to:
- Create a new passkey-based wallet using `wallet.connect()`
- Authenticate using passkey (opens Lazor Portal + WebAuthn)
- Retrieve wallet address using `wallet.publicKey.toBase58()`
- Fetch and display wallet balance

**Key Features:**
- No seed phrases required
- Opens Lazor Portal for authentication
- MPC smart wallet creation
- Cross-device session persistence

### 2. Gasless Transaction (`/examples/gasless-transaction`)

Demonstrates how to:
- Send SOL tokens without paying gas fees
- Execute transactions using `wallet.sendTransaction()`
- Paymaster automatically sponsors fees
- Handle transaction confirmations
- Display transaction signatures

**Key Features:**
- Zero gas fees for users
- Paymaster sponsorship (configured in provider)
- Support for SOL and SPL tokens

### 3. Token Swap (`/examples/token-swap`)

Demonstrates how to:
- Swap tokens using passkey wallet
- Integrate with DEX aggregators (Jupiter/Raydium)
- Execute swap transactions
- Monitor swap status

## 📖 Tutorials

### Tutorial 1: Creating a Passkey-Based Wallet

**Location:** `/tutorials/passkey-wallet`

This comprehensive tutorial covers:
- Setting up Lazorkit SDK
- Creating LazorkitProvider component
- Implementing passkey authentication
- Handling user interactions
- Best practices and error handling

[Read Tutorial →](/tutorials/passkey-wallet)

### Tutorial 2: Gasless Transactions on Solana

**Location:** `/tutorials/gasless-transactions`

This tutorial explains:
- How gasless transactions work
- Preparing and executing transactions
- Monitoring transaction status
- Supported transaction types
- Limitations and best practices

[Read Tutorial →](/tutorials/gasless-transactions)

## 🔧 SDK Installation & Configuration

### Install Lazorkit SDK

```bash
npm install @lazorkit/wallet @solana/web3.js
```

**Note:** If `@lazorkit/wallet` is not available on npm, install from GitHub:
```bash
npm install git+https://github.com/lazor-kit/lazor-kit.git @solana/web3.js
```

For more installation options, see [INSTALLATION.md](./INSTALLATION.md).

### Configure Lazorkit Provider

Wrap your app with `LazorkitProvider` in your root layout:

```tsx
import { LazorkitProvider } from "@lazorkit/wallet"

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
  )
}
```

### Use Lazorkit in Components

```tsx
'use client'

import { useWallet } from "@lazorkit/wallet"

export function MyComponent() {
  const wallet = useWallet()
  
  async function login() {
    await wallet.connect() // Opens Lazor Portal + WebAuthn
    console.log("Wallet:", wallet.publicKey.toBase58())
  }
  
  return <button onClick={login}>Login with Passkey</button>
}
```

## 🌐 Environment Setup

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SOLANA_RPC_URL` | Solana RPC endpoint | `https://api.devnet.solana.com` |
| `NEXT_PUBLIC_LAZORKIT_PORTAL_URL` | Lazorkit Portal URL | `https://portal.lazor.sh` |
| `NEXT_PUBLIC_LAZORKIT_PAYMASTER_URL` | Lazorkit Paymaster URL | `https://kora.devnet.lazorkit.com` |

**Note:** Lazorkit does not require an API key - you can start using it immediately without any authentication setup!

### Network Configuration

- **Devnet**: Use for testing and development
- **Mainnet**: Use for production

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy to Other Platforms

This is a standard Next.js application and can be deployed to:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any Node.js hosting platform

### Important Notes for Deployment

- **HTTPS Required**: Passkey API requires HTTPS in production
- **Environment Variables**: Ensure network env var is set in your hosting platform
- **Network**: Use `devnet` for testing, `mainnet` for production
- **No API Key Needed**: Lazorkit works without an API key

## 🧪 Testing

### Test on Devnet

1. Set environment variables for devnet in `.env.local`
2. Get devnet SOL from faucets if needed
3. Test all examples on devnet before mainnet

### Test Passkey Authentication

- Use a modern browser (Chrome, Firefox, Safari, Edge)
- Ensure HTTPS is enabled (required for WebAuthn)
- Test on different devices (desktop, mobile)

## 📝 Code Documentation

All code is well-documented with:
- Inline comments explaining key concepts
- JSDoc comments for functions
- TypeScript types for type safety
- Clear variable and function names

## 🤝 Contributing

This is an example repository. Feel free to:
- Fork and modify for your own projects
- Submit issues if you find bugs
- Improve documentation
- Add more examples

## 📚 Resources

- [Lazorkit Documentation](https://docs.lazorkit.com/)
- [Lazorkit GitHub](https://github.com/lazor-kit/lazor-kit)
- [Lazorkit Telegram](https://t.me/lazorkit)
- [Solana Web3.js Docs](https://solana-labs.github.io/solana-web3.js/)
- [WebAuthn Specification](https://www.w3.org/TR/webauthn-2/)

## 🎓 Learning Path

1. **Start Here**: Read the [README](#) (you're here!)
2. **Try Examples**: Explore `/examples/passkey-login`
3. **Read Tutorials**: Follow `/tutorials/passkey-wallet`
4. **Build Something**: Create your own integration
5. **Deploy**: Share your work on Devnet/Mainnet

## ⚠️ Important Notes

- **No API Key Required**: Lazorkit works without an API key - start using it immediately!
- **HTTPS**: Required for passkey authentication in production
- **Environment Variables**: Ensure all required env vars are set
- **Errors**: Handle errors gracefully - passkey may not be available on all devices

## 🐛 Troubleshooting

### Passkey not working?
- Ensure HTTPS is enabled
- Check browser compatibility
- Verify network configuration is correct

### Transactions failing?
- Check network configuration
- Verify RPC endpoint is accessible
- Ensure smart wallet has sufficient balance for fees

### Build errors?
- Clear `.next` folder and rebuild
- Check Node.js version (18+)
- Verify all dependencies are installed

## 📄 License

This project is provided as an example. Use it freely for your own projects.

## 🙏 Acknowledgments

- [Lazorkit](https://lazorkit.com/) for the amazing SDK
- [Superteam Vietnam](https://superteam.fun/) for the bounty opportunity
- Solana community for support and feedback

---

**Built with ❤️ for the Solana ecosystem**

For questions or support, join the [Lazorkit Telegram group](https://t.me/lazorkit).
"# lazor-kit" 
