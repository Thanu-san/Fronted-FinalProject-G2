"use client";

import { useState } from "react";
import Link from "next/link";
import type { ComputerSpec, Product } from "@/types/product";

interface ProductDetailProps {
  product: Product;
}

const specifications: [keyof ComputerSpec, string][] = [
  ["processor", "Processor"],
  ["ram", "RAM"],
  ["storage", "Storage"],
  ["gpu", "GPU"],
  ["os", "Operating System"],
  ["screenSize", "Screen Size"],
  ["battery", "Battery"],
];

export default function ProductDetail({ product }: ProductDetailProps) {
  const images = [...new Set([product.thumbnail, ...(product.images ?? [])])]
    .filter((image): image is string => typeof image === "string" && /^https?:\/\//i.test(image));
  const [selectedImage, setSelectedImage] = useState(images[0] ?? null);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const inStock = product.availability && product.stockQuantity > 0;
  const price = product.priceOut.toLocaleString("en-US", { style: "currency", currency: "USD" });

  return (
    <main className="products-container product-detail">
      <nav className="product-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span>/</span>
        <Link href="/products">Products</Link><span>/</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className="product-detail-grid">
        <div className="product-gallery">
          <div className="product-main-image">
            {selectedImage && !failedImages.includes(selectedImage) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={selectedImage} alt={product.name} onError={() => setFailedImages(previous => [...previous, selectedImage])} />
            ) : (
              <span className="product-image-fallback" role="img" aria-label={`${product.name}: image unavailable`}>Image unavailable</span>
            )}
            {(product.discount ?? 0) > 0 && (
              <span className="product-discount">{product.discount}% OFF</span>
            )}
          </div>
          {images.length > 1 && (
            <div className="product-thumbnails" aria-label="Product images">
              {images.map((src, index) => (
                <button
                  type="button"
                  key={src}
                  aria-label={`View image ${index + 1}`}
                  aria-pressed={selectedImage === src}
                  onClick={() => setSelectedImage(src)}
                >
                  {failedImages.includes(src) ? (
                    <span className="product-image-fallback">Image unavailable</span>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={src} alt={`${product.name}, image ${index + 1}`} loading="lazy" onError={() => setFailedImages(previous => [...previous, src])} />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <section className="product-information" aria-label="Product information">
          <h1>{product.name}</h1>
          <p className="product-price">{price}</p>
          <p className={`product-stock ${inStock ? "" : "product-stock-out"}`}>
            {inStock ? `In Stock - ${product.stockQuantity} units available` : "Out of Stock"}
          </p>

          <div className="product-purchase">
            <div className="product-quantity" role="group" aria-label="Quantity">
              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={!inStock || quantity <= 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </button>
              <output aria-live="polite" aria-label="Selected quantity">{inStock ? quantity : 0}</output>
              <button
                type="button"
                aria-label="Increase quantity"
                disabled={!inStock || quantity >= product.stockQuantity}
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            {/* Connect the team's shared cart hook with product and quantity when available. */}
            <button className="product-button" type="button" disabled title={inStock ? "Cart coming soon" : "Out of stock"}>
              {inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
          <p className="products-cart-note">Cart coming soon.</p>

          <details className="product-description" open>
            <summary>Description</summary>
            <p>{product.description || "No description available."}</p>
          </details>
          <dl className="product-facts">
            <div><dt>Category</dt><dd>{product.category?.name || "Not specified"}</dd></div>
            <div><dt>Warranty</dt><dd>{product.warranty || "Not specified"}</dd></div>
          </dl>
        </section>
      </div>

      <section className="product-specifications" aria-labelledby="specifications-heading">
        <h2 id="specifications-heading">Specifications</h2>
        {product.computerSpec ? (
          <dl>
            {specifications.map(([key, label]) => (
              <div key={key}>
                <dt>{label}</dt>
                <dd>{product.computerSpec?.[key] || "Not specified"}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p>Specifications are not available for this product.</p>
        )}
      </section>
    </main>
  );
}
