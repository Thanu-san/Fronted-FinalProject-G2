"use client";

import React, { useState, useRef, useEffect } from "react";
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
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false); 
  
  // Ref for the dropdown to handle clicks outside
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

        {/* Center: Navigation Links */}
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

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-5">
          
          {/* Search Bar */}
          {pathname === "/" && (
            <form
              onSubmit={handleSearchSubmit}
              className="hidden sm:flex items-center relative w-64 md:w-72 lg:w-84 xl:w-96"
            >
              <div className="flex items-center w-full h-11 rounded-full bg-white/[0.08] px-4 border border-white/15 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30 focus-within:bg-white/[0.12] transition-all shadow-xs">
                <span className="text-zinc-400 mr-2.5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
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
          )}

          {/* Cart Icon */}
          <Link
            href="/cart"
            aria-label={`Shopping Cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
            className="relative p-2.5 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart">
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
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
              aria-label="Account Menu"
              className={`p-2.5 rounded-full transition-colors ${
                isAccountMenuOpen
                  ? "bg-white/10 text-white"
                  : "text-zinc-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round">
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
              </svg>
            </button>

            {isAccountMenuOpen && (
              <div className="absolute right-0 top-full mt-3 w-[240px] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] overflow-hidden z-[100] text-gray-800 font-sans border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
                
                {/* Top Auth Section */}
                <div className="p-4 flex flex-col items-center">
                  <Link 
                    href="/login"
                    onClick={() => setIsAccountMenuOpen(false)}
                    className="w-full bg-[#1a1a1a] hover:bg-black text-white text-base font-bold py-2.5 rounded-full text-center transition-colors mb-2"
                  >
                    Sign in
                  </Link>
                  <Link 
                    href="/register" 
                    onClick={() => setIsAccountMenuOpen(false)}
                    className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
                  >
                    Register
                  </Link>
                </div>

                <div className="w-full h-px bg-gray-100"></div>

                <ul className="py-2">
                  <DropdownIconItem 
                    href="/profile" 
                    onClick={() => setIsAccountMenuOpen(false)}
                    icon={<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />} 
                    label="My Profile" 
                  />
                  
                  <DropdownIconItem 
                    href="/cart" 
                    onClick={() => setIsAccountMenuOpen(false)}
                    icon={<path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.25 2.25 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />} 
                    label="My Orders" 
                  />
                  
                  <DropdownIconItem 
                    href="/cart" 
                    onClick={() => setIsAccountMenuOpen(false)}
                    icon={<path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />} 
                    label="Saved Items" 
                  />
                </ul>

                <div className="w-full h-px bg-gray-100"></div>

                {/* Simplified Text Links Section */}
                <ul className="py-2 mb-2">
                  <DropdownTextItem href="/profile" onClick={() => setIsAccountMenuOpen(false)} label="Account Settings" />
                  <DropdownTextItem href="/return-policy" onClick={() => setIsAccountMenuOpen(false)} label="Return Policy" />
                  <DropdownTextItem href="/about" onClick={() => setIsAccountMenuOpen(false)} label="Help Center" />
                </ul>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-zinc-300 hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-indigo-950/60 bg-gradient-to-b from-[#07080e] via-[#0a0d1d] to-[#252063] px-4 py-4 space-y-3">
          {pathname === "/" && (
            <form onSubmit={handleSearchSubmit} className="mb-3">
              <div className="flex items-center w-full h-11 rounded-full bg-white/[0.08] px-4 border border-white/15">
                <span className="text-zinc-400 mr-2.5 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
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
          )}

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

// Helper component for the links with icons
function DropdownIconItem({ icon, label, href, onClick }: { icon: React.ReactNode, label: string, href: string, onClick: () => void }) {
  return (
    <li>
      <Link href={href} onClick={onClick} className="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50 transition-colors group">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5 text-gray-700 group-hover:text-black">
          {icon}
        </svg>
        <span className="text-[15px] text-gray-700 group-hover:text-black">{label}</span>
      </Link>
    </li>
  );
}

// Helper component for the text-only links at the bottom
function DropdownTextItem({ label, href, onClick }: { label: string, href: string, onClick: () => void }) {
  return (
    <li>
      <Link href={href} onClick={onClick} className="block px-5 py-1.5 text-[13px] text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors">
        {label}
      </Link>
    </li>
  );
}