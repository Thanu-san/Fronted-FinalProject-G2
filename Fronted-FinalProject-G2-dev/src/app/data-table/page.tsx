import React from "react";
import DataTable from "@/components/data-table/DataTable";

export default function DataTablePage() {
  return (
    <main className="products-feature">
      <section className="products-hero">
        <div className="products-container">
          <p className="products-eyebrow">INVENTORY</p>
          <h1>Product Data Table</h1>
          <p>Search, review, and manage the latest catalog from the same storefront system used across the shop.</p>
          <div className="products-hero-art" aria-hidden="true">
            <div className="products-laptop"><span /></div>
          </div>
        </div>
      </section>

      <section className="products-container products-catalog" aria-label="Product inventory table">
        <div className="products-toolbar">
          <p>Live product inventory</p>
        </div>

        <div className="products-catalog-main">
          <div className="products-results">
            <p role="status">Product catalog overview</p>
          </div>
          <DataTable />
        </div>
      </section>
    </main>
  );
}
