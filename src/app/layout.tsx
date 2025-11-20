import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  title: {
    default: "Plushify - Transform Photos into Adorable AI Plushies",
    template: "%s | Plushify"
  },
  description:
    "Transform your photos into adorable plushies with AI! Upload any photo and watch our advanced AI create a personalized plushie in seconds. Choose from Classic, Kawaii, or Realistic styles. 50 free credits to start!",
  keywords: [
    "AI plushie generator",
    "custom plushie",
    "photo to plushie",
    "AI art generator",
    "personalized gifts",
    "cute plushies",
    "photo transformation",
    "kawaii plushie",
    "custom stuffed animal",
    "AI photo editing"
  ],
  authors: [{ name: "Plushify Team" }],
  creator: "Plushify",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Plushify - Transform Photos into Adorable AI Plushies",
    description: "Transform your photos into adorable plushies with AI! Upload any photo and watch our advanced AI create a personalized plushie in seconds.",
    siteName: "Plushify",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Plushify - AI Plushie Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plushify - Transform Photos into Adorable AI Plushies",
    description: "Transform your photos into adorable plushies with AI! Upload any photo and watch our advanced AI create a personalized plushie in seconds.",
    images: ["/og-image.jpg"],
    creator: "@plushify",
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
  verification: {
    google: "verification-code-here",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Plushify",
    "description": "Transform your photos into adorable plushies with AI",
    "url": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    "applicationCategory": "AI Photo Editor",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "50 free credits to start"
    },
    "creator": {
      "@type": "Organization",
      "name": "Plushify",
      "description": "AI-powered plushie generation service"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          {children}
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
