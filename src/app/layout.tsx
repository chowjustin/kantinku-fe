import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Providers from "@/app/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://kantinku-its.vercel.app/"),
  title: {
    default: "KantinKu",
    template: "%s - KantinKu",
  },
  description:
    "KantinKu - Solusi untuk memudahkan pemesanan makanan di lingkungan kampus!",
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
  authors: [
    {
      name: "KantinKu",
      url: "https://kantinku-its.vercel.app/",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
