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
  assetPrefix: process.env.GITHUB_PAGES ? '/DeltaXHub/' : ''
};

module.exports = nextConfig; 