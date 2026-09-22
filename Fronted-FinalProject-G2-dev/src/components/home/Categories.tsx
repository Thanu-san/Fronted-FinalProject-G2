"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import type { Product } from "@/types/product";

interface CategoriesProps {
  products?: Product[];
}

export default function Categories({ products = [] }: CategoriesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Compute actual counts from products or use realistic defaults
  const getCount = (keyword: RegExp, fallback: number) => {
    if (!products || products.length === 0) return `${fallback} items`;
    const count = products.filter((p) => keyword.test(p.name)).length;
    return count > 0 ? `${count} items` : `${fallback} items`;
  };

  const categories = [
    {
      id: "phones",
      name: "Phones",
      count: getCount(/phone|iphone|galaxy/i, 24),
      href: "/products?search=phone",
      colorClass:
        "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
          <path d="M12 18h.01" />
        </svg>
      ),
    },
    {
      id: "computers",
      name: "Computers",
      count: getCount(/desktop|pc|mac|imac/i, 18),
      href: "/products?search=computer",
      colorClass:
        "bg-indigo-50 text-primary group-hover:bg-primary group-hover:text-white",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="14" height="12" x="2" y="3" rx="2" />
          <path d="M6 19h6" />
          <path d="M9 15v4" />
          <rect width="6" height="14" x="16" y="3" rx="1" />
        </svg>
      ),
    },
    {
      id: "accessories",
      name: "Accessories",
      count: getCount(/case|cover|charger|cable|accessory/i, 36),
      href: "/products?search=accessories",
      colorClass:
        "bg-violet-50 text-accent group-hover:bg-accent group-hover:text-white",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 10a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4Z" />
          <path d="m8 11 1.5 2 3-3" />
          <path d="M18 11h.01" />
        </svg>
      ),
    },
    {
      id: "laptops",
      name: "Laptops",
      count: getCount(/laptop|notebook|macbook|dell|lenovo|asus|hp/i, 113),
      href: "/products?search=laptop",
      colorClass:
        "bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
        </svg>
      ),
    },
    {
      id: "audio",
      name: "Audio",
      count: getCount(/headphone|earphone|audio|speaker|airpod/i, 28),
      href: "/products?search=audio",
      colorClass:
        "bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
        </svg>
      ),
    },
    {
      id: "networking",
      name: "Networking",
      count: getCount(/router|wifi|network/i, 14),
      href: "/products?search=networking",
      colorClass:
        "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="8" x="2" y="14" rx="2" />
          <path d="M6 14V8" />
          <path d="M18 14V8" />
          <path d="M12 14v-4" />
          <path d="M9 4a3 3 0 0 1 6 0" />
        </svg>
      ),
    },
    {
      id: "gaming",
      name: "Gaming",
      count: getCount(/gaming|rog|tuf|legion|zephyrus|titan/i, 32),
      href: "/products?search=gaming",
      colorClass:
        "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="6" x2="10" y1="12" y2="12" />
          <line x1="8" x2="8" y1="10" y2="14" />
          <line x1="15" x2="15.01" y1="13" y2="13" />
          <line x1="18" x2="18.01" y1="11" y2="11" />
          <rect width="20" height="12" x="2" y="6" rx="6" />
        </svg>
      ),
    },
    // ── 3 New Categories ───────────────────────────────────────────────
    {
      id: "smartwatches",
      name: "Smartwatches",
      count: getCount(/watch|smartwatch/i, 19),
      href: "/products?search=watch",
      colorClass:
        "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="12" height="14" x="6" y="5" rx="3" />
          <path d="M12 1v4" />
          <path d="M12 19v4" />
          <path d="M9 10h6" />
          <path d="M12 7v3" />
        </svg>
      ),
    },
    {
      id: "tablets",
      name: "Tablets",
      count: getCount(/tablet|ipad/i, 22),
      href: "/products?search=tablet",
      colorClass:
        "bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
          <line x1="12" x2="12.01" y1="18" y2="18" />
        </svg>
      ),
    },
    {
      id: "monitors",
      name: "Monitors",
      count: getCount(/monitor|display|screen/i, 16),
      href: "/products?search=monitor",
      colorClass:
        "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="14" x="2" y="3" rx="2" />
          <line x1="8" x2="16" y1="21" y2="21" />
          <line x1="12" x2="12" y1="17" y2="21" />
        </svg>
      ),
    },
  ];

  return (
    <section
      className="py-12 sm:py-16 bg-white transition-colors"
      aria-label="Product Categories"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ── Section Header & Navigation Arrows ──────────────────────── */}
        <div className="flex items-end justify-between mb-8">
          <div>
            {/* Tag Badge with Requested Shopping Bag Icon */}
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
                  className="lucide lucide-shopping-bag"
                >
                  <path d="M16 10a4 4 0 0 1-8 0" />
                  <path d="M3.103 6.034h17.794" />
                  <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
                </svg>
              </span>
              <span>Shop by Category</span>
            </div>
            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900">
              Browse by Category
            </h2>
          </div>

          {/* Left (Previous) & Right (Next) Scroll Arrows */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous categories"
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 active:scale-95 cursor-pointer ${
                canScrollLeft
                  ? "border-zinc-300 text-zinc-700 hover:border-primary hover:bg-primary hover:text-white"
                  : "border-zinc-200 text-zinc-300 cursor-not-allowed opacity-50"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Next categories"
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 active:scale-95 cursor-pointer ${
                canScrollRight
                  ? "border-zinc-300 text-zinc-700 hover:border-primary hover:bg-primary hover:text-white"
                  : "border-zinc-200 text-zinc-300 cursor-not-allowed opacity-50"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Scrollable Horizontal Carousel Row with Snap ───────────── */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group flex flex-col items-center justify-center rounded-2xl bg-white border border-zinc-200/70 p-5 sm:p-6 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 shrink-0 w-[150px] sm:w-[168px] md:w-[178px] snap-start text-center"
            >
              {/* Category Icon */}
              <div
                className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 ${category.colorClass}`}
              >
                {category.icon}
              </div>

              {/* Category Name */}
              <h3 className="text-sm sm:text-base font-bold text-zinc-900 transition-colors group-hover:text-primary">
                {category.name}
              </h3>

              {/* Item Count */}
              <p className="mt-1 text-xs text-zinc-400 font-medium">
                {category.count}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
