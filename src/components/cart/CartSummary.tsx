import React from "react";

export default function CartSummary() {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 space-y-4">
      <h3 className="font-bold text-lg">Order Summary</h3>
      <div className="flex justify-between text-sm">
        <span className="text-zinc-500">Subtotal</span>
        <span className="font-semibold">$999.00</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-zinc-500">Shipping</span>
        <span className="text-emerald-600 font-semibold">FREE</span>
      </div>
      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 flex justify-between font-bold">
        <span>Total</span>
        <span>$999.00</span>
      </div>
      <button className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-white hover:bg-accent transition-colors">
        Checkout
      </button>
    </div>
  );
}
