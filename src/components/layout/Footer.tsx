import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 bg-zinc-50 py-8 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 mt-auto">
      <div className="mx-auto max-w-6xl px-4">
        <p>
          Copyright &copy; {new Date().getFullYear()} Group 2. All rights
          reserved.
        </p>
        <p className="mt-1">
          ISTAD Frontend Final Project - Ecommerce Platform
        </p>
      </div>
    </footer>
  );
}
