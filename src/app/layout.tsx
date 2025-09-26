import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://poa-frontend-liard.vercel.app';

const miniAppEmbed = JSON.stringify({
  version: "1",
  imageUrl: `${siteUrl}/frame.png`,
  button: {
    title: "Mint Your POA NFT",
    action: {
      type: "launch_frame",
      name: "StanleyPOA Minter",
      url: siteUrl,
      splashImageUrl: `${siteUrl}/splash.png`,
      splashBackgroundColor: "#1e40af"
    }
  }
});

export const metadata: Metadata = {
  title: "StanleyPOA Minter",
  description: "Claim your Proof-of-Attendance NFT on Base",
  openGraph: {
    title: "StanleyPOA Minter",
    description: "Claim your Proof-of-Attendance NFT on Base",
    images: [`${siteUrl}/frame.png`],
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "StanleyPOA Minter",
    description: "Claim your Proof-of-Attendance NFT on Base",
    images: [`${siteUrl}/frame.png`],
  },
  other: {
    'fc:miniapp': miniAppEmbed,
    'fc:frame': miniAppEmbed,
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
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}