import React from "react";

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 animate-pulse">
      {/* Top Banner Skeleton */}
      <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-xl w-1/3 mb-4 mx-auto" />
      <div className="h-6 bg-zinc-100 dark:bg-zinc-800/60 rounded-md w-1/2 mb-12 mx-auto" />

      {/* Grid of Skeleton Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div
            key={idx}
            className="rounded-3xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 space-y-6"
          >
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4" />
            <div className="h-7 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
            <div className="aspect-square bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl w-full" />
            <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-full w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
