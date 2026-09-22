import type { CartItem as CartItemType } from "@/context/CartContext";

type CartItemProps = {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  return (
    <article className="flex gap-4 border-b border-indigo-100 py-5 last:border-b-0 sm:gap-6">
      <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-indigo-50 text-lg font-bold text-indigo-600">
        {item.image ? (
          // Product images come from several external hosts.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt=""
            className="size-full object-contain p-1"
          />
        ) : (
          item.name.slice(0, 1).toUpperCase()
        )}
      </div>

      <div className="min-w-0 flex-1">
        {item.category && (
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-violet-500">
            {item.category}
          </p>
        )}
        <h2 className="truncate font-semibold text-zinc-900">{item.name}</h2>
        <p className="mt-1 text-sm font-medium text-zinc-500">
          {formatPrice(item.price)} each
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center rounded-lg border border-indigo-200 bg-white">
            <button
              type="button"
              onClick={onDecrease}
              aria-label={`Decrease ${item.name} quantity`}
              className="size-9 rounded-l-lg text-lg text-indigo-600 transition-colors hover:bg-indigo-50"
            >
              −
            </button>
            <span
              className="w-9 text-center text-sm font-semibold"
              aria-live="polite"
            >
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={onIncrease}
              aria-label={`Increase ${item.name} quantity`}
              className="size-9 rounded-r-lg text-lg text-indigo-600 transition-colors hover:bg-indigo-50"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={onRemove}
            className="text-sm font-medium text-rose-600 transition-colors hover:text-rose-700 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>

      <p className="shrink-0 pt-5 text-sm font-bold text-zinc-900 sm:text-base">
        {formatPrice(item.price * item.quantity)}
      </p>
    </article>
  );
}
