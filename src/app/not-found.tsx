import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <span className="text-sm uppercase tracking-widest font-semibold text-blue-600 mb-2">
        404
      </span>
      <h1 className="text-4xl font-bold tracking-tight">Page Not Found</h1>
      <p className="mt-4 text-base text-zinc-500 max-w-md">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>

      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Go to Homepage
        </Link>
        <Link
          href="/products"
          className="px-5 py-2.5 rounded-full border border-zinc-300 dark:border-zinc-700 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          View Products
        </Link>
      </div>
    </main>
  );
}
