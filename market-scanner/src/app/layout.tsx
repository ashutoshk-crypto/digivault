import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Market Scanners - Real-time Stock & Crypto Analysis",
  description: "Discover the best investment opportunities with our real-time market scanners. Filter stocks and crypto by technical and fundamental parameters.",
  keywords: "stock scanner, crypto scanner, market analysis, technical analysis, fundamental analysis, investment opportunities",
  authors: [{ name: "Market Scanners Team" }],
  openGraph: {
    title: "Market Scanners - Real-time Stock & Crypto Analysis",
    description: "Discover the best investment opportunities with our real-time market scanners.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Market Scanners - Real-time Stock & Crypto Analysis",
    description: "Discover the best investment opportunities with our real-time market scanners.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
