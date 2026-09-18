"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import type { ComputerSpec, Product } from "@/types/product";

interface ProductDetailProps {
  product: Product;
  relatedProducts?: Product[];
}

const specifications: [keyof ComputerSpec, string][] = [
  ["processor", "Processor"], ["ram", "RAM"], ["storage", "Storage"],
  ["gpu", "Graphics"], ["os", "Operating System"],
  ["screenSize", "Screen Size"], ["battery", "Battery"],
];
const tabs = ["Specifications", "Description", "Warranty"] as const;

// Some API records contain the literal placeholder "string".
function displayText(value: string | null | undefined) {
  const text = value?.trim();
  return text && text.toLowerCase() !== "string" ? text : null;
}

export default function ProductDetail({ product, relatedProducts = [] }: ProductDetailProps) {
  const colors = (product.color ?? []).filter(item => displayText(item.color));
  const [selectedColor, setSelectedColor] = useState(0);
  const images = [...new Set([
    product.thumbnail, ...(product.images ?? []), ...(colors[selectedColor]?.images ?? []),
  ])].filter((image): image is string => typeof image === "string" && /^https?:\/\//i.test(image));
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const availableImages = images.filter(image => !failedImages.includes(image));
  const activeImage = selectedImage && availableImages.includes(selectedImage) ? selectedImage : availableImages[0];
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Specifications");
  const inStock = product.availability && product.stockQuantity > 0;
  const brand = displayText(product.brand?.name);
  const category = displayText(product.category?.name);
  const warranty = displayText(product.warranty);
  const description = displayText(product.description);
  const price = product.priceOut.toLocaleString("en-US", { style: "currency", currency: "USD" });

  return (
    <main className="products-container product-detail">
      <nav className="product-breadcrumb" aria-label="Breadcrumb">
        <Link href="/products">Products</Link><span aria-hidden="true">›</span>
        {category && <><span>{category}</span><span aria-hidden="true">›</span></>}
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className="product-detail-grid">
        <div className="product-gallery">
          <div className="product-main-image">
            {activeImage ? (
              // External API image hosts vary; failed images are removed from the gallery.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={activeImage} alt={product.name} onError={() => setFailedImages(previous => [...previous, activeImage])} />
            ) : (
              <span className="product-image-fallback" role="img" aria-label="Product image unavailable">Image unavailable</span>
            )}
            {(product.discount ?? 0) > 0 && <span className="product-discount">{product.discount}% OFF</span>}
            {availableImages.length > 1 && (
              <div className="product-gallery-arrows">
                {[-1, 1].map(direction => (
                  <button key={direction} type="button" aria-label={direction < 0 ? "Previous image" : "Next image"}
                    onClick={() => setSelectedImage(availableImages[(availableImages.indexOf(activeImage) + direction + availableImages.length) % availableImages.length])}>
                    {direction < 0 ? "‹" : "›"}
                  </button>
                ))}
              </div>
            )}
          </div>
          {availableImages.length > 0 && (
            <div className="product-thumbnails" aria-label="Product images">
              {availableImages.map((src, index) => (
                <button type="button" key={src} aria-label={`View image ${index + 1}`}
                  aria-pressed={activeImage === src} onClick={() => setSelectedImage(src)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" loading="lazy" onError={() => setFailedImages(previous => [...previous, src])} />
                </button>
              ))}
            </div>
          )}
        </div>

        <section className="product-information" aria-label="Product information">
          {brand && <p className="product-detail-brand">{brand}</p>}
          <h1>{product.name}</h1>
          <p className="product-detail-description">{description || "No description available."}</p>
          <p className="product-price">{price}</p>
          <div className="product-detail-status">
            <p className={`product-stock ${inStock ? "" : "product-stock-out"}`}>
              {inStock ? `In Stock (${product.stockQuantity} available)` : "Out of Stock"}
            </p>
            {warranty && <p className="product-warranty-badge">{warranty}</p>}
          </div>

          <div className="product-detail-options">
            {colors.length > 0 && (
              <fieldset className="product-colors">
                <legend>Color</legend>
                <div>
                  {colors.map((item, index) => (
                    <button type="button" key={`${item.color}-${index}`} aria-pressed={selectedColor === index}
                      onClick={() => { setSelectedColor(index); setSelectedImage(null); }}>
                      {item.color}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}
            <div>
              <p className="product-option-label" id="quantity-label">Quantity</p>
              <div className="product-quantity" role="group" aria-labelledby="quantity-label">
                <button type="button" aria-label="Decrease quantity" disabled={!inStock || quantity <= 1}
                  onClick={() => setQuantity(previous => Math.max(1, previous - 1))}>-</button>
                <output aria-live="polite" aria-label="Selected quantity">{inStock ? quantity : 0}</output>
                <button type="button" aria-label="Increase quantity" disabled={!inStock || quantity >= product.stockQuantity}
                  onClick={() => setQuantity(previous => Math.min(product.stockQuantity, previous + 1))}>+</button>
              </div>
            </div>
          </div>
          <div className="product-purchase">
            {/* Connect the team's shared cart function here when it is available. */}
            <button className="product-button" type="button" disabled aria-describedby="product-cart-status">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M3 3h2l3 13h11l2-10H6M9 20h.01M18 20h.01" strokeLinecap="round" />
              </svg>
              {inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
          <p className="products-cart-note" id="product-cart-status">Cart coming soon.</p>
        </section>
      </div>

      <section className="product-detail-information" aria-label="Product details">
        <div className="product-detail-tabs" role="tablist" aria-label="Product details">
          {tabs.map((tab, index) => (
            <button key={tab} type="button" role="tab" id={`tab-${tab}`} aria-controls="product-detail-panel"
              aria-selected={activeTab === tab} tabIndex={activeTab === tab ? 0 : -1}
              onClick={() => setActiveTab(tab)}
              onKeyDown={event => {
                let next = index;
                if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
                else if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = tabs.length - 1;
                else return;
                event.preventDefault();
                setActiveTab(tabs[next]);
                document.getElementById(`tab-${tabs[next]}`)?.focus();
              }}>{tab}</button>
          ))}
        </div>
        <div className="product-detail-panels">
          <div className="product-detail-panel" id="product-detail-panel" role="tabpanel" aria-labelledby={`tab-${activeTab}`} tabIndex={0}>
            <h2>{activeTab === "Specifications" ? "Technical Specifications" : activeTab}</h2>
            {activeTab === "Specifications" && (
              product.computerSpec ? (
                <dl className="product-detail-table">
                  {specifications.map(([key, label]) => (
                    <div key={key}><dt>{label}</dt><dd>{displayText(product.computerSpec?.[key]) || "Not specified"}</dd></div>
                  ))}
                </dl>
              ) : <p>Specifications are not available for this product.</p>
            )}
            {activeTab === "Description" && <p>{description || "No description available."}</p>}
            {activeTab === "Warranty" && <p>{warranty || "Warranty information is not available."}</p>}
          </div>
          <aside className="product-detail-panel" aria-labelledby="product-facts-heading">
            <h2 id="product-facts-heading">Product Information</h2>
            <dl className="product-detail-table">
              {brand && <div><dt>Brand</dt><dd>{brand}</dd></div>}
              <div><dt>Category</dt><dd>{category || "Not specified"}</dd></div>
              <div><dt>Warranty</dt><dd>{warranty || "Not specified"}</dd></div>
              <div><dt>Availability</dt><dd>{inStock ? "In Stock" : "Out of Stock"}</dd></div>
            </dl>
          </aside>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="product-related" aria-labelledby="related-products-heading">
          <div className="product-related-heading">
            <h2 id="related-products-heading">Related Products</h2>
            <Link href="/products">View all products &rarr;</Link>
          </div>
          <div className="product-grid">
            {relatedProducts.map(item => <ProductCard key={item.uuid} product={item} />)}
          </div>
        </section>
      )}
    </main>
  );
}
