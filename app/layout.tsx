import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Investment Experts - Dubai Real Estate Investment Specialists',
    template: '%s | Investment Experts',
  },
  description: 'Expert guidance for investing in Dubai real estate. Off-plan properties, luxury homes, and high-yield investment opportunities with trusted advisors.',
  keywords: ['Dubai real estate', 'property investment', 'off-plan Dubai', 'luxury homes UAE', 'real estate investors'],
  authors: [{ name: 'Investment Experts' }],
  openGraph: {
    title: 'Investment Experts - Dubai Real Estate Investment Specialists',
    description: 'Expert guidance for investing in Dubai real estate. Off-plan properties, luxury homes, and high-yield investment opportunities.',
    type: 'website',
    locale: 'en_AE',
    siteName: 'Investment Experts',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Investment Experts - Dubai Real Estate Investment Specialists',
    description: 'Expert guidance for investing in Dubai real estate.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
