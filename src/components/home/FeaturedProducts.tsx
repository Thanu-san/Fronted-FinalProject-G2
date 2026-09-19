"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { Product } from "@/types/product";

interface FeaturedProductsProps {
  products?: Product[];
}

// Curated fallbacks matching the mockup in case the API is loading or network is unavailable
const FALLBACK_BEST_SELLERS: Product[] = [
  {
    uuid: "best-seller-1",
    name: "Wireless Game Controller",
    description: "Ergonomic wireless gamepad with precision thumbsticks.",
    priceOut: 39.99,
    discount: 25,
    stockQuantity: 30,
    availability: true,
    thumbnail:
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=600&q=80",
    computerSpec: null,
    images: [],
    color: [],
    filteredImage: null,
    warranty: "1 Year",
    category: null,
    brand: null,
  },
  {
    uuid: "best-seller-2",
    name: "RGB Mechanical Keyboard",
    description: "Custom mechanical switches with per-key RGB backlighting.",
    priceOut: 29.99,
    discount: 20,
    stockQuantity: 25,
    availability: true,
    thumbnail:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80",
    computerSpec: null,
    images: [],
    color: [],
    filteredImage: null,
    warranty: "1 Year",
    category: null,
    brand: null,
  },
  {
    uuid: "best-seller-3",
    name: "HD Webcam 1080P",
    description: "Crystal clear full HD streaming camera with stereo mic.",
    priceOut: 49.99,
    discount: null,
    stockQuantity: 40,
    availability: true,
    thumbnail:
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80",
    computerSpec: null,
    images: [],
    color: [],
    filteredImage: null,
    warranty: "1 Year",
    category: null,
    brand: null,
  },
  {
    uuid: "best-seller-4",
    name: "2.1 Speaker System",
    description:
      "Powerful subwoofer and satellite acoustics for room-filling sound.",
    priceOut: 69.99,
    discount: 15,
    stockQuantity: 18,
    availability: true,
    thumbnail:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80",
    computerSpec: null,
    images: [],
    color: [],
    filteredImage: null,
    warranty: "1 Year",
    category: null,
    brand: null,
  },
  {
    uuid: "best-seller-5",
    name: "Smart Bluetooth Speaker",
    description: "Portable 360-degree wireless speaker with deep bass.",
    priceOut: 29.99,
    discount: null,
    stockQuantity: 50,
    availability: true,
    thumbnail:
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600&q=80",
    computerSpec: null,
    images: [],
    color: [],
    filteredImage: null,
    warranty: "1 Year",
    category: null,
    brand: null,
  },
  {
    uuid: "best-seller-6",
    name: "Ergonomic Wireless Mouse",
    description:
      "Precision optical sensor with sculpted thumb rest for all-day comfort.",
    priceOut: 19.99,
    discount: 30,
    stockQuantity: 60,
    availability: true,
    thumbnail:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&q=80",
    computerSpec: null,
    images: [],
    color: [],
    filteredImage: null,
    warranty: "1 Year",
    category: null,
    brand: null,
  },
  {
    uuid: "best-seller-7",
    name: "Pro Gaming Headset",
    description:
      "Noise cancelling spatial audio with breathable memory foam pads.",
    priceOut: 44.99,
    discount: 10,
    stockQuantity: 35,
    availability: true,
    thumbnail:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    computerSpec: null,
    images: [],
    color: [],
    filteredImage: null,
    warranty: "1 Year",
    category: null,
    brand: null,
  },
  {
    uuid: "best-seller-8",
    name: "DualShock Wireless Gamepad",
    description:
      "Haptic feedback triggers and motion sensors for immersive gameplay.",
    priceOut: 34.99,
    discount: null,
    stockQuantity: 40,
    availability: true,
    thumbnail:
      "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=600&q=80",
    computerSpec: null,
    images: [],
    color: [],
    filteredImage: null,
    warranty: "1 Year",
    category: null,
    brand: null,
  },
];

