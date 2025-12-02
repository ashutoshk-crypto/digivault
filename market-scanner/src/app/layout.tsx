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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://digivault.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Digivault Custody - Secure Digital Asset Custody Solutions for India",
    template: "%s | Digivault Custody",
  },
  description: "Digivault is India's most trusted digital asset custody and infrastructure partner. Secure, compliant, and built for India. Helping organizations and individuals securely build, manage, and scale their blockchain operations.",
  keywords: [
    "digital asset custody",
    "crypto custody",
    "blockchain infrastructure",
    "India crypto",
    "digital asset security",
    "cryptocurrency custody",
    "SEBI regulated",
    "enterprise crypto solutions",
    "digital asset management",
    "blockchain operations"
  ],
  authors: [{ name: "Digivault" }],
  creator: "Digivault",
  publisher: "Digivault",
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
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Digivault Custody",
    title: "Digivault Custody - Secure Digital Asset Custody Solutions for India",
    description: "Digivault is India's most trusted digital asset custody and infrastructure partner. Secure, compliant, and built for India. Helping organizations and individuals securely build, manage, and scale their blockchain operations.",
    images: [
      {
        url: "/digivault-logo.png",
        width: 1200,
        height: 630,
        alt: "Digivault Custody - Secure Digital Asset Custody Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digivault Custody - Secure Digital Asset Custody Solutions for India",
    description: "India's most trusted digital asset custody and infrastructure partner. Secure, compliant, and built for India.",
    images: ["/digivault-logo.png"],
    creator: "@digivault",
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: '/digivault-logo.png', type: 'image/png', sizes: '32x32' },
      { url: '/digivault-logo.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/digivault-logo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/digivault-logo.png',
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Digivault Custody",
    "url": siteUrl,
    "description": "Digivault is India's most trusted digital asset custody and infrastructure partner. Secure, compliant, and built for India.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Digivault",
    "url": siteUrl,
    "logo": `${siteUrl}/digivault-logo.png`,
    "description": "Digivault is India's most trusted digital asset custody and infrastructure partner. Secure, compliant, and built for India. Helping organizations and individuals securely build, manage, and scale their blockchain operations.",
    "email": "info@digivault.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "sameAs": [
      // Add social media links when available
      // "https://www.linkedin.com/company/digivault",
      // "https://twitter.com/digivault",
      // "https://www.facebook.com/digivault"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "info@digivault.com"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
