# Environment Setup Guide

This guide explains how to set up environment variables for the Lazorkit example project.

## 📝 Required Environment Variables

Create a `.env.local` file in the root directory of the project with the following variables:

```env
# Solana RPC URL (Required)
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com

# Lazorkit Portal URL (Required)
NEXT_PUBLIC_LAZORKIT_PORTAL_URL=https://portal.lazor.sh

# Lazorkit Paymaster URL (Required)
NEXT_PUBLIC_LAZORKIT_PAYMASTER_URL=https://kora.devnet.lazorkit.com
```

**Note:** Lazorkit does not require an API key. You can start using it immediately without any authentication setup.

## 🌐 Network Configuration

### Devnet (Recommended for Testing)

```env
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_LAZORKIT_PORTAL_URL=https://portal.lazor.sh
NEXT_PUBLIC_LAZORKIT_PAYMASTER_URL=https://kora.devnet.lazorkit.com
```

**Use devnet when:**
- Testing and development
- Learning how Lazorkit works
- Building prototypes
- No real funds at risk

### Mainnet (Production)

```env
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_LAZORKIT_PORTAL_URL=https://portal.lazor.sh
NEXT_PUBLIC_LAZORKIT_PAYMASTER_URL=https://kora.mainnet.lazorkit.com
```

**Use mainnet when:**
- Deploying to production
- Handling real user funds
- After thorough testing on devnet

## 🔧 Custom RPC Endpoints

For better performance and reliability, consider using custom RPC providers:

### Free Options
- [Helius](https://www.helius.dev/) - Free tier available
- [QuickNode](https://www.quicknode.com/) - Free tier available
- [Alchemy](https://www.alchemy.com/) - Free tier available

### Example with Custom RPC

```env
NEXT_PUBLIC_SOLANA_RPC_URL=https://your-custom-rpc-endpoint.com
NEXT_PUBLIC_LAZORKIT_PORTAL_URL=https://portal.lazor.sh
NEXT_PUBLIC_LAZORKIT_PAYMASTER_URL=https://kora.devnet.lazorkit.com
```

## 📁 File Structure

Your project should have:

```
lazorkit-example/
├── .env.local          # Your local environment variables (gitignored)
├── .env.example        # Example file (committed to git)
└── ...
```

## ⚠️ Important Notes

1. **Never commit `.env.local`** - It's in `.gitignore` for security
2. **Use `.env.example`** - Commit this file as a template
3. **Restart dev server** - After changing env vars, restart `npm run dev`
4. **Case sensitive** - Variable names are case-sensitive
5. **NEXT_PUBLIC_ prefix** - Required for client-side access in Next.js

## 🧪 Testing Your Setup

After setting up environment variables:

1. Start the dev server: `npm run dev`
2. Open browser console
3. Try the passkey login example
4. Verify wallet connection works

## 🚀 Production Deployment

When deploying to production:

1. **Vercel**: Add env vars in project settings
2. **Netlify**: Add env vars in site settings
3. **AWS Amplify**: Add env vars in app settings
4. **Docker**: Pass env vars in `docker run` command

### Example for Vercel

1. Go to Project Settings → Environment Variables
2. Add each variable:
   - `NEXT_PUBLIC_SOLANA_RPC_URL`
   - `NEXT_PUBLIC_LAZORKIT_PORTAL_URL`
   - `NEXT_PUBLIC_LAZORKIT_PAYMASTER_URL`
3. Redeploy the project

## 🔍 Verifying Environment Variables

You can verify your setup by checking the browser console:

```javascript
console.log('RPC:', process.env.NEXT_PUBLIC_SOLANA_RPC_URL)
console.log('Portal:', process.env.NEXT_PUBLIC_LAZORKIT_PORTAL_URL)
console.log('Paymaster:', process.env.NEXT_PUBLIC_LAZORKIT_PAYMASTER_URL)
```

## 🐛 Troubleshooting

### Variables not working?
- Restart the dev server after changing `.env.local`
- Check variable names match exactly (case-sensitive)
- Ensure `NEXT_PUBLIC_` prefix is present
- Clear `.next` cache and rebuild

### Connection errors?
- Verify RPC URL is accessible
- Check portal and paymaster URLs are correct
- Try public RPC as fallback

---

**Need help?** Check the [Lazorkit Documentation](https://docs.lazorkit.com/) or join [Telegram](https://t.me/lazorkit).