export default function FeaturedProducts({
  products = [],
}: FeaturedProductsProps) {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Use API products with valid thumbnails, or fall back to the curated 8 best sellers
  const validApiProducts = products
    .filter((p) => p.thumbnail && /^https?:\/\//i.test(p.thumbnail) && p.name)
    .slice(0, 8);

  const displayProducts =
    validApiProducts.length >= 4 ? validApiProducts : FALLBACK_BEST_SELLERS;

  // Stable reviews count generator for aesthetic UI
  const reviewCounts = [128, 95, 76, 64, 52, 110, 86, 67];

  return (
    <section className="py-14 sm:py-20 bg-white" aria-label="Featured Products">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ── Section Header ─────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            {/* Tag Badge with Requested Boxes Icon */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary mb-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-boxes"
                >
                  <path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z" />
                  <path d="m7 16.5-4.74-2.85" />
                  <path d="m7 16.5 5-3" />
                  <path d="M7 16.5v5.17" />
                  <path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z" />
                  <path d="m17 16.5-5-3" />
                  <path d="m17 16.5 4.74-2.85" />
                  <path d="M17 16.5v5.17" />
                  <path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z" />
                  <path d="M12 8 7.26 5.15" />
                  <path d="m12 8 4.74-2.85" />
                  <path d="M12 13.5V8" />
                </svg>
              </span>
              <span>Our Collection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">
              Explore Our Best Sellers
            </h2>
          </div>

          {/* View All Products Button */}
          <div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-xs font-semibold text-zinc-700 shadow-xs transition-all duration-200 hover:border-primary hover:text-primary hover:shadow-sm active:scale-95"
            >
              <span>View All Products</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
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

        {/* ── Products Grid (8 Items) ─────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {displayProducts.map((product, idx) => {
            const hasDiscount = product.discount && product.discount > 0;
            const originalPrice = hasDiscount
              ? (product.priceOut * 1.25).toFixed(2)
              : (product.priceOut * 1.15).toFixed(2);

            // Badge determination
            let badgeText = "";
            let badgeClass = "";
            if (hasDiscount) {
              badgeText = `${product.discount}% OFF`;
              badgeClass = "bg-[#4F46E5] text-white";
            } else if (idx % 3 === 0) {
              badgeText = "Best Seller";
              badgeClass = "bg-[#3730A3] text-white";
            } else {
              badgeText = "New";
              badgeClass = "bg-[#1E40AF] text-white";
            }

            const isFailed = failedImages[product.uuid];

            return (
              <article
                key={product.uuid}
                className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
              >
                {/* Top Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span
                    className={`inline-block rounded-md px-2 py-0.5 text-[11px] font-bold shadow-xs ${badgeClass}`}
                  >
                    {badgeText}
                  </span>
                </div>

                {/* Product Image */}
                <Link
                  href={`/products/${product.uuid}`}
                  className="relative flex h-44 w-full items-center justify-center p-2 mb-3 overflow-hidden"
                >
                  {product.thumbnail && !isFailed ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      loading="lazy"
                      onError={() =>
                        setFailedImages((prev) => ({
                          ...prev,
                          [product.uuid]: true,
                        }))
                      }
                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-xl bg-zinc-50 text-xs text-zinc-400">
                      Image unavailable
                    </div>
                  )}
                </Link>

                {/* Product Info */}
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    {/* Title */}
                    <h3 className="text-sm font-bold text-zinc-900 transition-colors group-hover:text-primary line-clamp-1">
                      <Link href={`/products/${product.uuid}`}>
                        {product.name}
                      </Link>
                    </h3>

                    {/* Star Ratings */}
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <div className="flex text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-[11px] font-medium text-zinc-400">
                        ({reviewCounts[idx % reviewCounts.length]})
                      </span>
                    </div>
                  </div>

                  {/* Price & Cart Button Row */}
                  <div className="mt-4 flex items-center justify-between pt-2 border-t border-zinc-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base sm:text-lg font-black text-rose-600">
                        ${product.priceOut.toFixed(2)}
                      </span>
                      <span className="text-xs text-zinc-400 line-through">
                        ${originalPrice}
                      </span>
                    </div>

                    {/* Cart Button */}
                    <Link
                      href={`/products/${product.uuid}`}
                      aria-label={`View ${product.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200/80 bg-white text-zinc-600 transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-white active:scale-95 shadow-xs"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-shopping-cart"
                      >
                        <circle cx="8" cy="21" r="1" />
                        <circle cx="19" cy="21" r="1" />
                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
