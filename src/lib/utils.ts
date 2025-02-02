import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBasePath() {
  if (typeof window !== 'undefined') {
    // Client-side
    return window.location.pathname.startsWith('/DeltaXHub') ? '/DeltaXHub' : '';
  }
  // Server-side
  return process.env.GITHUB_PAGES ? '/DeltaXHub' : '';
}

export function createPath(path: string) {
  const basePath = getBasePath();
  // Remove any existing basePath from the path to prevent duplication
  const pathWithoutBase = path.replace(/^\/DeltaXHub/, '');
  // Ensure path starts with / and remove any duplicate slashes
  const cleanPath = pathWithoutBase.startsWith('/') ? pathWithoutBase : `/${pathWithoutBase}`;
  return `${basePath}${cleanPath}`.replace(/\/+/g, '/');
} 