import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from './providers'; // Import our new provider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StanleyPOA Minter",
  description: "Claim your Proof-of-Attendance NFT on Base",
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