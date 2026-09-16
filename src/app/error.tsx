"use client";

import React, { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <span className="text-sm uppercase tracking-widest font-semibold text-rose-600 mb-2">
        Error
      </span>
      <h1 className="text-3xl font-bold tracking-tight">
        Something went wrong!
      </h1>
      <p className="mt-4 text-sm text-zinc-500 max-w-md">
        {error.message || "An unexpected error occurred."}
      </p>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-accent transition-colors cursor-pointer"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-full border border-zinc-300 dark:border-zinc-700 text-sm font-medium hover:bg-secondary dark:hover:bg-zinc-800 transition-colors"
        >
          Go to Homepage
        </Link>
      </div>
    </main>
  );
}
