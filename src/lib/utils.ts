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
  // Remove any existing basePath from the path to prevent duplication
  const pathWithoutBase = path.replace(basePath, '');
  // Ensure path starts with / and remove any duplicate slashes
  const cleanPath = pathWithoutBase.startsWith('/') ? pathWithoutBase : `/${pathWithoutBase}`;
  return `${basePath}${cleanPath}`.replace(/\/+/g, '/');
} 