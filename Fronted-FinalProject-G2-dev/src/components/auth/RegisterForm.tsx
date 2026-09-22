import React from "react";
import Link from "next/link";

export default function RegisterForm() {
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-xs font-semibold mb-1 text-zinc-600 dark:text-zinc-400">
          Full Name
        </label>
        <input
          type="text"
          placeholder="First and Last Name"
          className="w-full rounded-xl border border-zinc-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:border-zinc-700 dark:bg-zinc-800"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1 text-zinc-600 dark:text-zinc-400">
          Email
        </label>
        <input
          type="email"
          placeholder="name@example.com"
          className="w-full rounded-xl border border-zinc-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:border-zinc-700 dark:bg-zinc-800"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1 text-zinc-600 dark:text-zinc-400">
          Password
        </label>
        <input
          type="password"
          placeholder="Create password"
          className="w-full rounded-xl border border-zinc-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:border-zinc-700 dark:bg-zinc-800"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-white hover:bg-accent transition-colors"
      >
        Continue
      </button>
      <p className="text-center text-xs text-zinc-500">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
