import React from "react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="py-20 text-center flex flex-col items-center justify-center">
      <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
        iPhone 16 Pro
      </h1>
      <p className="mt-4 text-xl text-zinc-500">Hello, Apple Intelligence.</p>
      <div className="mt-6 flex gap-4">
        <Link
          href="/products"
          className="rounded-full bg-primary px-5 py-2 text-sm text-white hover:bg-accent transition-colors"
        >
          Explore Store
        </Link>
      </div>
    </section>
  );
}
