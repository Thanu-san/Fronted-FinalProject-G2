"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const imageUrl = product.thumbnail && /^https?:\/\//i.test(product.thumbnail) ? product.thumbnail : null;
  const inStock = product.availability && product.stockQuantity > 0;
  const price = product.priceOut.toLocaleString("en-US", { style: "currency", currency: "USD" });

  return (
    <article className="product-card">
      <Link
        href={`/products/${product.uuid}`}
        className="product-card-image"
        aria-label={`View ${product.name}`}
      >
        {imageUrl && !imageFailed ? (
          // API images come from several external hosts and may fail to load.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={product.name} loading="lazy" onError={() => setImageFailed(true)} />
        ) : (
          <span className="product-image-fallback" role="img" aria-label={`${product.name}: image unavailable`}>Image unavailable</span>
        )}
        {(product.discount ?? 0) > 0 && (
          <span className="product-discount">{product.discount}% OFF</span>
        )}
      </Link>
      <div className="product-card-body">
        <h2><Link href={`/products/${product.uuid}`}>{product.name}</Link></h2>
        <p className="product-price">{price}</p>
        <p className={`product-stock ${inStock ? "" : "product-stock-out"}`}>
          {inStock ? `In Stock (${product.stockQuantity})` : "Out of Stock"}
        </p>
        {/* The Cart teammate can connect the shared cart hook here when it is ready. */}
        <button className="product-button" type="button" disabled title={inStock ? "Cart coming soon" : "Out of stock"}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
            <path d="M3 3h2l3 13h11l2-10H6M9 20h.01M18 20h.01" strokeLinecap="round" />
          </svg>
          {inStock ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </article>
  );
}

