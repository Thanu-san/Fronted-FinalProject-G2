import React from "react";

export default function ProductsLoading() {
  return (
    <div className="flex-1 p-8 max-w-6xl mx-auto w-full animate-pulse">
      <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4 mb-4" />
      <div className="h-4 bg-zinc-100 dark:bg-zinc-800/50 rounded w-1/2 mb-8" />
    </div>
  );
}
