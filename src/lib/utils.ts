import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBasePath() {
  // Always use NEXT_PUBLIC_BASE_PATH for consistency
  return process.env.NEXT_PUBLIC_BASE_PATH || '';
}

export function createPath(path: string) {
  const basePath = getBasePath();
  // Ensure path starts with / and remove any duplicate slashes
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${cleanPath}`.replace(/\/+/g, '/');
} 