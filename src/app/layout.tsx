import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/index.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { CartProvider } from '@/contexts/CartContext';
import ErrorBoundary from '@/components/ErrorBoundary';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'Ice n Spice - Best Food Delivery in North Nazimabad, Karachi',
    template: '%s | Ice n Spice',
  },
  description:
    'Ice n Spice is a premium restaurant in North Nazimabad, Karachi serving authentic Arabic wraps, Turkish platters, Zinger burgers, Chinese cuisine, and more. Order online for 25-minute delivery.',
  keywords: [
    'Ice n Spice',
    'Karachi restaurant',
    'North Nazimabad food',
    'Arabic wraps',
    'Turkish platters',
    'Zinger burgers',
    'Chinese food',
    'food delivery Karachi',
    'online ordering',
  ],
  authors: [{ name: 'Ice n Spice' }],
  creator: 'Akif Khan',
  publisher: 'Ice n Spice',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://icenspice.pk'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://icenspice.pk',
    title: 'Ice n Spice - Premium Food Delivery in Karachi',
    description:
      'Order delicious Arabic wraps, Turkish platters, Zinger burgers, and more from Ice n Spice. Fast 25-minute delivery in North Nazimabad, Karachi.',
    siteName: 'Ice n Spice',
    images: [
      {
        url: '/logo-ins-akif.png',
        width: 1200,
        height: 630,
        alt: 'Ice n Spice Restaurant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ice n Spice - Premium Food Delivery in Karachi',
    description:
      'Order delicious Arabic wraps, Turkish platters, Zinger burgers, and more from Ice n Spice.',
    images: ['/logo-ins-akif.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/assets/images/app_logo.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/assets/images/app_logo.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.json',
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
        <ErrorBoundary>
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
        </ErrorBoundary>
      </body>
    </html>
  );
}
