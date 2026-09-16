import React from "react";

interface ProductDetailComponentProps {
  slug?: string[];
}

export default function ProductDetail({ slug }: ProductDetailComponentProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
      <div className="aspect-square rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
        Product Image Gallery Placeholder
      </div>
      <div className="flex flex-col justify-center space-y-4">
        <h1 className="text-3xl font-bold">Product Information</h1>
        <p className="text-zinc-500">
          Route Slug: {slug?.join(" / ") || "Default"}
        </p>
        <div className="text-2xl font-semibold">$999</div>
        <button className="w-full sm:w-auto rounded-full bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-accent transition-colors">
          Add to Bag
        </button>
      </div>
    </div>
  );
}
