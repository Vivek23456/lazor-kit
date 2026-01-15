/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // When Lazorkit SDK is installed, add it to transpilePackages:
  // transpilePackages: ['@lazor-kit/react'],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    }
    
    // When Lazorkit SDK is installed, add webpack alias if needed:
    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   '@lazor-kit/react': '@lazor-kit/react',
    // }
    
    return config
  },
}

module.exports = nextConfig
