# Deployment Guide

This guide will help you deploy the Lazorkit example to various platforms.

## 🚀 Quick Deploy to Vercel (Recommended)

### Step 1: Prepare Your Repository

1. Push your code to GitHub, GitLab, or Bitbucket
2. Ensure all environment variables are documented (see `.env.example`)

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (or leave default)
5. Add Environment Variables:
   - `NEXT_PUBLIC_SOLANA_NETWORK` - `devnet` or `mainnet`
   - `NEXT_PUBLIC_SOLANA_RPC_URL` - Optional custom RPC
   
   **Note:** Lazorkit does not require an API key - you can deploy without one!
6. Click "Deploy"

### Step 3: Verify Deployment

- Your app will be live at `https://your-project.vercel.app`
- HTTPS is automatically enabled (required for passkey)
- Check that passkey authentication works

## 🌐 Deploy to Netlify

### Step 1: Build Settings

In Netlify dashboard, configure:
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: 18.x or higher

### Step 2: Environment Variables

Add the same environment variables as Vercel:
- `NEXT_PUBLIC_SOLANA_NETWORK`
- `NEXT_PUBLIC_SOLANA_RPC_URL` (optional)

### Step 3: Deploy

- Connect your Git repository
- Netlify will auto-deploy on push
- HTTPS is enabled by default

## ☁️ Deploy to AWS Amplify

### Step 1: Connect Repository

1. Go to AWS Amplify Console
2. Click "New App" → "Host web app"
3. Connect your Git repository

### Step 2: Configure Build

Amplify will auto-detect Next.js. Verify:
- **Build command**: `npm run build`
- **Output directory**: `.next`

### Step 3: Environment Variables

Add in Amplify Console → App settings → Environment variables:
- `NEXT_PUBLIC_SOLANA_NETWORK`
- `NEXT_PUBLIC_SOLANA_RPC_URL` (optional)

## 🐳 Deploy with Docker

### Step 1: Create Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

### Step 2: Update next.config.ts

```typescript
const nextConfig: NextConfig = {
  output: 'standalone', // Add this
  // ... rest of config
}
```

### Step 3: Build and Run

```bash
docker build -t lazorkit-example .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SOLANA_NETWORK=devnet \
  lazorkit-example
```

## 📋 Pre-Deployment Checklist

- [ ] Network is set correctly (devnet/mainnet)
- [ ] HTTPS is enabled (required for passkey)
- [ ] All examples are tested locally
- [ ] Error handling is in place
- [ ] README is updated with deployment URL

## 🔒 Security Considerations

1. **Environment Variables** - Only set network configuration (no API key needed)
2. **Use HTTPS** - Required for WebAuthn/passkey
3. **Validate inputs** - Always validate user inputs
4. **Rate limiting** - Consider implementing rate limits
5. **Error messages** - Don't expose sensitive info in errors

## 🌍 Network Configuration

### Devnet (Testing)
```env
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
```

### Mainnet (Production)
```env
NEXT_PUBLIC_SOLANA_NETWORK=mainnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
```

## 🐛 Troubleshooting Deployment

### Build Fails
- Check Node.js version (18+)
- Clear `.next` folder and rebuild
- Verify all dependencies are in `package.json`

### Passkey Not Working
- Ensure HTTPS is enabled
- Check browser console for errors
- Verify network configuration is correct

### Environment Variables Not Working
- Restart deployment after adding env vars
- Check variable names (case-sensitive)
- Ensure `NEXT_PUBLIC_` prefix for client-side vars

## 📊 Monitoring

After deployment, monitor:
- Error rates
- Transaction success rates
- User authentication success
- API usage and limits

## 🔄 Continuous Deployment

Most platforms support auto-deploy on git push:
- **Vercel**: Automatic
- **Netlify**: Automatic
- **AWS Amplify**: Automatic
- **Docker**: Set up CI/CD pipeline

---

**Need help?** Join the [Lazorkit Telegram](https://t.me/lazorkit) for support.
