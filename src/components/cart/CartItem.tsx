import React from "react";

export default function CartItem() {
  return (
    <div className="flex items-center justify-between border-b border-zinc-200 py-4 dark:border-zinc-800">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs text-zinc-400">
          Image
        </div>
        <div>
          <h4 className="font-semibold text-sm">Product Item</h4>
          <p className="text-xs text-zinc-500">$999</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs">Qty: 1</span>
        <button className="text-xs text-rose-500 hover:underline">Remove</button>
      </div>
    </div>
  );
}

