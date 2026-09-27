"use client";

import Link from "next/link";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    isReady,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useCart();

  if (!isReady) {
    return (
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6">
        <div className="h-8 w-40 animate-pulse rounded bg-indigo-100" />
        <div className="mt-8 h-64 animate-pulse rounded-2xl bg-indigo-50" />
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-violet-500">
        Your cart
      </p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            Shopping Cart
          </h1>
          <p className="mt-2 text-zinc-500">
            {itemCount === 0
              ? "Your selected products will appear here."
              : `${itemCount} ${itemCount === 1 ? "item" : "items"} ready for checkout.`}
          </p>
        </div>
        {items.length > 0 && (
          <Link
            href="/products"
            className="text-sm font-semibold text-indigo-600 hover:underline"
          >
            Continue shopping
          </Link>
        )}
      </div>

      {items.length === 0 ? (
        <section className="mt-8 rounded-2xl border border-dashed border-indigo-200 bg-indigo-50/60 px-6 py-16 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
            🛍️
          </div>
          <h2 className="mt-5 text-xl font-bold text-zinc-900">
            Your cart is empty
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-zinc-500">
            Explore our products and add the things you love to your cart.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Explore products
          </Link>
        </section>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <section className="rounded-2xl border border-indigo-100 bg-white px-5 sm:px-6">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={() => increaseQuantity(item.id)}
                onDecrease={() => decreaseQuantity(item.id)}
                onRemove={() => removeItem(item.id)}
              />
            ))}
          </section>
          <CartSummary subtotal={subtotal} itemCount={itemCount} />
        </div>
      )}
    </main>
  );
}
