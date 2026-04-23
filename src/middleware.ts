import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    const adminPassword = request.cookies.get('admin_password');
    const requiredPassword =
      process.env.ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

    // Allow access to admin login page (we'll create this)
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check if user is authenticated
    if (!adminPassword || adminPassword.value !== requiredPassword) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
