import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://poa-frontend-liard.vercel.app';

const frameMetadata = {
  'fc:frame': 'vNext',
  'fc:frame:image': `${siteUrl}/frame.png`,
  'fc:frame:button:1': 'Mint Your Proof-of-Attendance NFT',
  'fc:frame:button:1:action': 'link',
  'fc:frame:button:1:target': siteUrl,
};

export const metadata: Metadata = {
  title: "StanleyPOA Minter",
  description: "Claim your Proof-of-Attendance NFT on Base",
  other: frameMetadata,
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
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
