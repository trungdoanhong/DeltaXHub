/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  images: {
    unoptimized: true
  },
  basePath: process.env.GITHUB_PAGES ? '/DeltaXHub' : ''
};

// Inject basePath to process.env for client-side access
if (process.env.GITHUB_PAGES) {
  process.env.NEXT_PUBLIC_BASE_PATH = '/DeltaXHub';
}

module.exports = nextConfig; 