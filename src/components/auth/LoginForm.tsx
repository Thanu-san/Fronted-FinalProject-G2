import React from "react";
import Link from "next/link";

export default function LoginForm() {
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-xs font-semibold mb-1 text-zinc-600 dark:text-zinc-400">
          Email or Apple ID
        </label>
        <input
          type="email"
          placeholder="name@example.com"
          className="w-full rounded-xl border border-zinc-300 p-3 text-sm dark:border-zinc-700 dark:bg-zinc-800"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1 text-zinc-600 dark:text-zinc-400">
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full rounded-xl border border-zinc-300 p-3 text-sm dark:border-zinc-700 dark:bg-zinc-800"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
      >
        Sign In
      </button>
      <p className="text-center text-xs text-zinc-500">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          Create one now
        </Link>
      </p>
    </form>
  );
}
