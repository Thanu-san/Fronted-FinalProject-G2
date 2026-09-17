import type { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
  view?: "grid" | "list";
}

export default function ProductList({ products, view = "grid" }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="product-state">
        <h2>No products found</h2>
        <p>Try another search or clear your filters.</p>
      </div>
    );
  }

  return (
    <div className={`product-grid ${view === "list" ? "product-list-view" : ""}`}>
      {products.map(product => <ProductCard key={product.uuid} product={product} />)}
    </div>
  );
}
