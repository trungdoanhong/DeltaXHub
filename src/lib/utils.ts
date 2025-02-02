import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBasePath() {
  if (typeof window !== 'undefined') {
    // Client-side
    return process.env.NEXT_PUBLIC_BASE_PATH || '';
  }
  // Server-side
  return process.env.GITHUB_PAGES ? '/DeltaXHub' : '';
}

export function createPath(path: string) {
  const basePath = getBasePath();
  return `${basePath}${path}`;
} 