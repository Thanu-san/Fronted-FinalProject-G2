import Link from "next/link";

type CartSummaryProps = {
  subtotal: number;
  itemCount: number;
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

export default function CartSummary({
  subtotal,
  itemCount,
}: CartSummaryProps) {
  return (
    <aside className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-zinc-900">Order Summary</h2>
      <div className="mt-6 space-y-4 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-zinc-500">
            Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
          </span>
          <span className="font-semibold text-zinc-900">
            {formatPrice(subtotal)}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-zinc-500">Shipping</span>
          <span className="font-semibold text-emerald-600">Free</span>
        </div>
      </div>
      <div className="mt-6 flex justify-between border-t border-indigo-100 pt-5 text-lg font-bold text-zinc-900">
        <span>Total</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <Link
        href="/checkout"
        className="mt-6 block w-full rounded-lg bg-indigo-600 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
      >
        Proceed to Checkout
      </Link>
      <Link
        href="/products"
        className="mt-4 block text-center text-sm font-semibold text-indigo-600 hover:underline"
      >
        Continue shopping
      </Link>
    </aside>
  );
}
