import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBasePath() {
  // Always use NEXT_PUBLIC_BASE_PATH for consistency
  return process.env.NEXT_PUBLIC_BASE_PATH || '';
}

export function createPath(path: string, isAbsolute = false) {
  // If it's an absolute path, don't add basePath
  if (isAbsolute) {
    return path.startsWith('/') ? path : `/${path}`;
  }

  // For relative paths, add basePath
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const basePath = getBasePath().replace(/\/$/, '');
  return basePath ? `/${basePath}/${cleanPath}` : `/${cleanPath}`;
} 