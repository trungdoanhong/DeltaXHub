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
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Get base path without trailing slash
  const basePath = getBasePath().replace(/\/$/, '');
  // Combine and ensure single leading slash
  return basePath ? `/${basePath}/${cleanPath}` : `/${cleanPath}`;
} 