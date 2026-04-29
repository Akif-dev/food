import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    const adminPassword = request.cookies.get('admin_password');
    const requiredPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';

    // 1. Agar login page par hai aur pehle se authenticated hai, toh /admin par bhej do
    if (pathname === '/admin/login') {
      if (adminPassword?.value === requiredPassword) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    // 2. Check if user is authenticated for other admin routes
    if (!adminPassword || adminPassword.value !== requiredPassword) {
      const loginUrl = new URL('/admin/login', request.url);
      // Loop se bachne ke liye check karein ke kahin pehle se redirect toh nahi laga
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
