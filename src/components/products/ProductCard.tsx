import React from "react";
import Link from "next/link";

interface ProductCardProps {
  id?: string;
  name?: string;
  price?: number;
  category?: string;
}

export default function ProductCard({
  id = "sample-product",
  name = "Sample Product",
  price = 999,
  category = "devices",
}: ProductCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="aspect-square w-full rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 text-xs">
        Image Placeholder
      </div>
      <div className="mt-4">
        <span className="text-xs text-zinc-400 uppercase tracking-wider">
          {category}
        </span>
        <h3 className="text-lg font-bold mt-1">{name}</h3>
        <p className="text-sm font-semibold mt-1">${price}</p>
      </div>
      <Link
        href={`/products/${id}`}
        className="mt-4 block text-center rounded-full bg-zinc-900 py-2 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-900"
      >
        View Details
      </Link>
    </div>
  );
}
