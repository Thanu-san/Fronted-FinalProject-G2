import { Package, Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <main className="products-loading-page" aria-busy="true">
      <section className="products-loading-banner">
        <div className="products-container products-loading-layout">
          <div>
            <p className="products-loading-eyebrow"><Sparkles size={16} aria-hidden="true" /> NEXTSHOP COLLECTION</p>
            <div role="status" aria-live="polite">
              <h1>Your next find<br /><span>is on its way.</span></h1>
              <p>Loading products. Just a moment while we get everything ready.</p>
            </div>
            <div className="products-loading-track" aria-hidden="true"><span /></div>
          </div>
          <div className="products-loading-preview" aria-hidden="true">
            <div className="products-loading-preview-top"><span /><span /></div>
            <div className="products-loading-preview-image"><Package size={58} strokeWidth={1} /></div>
            <div className="products-loading-line" />
            <div className="products-loading-line short" />
          </div>
        </div>
      </section>
      <div className="products-container products-loading-catalog" aria-hidden="true">
        <div className="products-loading-search products-loading-sheen" />
        <div className="products-loading-results">
          <div className="products-loading-sidebar">
            <div className="products-loading-line" />
            {[0, 1, 2, 3].map(item => <div className="products-loading-filter" key={item}><span /><div className="products-loading-line" /></div>)}
          </div>
          <div className="products-loading-cards">
            {[0, 1, 2, 3, 4, 5].map(item => <div className="products-loading-card" key={item}>
              <div className="products-loading-card-image products-loading-sheen" />
              <div className="products-loading-line" />
              <div className="products-loading-line short" />
              <div className="products-loading-card-button" />
            </div>)}
          </div>
        </div>
      </div>
    </main>
  );
}
