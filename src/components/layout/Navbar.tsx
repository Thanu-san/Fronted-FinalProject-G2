"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import nextShopLogo from "@/assets/NextShop.png";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { itemCount } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false); // Added state for dropdown

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-indigo-950/60 bg-gradient-to-r from-[#07080e] via-[#0a0d1d] via-70% to-[#252063] text-white shadow-md shadow-black/20 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-22 sm:h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-6">
        {/* Left: Prominent & Bigger Logo */}
        <Link href="/" className="flex items-center shrink-0 group py-1">
          <Image
            src={nextShopLogo}
            alt="NextShop Logo"
            width={280}
            height={140}
            priority
            className="w-44 sm:w-52 md:w-60 h-auto max-h-18 sm:max-h-20 object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </Link>

        {/* Center: Navigation Links (Home, Products, About) with tight underline */}
        <nav className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className="group relative flex flex-col items-center py-2"
              >
                <span
                  className={`text-[15px] font-semibold transition-colors duration-150 ${
                    isActive ? "text-white" : "text-zinc-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </span>

                {/* Underline directly beneath the text */}
                <span
                  className={`mt-1.5 h-0.5 w-full rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-primary opacity-100 scale-x-100"
                      : "bg-primary opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-75"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Bigger & Longer Search Bar + Cart & User Icons */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Bigger and Longer Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden sm:flex items-center relative w-64 md:w-72 lg:w-84 xl:w-96"
          >
            <div className="flex items-center w-full h-11 rounded-full bg-white/[0.08] px-4 border border-white/15 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30 focus-within:bg-white/[0.12] transition-all shadow-xs">
              <span className="text-zinc-400 mr-2.5 shrink-0">
                {/* Search Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-search"
                >
                  <path d="m21 21-4.34-4.34" />
                  <circle cx="11" cy="11" r="8" />
                </svg>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-transparent text-sm text-white placeholder-zinc-400 focus:outline-none"
              />
            </div>
          </form>

          {/* Cart Icon */}
          <Link
            href="/cart"
            aria-label={`Shopping Cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
            className="relative p-2.5 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-shopping-cart"
            >
              <path d="m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18" />
              <path d="M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25" />
              <circle cx="18" cy="20" r="2" />
              <circle cx="8" cy="20" r="2" />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-white shadow-sm">
              {itemCount > 99 ? "99+" : itemCount}
            </span>
          </Link>

          {/* User / Account Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
              aria-label="Account Menu"
              className={`p-2.5 rounded-full transition-colors ${
                isAccountMenuOpen ? "bg-white/10 text-white" : "text-zinc-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-user-round"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
              </svg>
            </button>

            {isAccountMenuOpen && (
              <>
                {/* Invisible overlay to close dropdown when clicking outside */}
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsAccountMenuOpen(false)}
                ></div>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-800 z-50 py-1 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <Link 
                    href="/login" 
                    onClick={() => setIsAccountMenuOpen(false)}
                    className="block px-4 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register" 
                    onClick={() => setIsAccountMenuOpen(false)}
                    className="block px-4 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    Create Account
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-300 hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-indigo-950/60 bg-gradient-to-b from-[#07080e] via-[#0a0d1d] to-[#252063] px-4 py-4 space-y-3">
          {/* Mobile Search Input */}
          <form onSubmit={handleSearchSubmit} className="mb-3">
            <div className="flex items-center w-full h-11 rounded-full bg-white/[0.08] px-4 border border-white/15">
              <span className="text-zinc-400 mr-2.5 shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-search"
                >
                  <path d="m21 21-4.34-4.34" />
                  <circle cx="11" cy="11" r="8" />
                </svg>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-transparent text-sm text-white placeholder-zinc-400 focus:outline-none"
              />
            </div>
          </form>

          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-primary/20 text-white border border-primary/30"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}