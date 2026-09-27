"use client";
export default function ProductsError() {
  return <main className="product-state" role="alert">
    <h1>Oops! Something went wrong</h1>
    <p>We couldn&apos;t load the products. Please try again later.</p>
    <button className="product-button" type="button" onClick={() => window.location.reload()}>Try Again</button>
  </main>;
}
