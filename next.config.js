/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    loader: 'custom',
    loaderFile: './image-loader.js',
  },
};

module.exports = nextConfig; 