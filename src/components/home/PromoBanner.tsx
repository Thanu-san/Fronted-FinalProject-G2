"use client";

import React from "react";
import Link from "next/link";
import { CardStack, type CardStackItem } from "@/components/ui/card-stack";
import type { Product } from "@/types/product";

interface PromoBannerProps {
  products?: Product[];
}

export default function PromoBanner({ products = [] }: PromoBannerProps) {
  // Prepare special offer items for CardStack
  const discountedProducts = products
    .filter((p) => p.thumbnail && /^https?:\/\//i.test(p.thumbnail))
    .slice(0, 5);

  const fallbackItems: CardStackItem[] = [
    {
      id: "offer-1",
      title: "Enhance Your Music Experience",
      description: "AirPods Max & Premium Studio Acoustics - Up to 25% OFF",
      imageSrc:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      tag: "25% OFF",
      href: "/products?search=audio",
    },
    {
      id: "offer-2",
      title: "Next-Gen Gaming Laptops",
      description: "RTX 40-Series Powered Machines for Ultimate Performance",
      imageSrc:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
      tag: "Flash Sale",
      href: "/products?search=laptop",
    },
    {
      id: "offer-3",
      title: "Smart Ecosystem Wearables",
      description: "All-day biometric tracking, titanium finish & OLED screen",
      imageSrc:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      tag: "Hot Deal",
      href: "/products?search=watch",
    },
    {
      id: "offer-4",
      title: "Immersive Ultra-Wide Displays",
      description: "Crystal clear 4K resolution with 144Hz high refresh rate",
      imageSrc:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
      tag: "Special Offer",
      href: "/products?search=monitor",
    },
  ];

  const cardItems: CardStackItem[] =
    discountedProducts.length >= 3
      ? discountedProducts.map((p) => ({
          id: p.uuid,
          title: p.name,
          description: p.description
            ? p.description.slice(0, 90) + "..."
            : `Special Offer: $${p.priceOut.toFixed(2)}`,
          imageSrc: p.thumbnail || undefined,
          tag: p.discount ? `${p.discount}% OFF` : "Limited Deal",
          href: `/products/${p.uuid}`,
        }))
      : fallbackItems;

  return (
    <section
      className="py-14 sm:py-20 bg-zinc-50/50"
      aria-label="Special Offers"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ── Outer Offer Banner Card (Centered & Clean) ──────────────── */}
        <div className="relative overflow-hidden rounded-3xl border border-purple-100/80 bg-gradient-to-br from-[#FAF8FF] via-[#F6F2FF] to-[#EDE9FE] px-6 py-12 sm:px-12 sm:py-16 shadow-sm">
          {/* Subtle background ambient glows */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />

          {/* ── Centered Header ───────────────────────────────────────── */}
          <div className="relative z-10 flex flex-col items-center text-center mb-8 sm:mb-10">
            {/* Special Offer Pill Badge with requested Badge-Percent Icon */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary border border-primary/20 shadow-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-badge-percent"
              >
                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                <path d="m15 9-6 6" />
                <path d="M9 9h.01" />
                <path d="M15 15h.01" />
              </svg>
              <span>Special Offer</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900">
              Unlock Exclusive Savings Today
            </h2>
            <p className="mt-4 text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto">
              Discover unbeatable deals and limited-time discounts on top-tier products designed to elevate your everyday experience.
            </p>
          </div>

          {/* ── Centered 3D CardStack Component ───────────────────────── */}
          <div className="relative z-10 mx-auto flex justify-center w-full max-w-4xl">
            <CardStack
              items={cardItems}
              cardWidth={460}
              cardHeight={280}
              overlap={0.46}
              spreadDeg={42}
              autoAdvance
              intervalMs={2800}
              pauseOnHover
              showDots
            />
          </div>

          {/* ── Centered Check it Out CTA Button ──────────────────────── */}
          <div className="relative z-10 mt-8 sm:mt-10 flex justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/35 active:scale-95"
            >
              <span>Check it Out</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
