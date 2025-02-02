export default function imageLoader({ src }) {
  const basePath = process.env.GITHUB_PAGES ? '/DeltaXHub' : '';
  return `${basePath}${src}`;
} 