# Installation Guide

## 📦 Installing Dependencies

### Prerequisites

- **Node.js 18+** installed
- **npm** or **yarn** package manager
- **Sufficient disk space** (at least 500MB free)

### Step 1: Install Lazorkit SDK

Install the Lazorkit wallet package:

```bash
npm install @lazorkit/wallet @solana/web3.js
# or
yarn add @lazorkit/wallet @solana/web3.js
```

### Step 2: Install Other Dependencies

**Using npm:**
```bash
npm install
```

**Using yarn:**
```bash
yarn install
```

**Using pnpm:**
```bash
pnpm install
```

### Step 3: Verify Installation

Check that `node_modules` folder was created and packages are installed:

```bash
ls node_modules
# or on Windows
dir node_modules
```

Verify Lazorkit package:
```bash
npm list @lazorkit/wallet
```

## 🐛 Troubleshooting

### Error: "ENOSPC: no space left on device"

**Solution:** Free up disk space
- Delete unnecessary files
- Clear npm/yarn cache: `npm cache clean --force` or `yarn cache clean`
- Remove old `node_modules` folders from other projects

### Error: "Cannot find module '@lazorkit/wallet'"

**Solution:** 
- Ensure you've run `npm install` or `yarn install`
- Check that the package is in your `package.json`
- Try clearing node_modules and reinstalling: `rm -rf node_modules && npm install`

### npm not working

**Solution:** Use yarn or pnpm instead:
```bash
yarn install
# or
pnpm install
```

### Node.js version issues

**Solution:** Ensure Node.js 18+ is installed:
```bash
node --version
```

If version is too old, update Node.js from [nodejs.org](https://nodejs.org/)

## ✅ After Installation

Once dependencies are installed:

1. Create `.env.local` file (see ENV_SETUP.md)
2. Set up environment variables:
   - `NEXT_PUBLIC_SOLANA_RPC_URL`
   - `NEXT_PUBLIC_LAZORKIT_PORTAL_URL`
   - `NEXT_PUBLIC_LAZORKIT_PAYMASTER_URL`
3. Run `npm run dev` or `yarn dev`
4. Open http://localhost:3000

---

**Need help?** Join the [Lazorkit Telegram](https://t.me/lazorkit) for support.
