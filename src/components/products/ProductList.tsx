import React from "react";
import ProductCard from "./ProductCard";

export default function ProductList() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-6">
      <ProductCard id="iphone-16-pro" name="iPhone 16 Pro" price={999} category="iPhone" />
      <ProductCard id="macbook-pro" name="MacBook Pro" price={1599} category="Mac" />
      <ProductCard id="ipad-pro" name="iPad Pro" price={799} category="iPad" />
    </section>
  );
}

