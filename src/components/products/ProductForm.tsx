"use client";

import { useTransition, type ComponentProps } from "react";
import { useRouter } from "next/navigation";

// Shared by search and filters so both show the same navigation feedback.
export default function ProductForm(props: ComponentProps<"form">) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return <form {...props} action="/products" aria-busy={pending} onSubmit={event => {
    event.preventDefault();
    const params = new URLSearchParams();
    new FormData(event.currentTarget).forEach((value, key) => params.set(key, String(value)));
    params.set("page", "1");
    startTransition(() => router.replace(`/products?${params}`, { scroll: false }));
  }}>
    {props.children}
    {pending && <span className="product-updating" role="status">Updating products...</span>}
  </form>;
}
