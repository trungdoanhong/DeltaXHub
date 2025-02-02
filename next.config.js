/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true
  },
  basePath: process.env.GITHUB_PAGES ? '/DeltaXHub' : '',
  // Disable page prefetching to prevent .txt requests
  experimental: {
    prefetchRegex: false,
    optimizePackageImports: ['@/components']
  },
  // Disable automatic static optimization
  staticPageGenerationTimeout: 0,
  // Configure rewrites to handle .txt requests
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*.txt',
          destination: '/:path*'
        }
      ]
    };
  }
};

// Inject basePath to process.env for client-side access
if (process.env.GITHUB_PAGES) {
  process.env.NEXT_PUBLIC_BASE_PATH = '/DeltaXHub';
}

module.exports = nextConfig; 