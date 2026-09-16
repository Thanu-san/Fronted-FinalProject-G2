import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="font-semibold text-lg hover:text-primary transition-colors"
        >
          ShopNow
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/products"
            className="hover:text-primary transition-colors"
          >
            Products
          </Link>
          <Link
            href="/data-table"
            className="hover:text-primary transition-colors"
          >
            Data Table
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/cart" className="hover:text-primary transition-colors">
            Cart
          </Link>
          <Link
            href="/checkout"
            className="hover:text-primary transition-colors"
          >
            Checkout
          </Link>
          <Link href="/login" className="hover:text-primary transition-colors">
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}
