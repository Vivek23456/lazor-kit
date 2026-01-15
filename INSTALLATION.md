# Installation Guide

## ⚠️ Important: Lazorkit SDK Package

The Lazorkit SDK package (`@lazor-kit/react`) may not be publicly available on npm yet. 

### Option 1: Install from GitHub (if available)

If the package is available on GitHub, you can install it directly:

```bash
npm install git+https://github.com/lazor-kit/lazor-kit.git
# or
yarn add git+https://github.com/lazor-kit/lazor-kit.git
```

### Option 2: Use Local Package

If you have the Lazorkit SDK locally:

```bash
npm install /path/to/lazor-kit
# or
yarn add /path/to/lazor-kit
```

### Option 3: Manual Integration

1. Download the Lazorkit SDK from [GitHub](https://github.com/lazor-kit/lazor-kit)
2. Place it in your project's `node_modules` or create a local package
3. Update imports in your code accordingly

## 📦 Installing Dependencies

### Prerequisites

- **Node.js 18+** installed
- **npm** or **yarn** package manager
- **Sufficient disk space** (at least 500MB free)

### Step 1: Check Disk Space

**Windows:**
```cmd
dir E:\
```

**PowerShell:**
```powershell
Get-PSDrive E
```

If disk is full, free up space before proceeding.

### Step 2: Install Dependencies

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

Check that `node_modules` folder was created:

```bash
ls node_modules
# or on Windows
dir node_modules
```

## 🐛 Troubleshooting

### Error: "ENOSPC: no space left on device"

**Solution:** Free up disk space
- Delete unnecessary files
- Clear npm/yarn cache: `npm cache clean --force` or `yarn cache clean`
- Remove old `node_modules` folders from other projects

### Error: "Cannot find module '@lazor-kit/react'"

**Solution:** The Lazorkit SDK package needs to be installed separately. See options above.

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
2. Configure network (devnet/mainnet) - no API key needed!
3. Run `npm run dev` or `yarn dev`
4. Open http://localhost:3000

---

**Need help?** Join the [Lazorkit Telegram](https://t.me/lazorkit) for support.
