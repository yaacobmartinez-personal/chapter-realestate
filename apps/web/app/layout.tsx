import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PageTransition from "@/components/ui/PageTransition";
import ScrollObserver from "@/components/ui/ScrollObserver";
import JsonLd from "@/components/JsonLd";
import { getSocialLinks } from "@/lib/data/social";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chapterrealestate.ca"),
  title: {
    default: "Chapter Real Estate | Winnipeg's Full-Service Real Estate Company",
    template: "%s | Chapter Real Estate",
  },
  description:
    "Chapter Real Estate is Winnipeg's full-service real estate company — brokerage, property management, and investment development all under one roof.",
  keywords: [
    "real estate Winnipeg",
    "Winnipeg homes for sale",
    "property management Winnipeg",
    "real estate agent Winnipeg",
    "buy home Winnipeg",
    "sell home Winnipeg",
    "investment properties Winnipeg",
    "Chapter Real Estate",
  ],
  authors: [{ name: "Chapter Real Estate", url: "https://chapterrealestate.ca" }],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://chapterrealestate.ca",
    siteName: "Chapter Real Estate",
    title: "Chapter Real Estate | Winnipeg's Full-Service Real Estate Company",
    description:
      "Chapter Real Estate is Winnipeg's full-service real estate company — brokerage, property management, and investment development all under one roof.",
    // Social share image is provided by app/opengraph-image.tsx (generated at build).
  },
  twitter: {
    card: "summary_large_image",
    title: "Chapter Real Estate | Winnipeg's Full-Service Real Estate Company",
    description:
      "Chapter Real Estate is Winnipeg's full-service real estate company — brokerage, property management, and investment development all under one roof.",
    // Falls back to the Open Graph image (app/opengraph-image.tsx).
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const socialLinks = await getSocialLinks();
  return (
    <html lang="en" className={`${geistSans.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <JsonLd />
        <Navbar socialLinks={socialLinks} />
        <ScrollObserver />
        <main className="flex-1"><PageTransition>{children}</PageTransition></main>
        <Footer />
      </body>
    </html>
  );
}
