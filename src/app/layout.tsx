import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://ishop.cheat.casa"
  ),
  title: {
    template: "%s | NextShop",
    default: "NextShop | Modern E-Commerce Platform - Better Products, Brighter Days",
  },
  description:
    "NextShop is a modern, responsive e-commerce web application built with Next.js App Router, Tailwind CSS, and TypeScript for the ISTAD Frontend Final Project by Group 2.",
  keywords: [
    "NextShop",
    "E-Commerce",
    "Online Shopping",
    "Electronics",
    "Smart Gadgets",
    "ISTAD",
    "Next.js App Router",
    "Tailwind CSS",
    "TypeScript",
    "Frontend Final Project Group 2",
  ],
  authors: [{ name: "Group 2 - ISTAD", url: "https://istad.co" }],
  creator: "Group 2",
  publisher: "ISTAD",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "NextShop",
    title: "NextShop | Better Products, Brighter Days",
    description:
      "Explore quality tech, gadgets, and lifestyle essentials with fast delivery and secure checkout. Built by Group 2 for the ISTAD Frontend Final Project.",
    images: [
      {
        url: "/NextShop-Thumbnail.png",
        width: 1200,
        height: 630,
        alt: "NextShop - Modern E-Commerce Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NextShop | Modern E-Commerce Platform",
    description:
      "Better Products, Brighter Days. Discover quality tech and lifestyle products on NextShop.",
    images: ["/NextShop-Thumbnail.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}