import React from "react";

export default function ProductSearch() {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
