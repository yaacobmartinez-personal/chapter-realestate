import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/ui/PageTransition";
import ScrollObserver from "@/components/ui/ScrollObserver";

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
  title: "Chapter Real Estate & Property Management",
  description: "A modern real estate platform serving Winnipeg and beyond. Buy, sell, invest, and manage properties with Chapter.",
  keywords: "real estate, property management, Winnipeg, buy home, sell home, investment properties",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Navbar />
        <ScrollObserver />
        <main className="flex-1"><PageTransition>{children}</PageTransition></main>
        <Footer />
      </body>
    </html>
  );
}
