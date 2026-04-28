import 'katex/dist/katex.min.css';
import './globals.css';

import { Geist, Geist_Mono } from 'next/font/google';

import { rootMetadata } from '@/app/metadata';
import { DEFAULT_THEME } from '@/domain/theme/config';
import { themeInitScript } from '@/domain/theme/init-script';
import { cn } from '@/utils/cn';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata = rootMetadata;

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      data-theme={DEFAULT_THEME}
      suppressHydrationWarning
    >
      <head>
        <script id="theme-init" dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        id="top"
        className={cn(
          geistSans.variable,
          geistMono.variable,
          'min-h-screen bg-background text-foreground antialiased'
        )}
      >
        {children}
      </body>
    </html>
  );
}
