/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Transpile the Lazorkit monorepo package
  transpilePackages: ['@lazorkit/monorepo'],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    }
    // Add alias to map @lazor-kit/react to the installed monorepo package
    config.resolve.alias = {
      ...config.resolve.alias,
      '@lazor-kit/react': '@lazorkit/monorepo',
    }
    return config
  },
}

module.exports = nextConfig
