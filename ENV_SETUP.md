# Environment Setup Guide

This guide explains how to set up environment variables for the Lazorkit example project.

## 📝 Required Environment Variables

Create a `.env.local` file in the root directory of the project with the following variables:

```env
# Solana Network (Required)
# Options: 'devnet' or 'mainnet'
# Use 'devnet' for testing, 'mainnet' for production
NEXT_PUBLIC_SOLANA_NETWORK=devnet

# Solana RPC URL (Optional)
# Defaults to public RPC if not provided
# For better performance, use a custom RPC endpoint
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
```

**Note:** Lazorkit does not require an API key. You can start using it immediately without any authentication setup.

## 🌐 Network Configuration

### Devnet (Recommended for Testing)

```env
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
```

**Use devnet when:**
- Testing and development
- Learning how Lazorkit works
- Building prototypes
- No real funds at risk

### Mainnet (Production)

```env
NEXT_PUBLIC_SOLANA_NETWORK=mainnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
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
3. Check for any API key errors
4. Try the passkey login example
5. Verify network is correct (devnet/mainnet)

## 🚀 Production Deployment

When deploying to production:

1. **Vercel**: Add env vars in project settings
2. **Netlify**: Add env vars in site settings
3. **AWS Amplify**: Add env vars in app settings
4. **Docker**: Pass env vars in `docker run` command

### Example for Vercel

1. Go to Project Settings → Environment Variables
2. Add each variable:
   - `NEXT_PUBLIC_SOLANA_NETWORK`
   - `NEXT_PUBLIC_SOLANA_RPC_URL` (optional)
3. Redeploy the project

## 🔍 Verifying Environment Variables

You can verify your setup by checking the browser console:

```javascript
console.log('Network:', process.env.NEXT_PUBLIC_SOLANA_NETWORK)
console.log('RPC:', process.env.NEXT_PUBLIC_SOLANA_RPC_URL)
// Note: API key should NOT be logged for security
```

## 🐛 Troubleshooting

### Variables not working?
- Restart the dev server after changing `.env.local`
- Check variable names match exactly (case-sensitive)
- Ensure `NEXT_PUBLIC_` prefix is present
- Clear `.next` cache and rebuild

### API key errors?
- Lazorkit does not require an API key, so you shouldn't see any API key errors
- If you see errors, check the Lazorkit documentation for the latest setup requirements

### Network errors?
- Verify RPC URL is accessible
- Check network name is 'devnet' or 'mainnet'
- Try public RPC as fallback

---

**Need help?** Check the [Lazorkit Documentation](https://docs.lazorkit.com/) or join [Telegram](https://t.me/lazorkit).
