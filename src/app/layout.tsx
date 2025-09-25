import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';

// The font instance is created with a lowercase 'i'
const inter = Inter({ subsets: ["latin"] });

// Your Vercel URL
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: "StanleyPOA Minter",
  description: "Claim your Proof-of-Attendance NFT on Base",
  // Adding Farcaster Frame metadata
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${siteUrl}/frame.png`,
    'fc:frame:button:1': 'Mint Your Proof-of-Attendance NFT',
    'fc:frame:button:1:action': 'link',
    'fc:frame:button:1:target': siteUrl,
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* The className now correctly uses the lowercase 'inter' variable */}
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}