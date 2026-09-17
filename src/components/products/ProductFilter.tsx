"use client";

import Link from "next/link";
import Form from "next/form";
import { useEffect, useRef, type SyntheticEvent } from "react";
import type { Category, Product, ProductFilterValues } from "@/types/product";

interface ProductFilterProps {
  products: Product[];
  filters: ProductFilterValues;
  priceLimit: number;
  page: number;
  view: string;
}

export default function ProductFilter({ products, filters, priceLimit, page, view }: ProductFilterProps) {
  const priceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (priceTimer.current) clearTimeout(priceTimer.current);
    };
  }, []);

  function updateFilters(event: SyntheticEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const input = event.target;
    if (priceTimer.current) clearTimeout(priceTimer.current);

    // Allow users to finish typing a price before updating the results.
    if (input instanceof HTMLInputElement && input.name === "maxPrice") {
      priceTimer.current = setTimeout(() => {
        if (form.checkValidity()) form.requestSubmit();
      }, 500);
    } else if (form.checkValidity()) {
      form.requestSubmit();
    }
  }

  const categories: Category[] = [];
  for (const product of products) {
    if (product.category && !categories.some(category => category.uuid === product.category?.uuid)) {
      categories.push(product.category);
    }
  }

  return (
    <details className="product-filters" open>
      <summary>Filters</summary>
      <Form action="/products" replace scroll={false} className="product-filter-fields" onChange={updateFilters}>
        <input type="hidden" name="page" value={page} />
        <input type="hidden" name="view" value={view} />
        <input type="hidden" name="search" value={filters.search} />
        <fieldset className="product-filter-options">
          <legend>Category</legend>
          <label><input type="radio" name="category" value="" defaultChecked={!filters.category} />All Categories</label>
          {categories.map(category => (
            <label key={category.uuid}>
              <input type="radio" name="category" value={category.uuid} defaultChecked={filters.category === category.uuid} />
              {category.name}
            </label>
          ))}
        </fieldset>
        <fieldset className="product-filter-options">
          <legend>Availability</legend>
          <label><input type="radio" name="availability" value="" defaultChecked={!filters.availability} />All availability</label>
          <label><input type="radio" name="availability" value="in" defaultChecked={filters.availability === "in"} />In Stock</label>
          <label><input type="radio" name="availability" value="out" defaultChecked={filters.availability === "out"} />Out of Stock</label>
        </fieldset>
        <label>
          Maximum price ($)
          <input type="number" name="maxPrice" min="0" max={priceLimit} step="0.01" defaultValue={filters.maxPrice} required />
        </label>
        <label>
          Sort by
          <select name="sort" defaultValue={filters.sort}>
            <option value="default">Default order</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </label>
        <Link className="product-reset" scroll={false} href={`/products?page=${page}&view=${view}`}>Clear filters</Link>
      </Form>
    </details>
  );
}
