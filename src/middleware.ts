import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    const adminPassword = request.cookies.get('admin_password');

    // HARDCODE Karo yahan check karne ke liye
    const requiredPassword = 'admin123';

    // 1. Agar login page par hai aur pehle se authenticated hai
    if (pathname === '/admin/login') {
      if (adminPassword?.value === requiredPassword) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    // 2. Auth check
    if (!adminPassword || adminPassword.value !== requiredPassword) {
      const loginUrl = new URL('/admin/login', request.url);
      if (pathname !== '/admin/login') {
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
