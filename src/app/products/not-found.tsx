import Link from "next/link";
export default function ProductNotFound() {
  return <main className="product-state"><h1>Product not found</h1><p>This product may no longer be available.</p><Link className="product-button" href="/products">Browse Products</Link></main>;
}
