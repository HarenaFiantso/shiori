import { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';

import './globals.css';

import { Toaster } from '@/components/ui';

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: '栞 Shiori',
  description: 'Your calm space for focused productivity',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${raleway.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
