"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import type { Product } from "@/types/product";

interface HeroProps {
  products?: Product[];
}

// Curated fallbacks in case the API is loading or network is unavailable
const FALLBACK_PRODUCTS: Product[] = [
  {
    uuid: "hero-featured-headphones",
    name: "Roco Wireless Headphones",
    description:
      "Experience premium sound quality with deep bass, active noise cancellation, and all-day comfort.",
    priceOut: 89.0,
    discount: 15,
    stockQuantity: 40,
    availability: true,
    thumbnail:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    computerSpec: null,
    images: [],
    color: [],
    filteredImage: null,
    warranty: "1 Year",
    category: { uuid: "c1", name: "Audio", description: null, media: null },
    brand: { uuid: "b1", name: "Roco", description: null, brandLogo: null },
  },
  {
    uuid: "hero-featured-laptop",
    name: 'Ultra-Slim Pro Laptop 15"',
    description:
      "Engineered with next-generation high performance processor, vibrant OLED display, and all-day battery life.",
    priceOut: 1199.0,
    discount: 10,
    stockQuantity: 25,
    availability: true,
    thumbnail:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
    computerSpec: null,
    images: [],
    color: [],
    filteredImage: null,
    warranty: "2 Years",
    category: { uuid: "c2", name: "Computers", description: null, media: null },
    brand: { uuid: "b2", name: "NextTech", description: null, brandLogo: null },
  },
  {
    uuid: "hero-featured-watch",
    name: "NextWatch Series X Smartwatch",
    description:
      "Stay connected, track your workouts, and monitor your wellness seamlessly with advanced sensors.",
    priceOut: 249.0,
    discount: 20,
    stockQuantity: 50,
    availability: true,
    thumbnail:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    computerSpec: null,
    images: [],
    color: [],
    filteredImage: null,
    warranty: "1 Year",
    category: { uuid: "c3", name: "Wearables", description: null, media: null },
    brand: { uuid: "b3", name: "NextTech", description: null, brandLogo: null },
  },
];

export default function HeroSection({ products }: HeroProps) {
  // Filter for products that have a usable thumbnail and name
  const validProducts =
    products && products.length > 0
      ? products
          .filter(
            (p) =>
              p.thumbnail &&
              /^https?:\/\//i.test(p.thumbnail) &&
              p.name &&
              p.name.trim().length > 0,
          )
          .slice(0, 4)
      : [];

  const displayList =
    validProducts.length > 0 ? validProducts : FALLBACK_PRODUCTS;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance slides every 6 seconds unless paused on hover
  useEffect(() => {
    if (isPaused || displayList.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayList.length);
      setImageError(false);
    }, 6000);
    return () => clearInterval(timer);
  }, [displayList.length, isPaused]);

  const currentProduct = displayList[currentIndex] || displayList[0];

  const price = currentProduct.priceOut
    ? currentProduct.priceOut.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : "89.00";

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative overflow-hidden bg-gradient-to-br from-[#FFF9F5] via-[#FAF5FF] to-[#EEF2FF] py-14 sm:py-20 lg:py-24 transition-colors"
      aria-label="Featured Product Showcase"
    >
      {/* ── Background Decorative Shapes & Grid ───────────────────────── */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-[480px] w-[480px] rounded-full bg-gradient-to-br from-primary/10 to-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 -bottom-24 h-[480px] w-[480px] rounded-full bg-orange-400/5 blur-3xl" />

      {/* Subtle Dot Grid behind product on right side */}
      <div
        className="pointer-events-none absolute right-12 top-1/2 -translate-y-1/2 hidden lg:block h-64 w-64 opacity-30 bg-[radial-gradient(#818cf8_1.5px,transparent_1.5px)] [background-size:18px_18px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* ── Left Column: Product Information & CTA ──────────────── */}
          <div className="flex flex-col items-start lg:col-span-6 z-10">
            {/* New Arrival Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-3.5 py-1.5 text-xs font-semibold text-orange-600 border border-orange-500/20 shadow-xs mb-5">
              <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              <span>New Arrival</span>
            </div>

            {/* Product Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 leading-[1.1] mb-5">
              {currentProduct.name}
            </h1>

            {/* Product Description */}
            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-xl line-clamp-3 mb-8">
              {currentProduct.description ||
                "Experience premium build quality, modern aesthetics, and seamless digital performance designed for your everyday lifestyle."}
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              <Link
                href={`/products/${currentProduct.uuid}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:bg-primary-hover hover:shadow-xl hover:shadow-primary/35 active:scale-95"
              >
                <span>Shop Now</span>
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

          {/* ── Right Column: Hero Product Image & Floating Price Badge ── */}
          <div className="relative flex items-center justify-center lg:col-span-6 min-h-[340px] sm:min-h-[420px]">
            {/* Floating Price Pill Badge */}
            <div className="absolute top-2 left-4 sm:top-6 sm:left-8 z-20 flex flex-col items-center justify-center rounded-full bg-white/95 px-5 py-3 shadow-xl backdrop-blur-md border border-zinc-100 ring-4 ring-black/5 animate-in fade-in zoom-in duration-300">
              <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                Only
              </span>
              <span className="text-lg sm:text-xl font-black text-primary">
                ${price}
              </span>
            </div>

            {/* Product Image */}
            <div className="relative flex items-center justify-center w-full">
              <Link
                href={`/products/${currentProduct.uuid}`}
                className="group relative flex items-center justify-center"
              >
                {currentProduct.thumbnail && !imageError ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={currentProduct.thumbnail}
                    alt={currentProduct.name}
                    loading="eager"
                    onError={() => setImageError(true)}
                    className="max-h-[320px] sm:max-h-[400px] lg:max-h-[440px] w-auto max-w-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-72 w-72 sm:h-80 sm:w-80 items-center justify-center rounded-3xl bg-white/80 shadow-inner border border-zinc-200/80 text-zinc-400">
                    <span className="text-sm font-medium">
                      Image unavailable
                    </span>
                  </div>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* ── Bottom Carousel Dots Indicator ( — • • • ) ───────────────── */}
        {displayList.length > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            {displayList.map((item, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={item.uuid || index}
                  type="button"
                  onClick={() => {
                    setCurrentIndex(index);
                    setImageError(false);
                  }}
                  aria-label={`Go to slide ${index + 1}: ${item.name}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    isActive
                      ? "h-2 w-8 bg-primary"
                      : "h-2 w-2 bg-zinc-300 hover:bg-primary/50"
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
