"use client";

import ProductForm from "./ProductForm";
import { useState } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import type { ProductFilterValues } from "@/types/product";

interface ProductSearchProps {
  filters: ProductFilterValues;
  page: number;
  view: string;
}

export default function ProductSearch({ filters, view }: ProductSearchProps) {
  const [search, setSearch] = useState(filters.search);
  return (
    <ProductForm className="products-toolbar" role="search">
      <input type="hidden" name="page" value={1} />
      <input type="hidden" name="view" value={view} />
      <input type="hidden" name="category" value={filters.category} />
      <input type="hidden" name="availability" value={filters.availability} />
      <input type="hidden" name="maxPrice" value={filters.maxPrice} />
      <input type="hidden" name="sort" value={filters.sort} />
      <label className="product-search">
        <span className="products-sr-only">Search all products or categories</span>
        <Search size={20} aria-hidden="true" />
        <input type="search" name="search" placeholder="Search products or categories..." value={search} onChange={event => setSearch(event.target.value)} />
      </label>
      {search && <button className="products-search-clear" type="submit" aria-label="Clear search" onClick={event => {
        const input = event.currentTarget.form?.elements.namedItem("search") as HTMLInputElement | null;
        if (input) input.value = "";
        setSearch("");
      }}><X size={18} /></button>}
      <button className="product-button" type="submit">Search <ArrowRight size={18} aria-hidden="true" /></button>
    </ProductForm>
  );
}
