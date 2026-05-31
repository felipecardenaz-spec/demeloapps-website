import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { fontSans, fontMono } from "@/lib/fonts";
import { siteConfig } from "@/lib/constants";
import { Navbar } from "@/components/sections/navbar";
import "./globals.css";

/* ═══════════════════════════════════════════════════════════════════
   Root Layout — DeMeloApps

   Responsibilities:
     - Font loading (Inter + JetBrains Mono via CSS variables)
     - Global metadata, OpenGraph, Twitter, robots
     - Vercel Analytics
     - Favicon (Next.js auto-picks src/app/icon.png)
   ═══════════════════════════════════════════════════════════════════ */

const ROOT_TITLE = `${siteConfig.name} — AI Software Studio in Vancouver`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: ROOT_TITLE,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    "DeMeloApps",
    "AI software",
    "AI automation",
    "custom software development",
    "mobile app development",
    "software studio Vancouver",
    "AI agency Canada",
    "Vancouver software development",
    "AI consulting",
    "business automation",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: ROOT_TITLE,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: ROOT_TITLE,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-bg-primary text-text-primary font-sans overflow-x-clip">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
