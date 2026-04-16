import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/index.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { CartProvider } from '@/contexts/CartContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Ice n Spice',
  description: 'A boilerplate project with Next.js and Tailwind CSS',
  icons: {
    icon: [{ url: '/assets/images/app_logo.png', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /* suppressHydrationWarning yahan add kiya hai taake extensions ka issue na ho */
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <CartProvider>
            {children}

            {/* Rocket.new ki scripts jo hydration mismatch karti hain */}
            <script
              type="module"
              async
              src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Frestaurant4754back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.17"
            />
            <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
