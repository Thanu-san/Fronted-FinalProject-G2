export default function Loading() {
  return <main className="product-state product-loading" role="status" aria-live="polite">
    <div className="products-loading-art" aria-hidden="true">
      <div className="products-laptop"><span /></div>
    </div>
    <h1>Loading Products...</h1>
    <p>Please wait while we fetch the best products for you.</p>
    <span className="product-spinner" aria-hidden="true" />
  </main>;
}
