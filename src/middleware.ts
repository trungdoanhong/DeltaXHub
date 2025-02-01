import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('auth');
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = ['/auth/login', '/auth/register'];
  
  // Check if the path is public
  const isPublicPath = publicPaths.includes(pathname);

  // If not authenticated and trying to access protected route
  if (!authCookie && !isPublicPath) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // If authenticated and trying to access auth pages
  if (authCookie && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/:path*',
  ],
}; 