import type { ProductFilterValues } from "@/types/product";

interface ProductSearchProps {
  filters: ProductFilterValues;
  page: number;
  view: string;
}

export default function ProductSearch({ filters, page, view }: ProductSearchProps) {
  return (
    <form action="/products" className="products-toolbar" role="search">
      <input type="hidden" name="page" value={page} />
      <input type="hidden" name="view" value={view} />
      <input type="hidden" name="category" value={filters.category} />
      <input type="hidden" name="availability" value={filters.availability} />
      <input type="hidden" name="maxPrice" value={filters.maxPrice} />
      <input type="hidden" name="sort" value={filters.sort} />
      <label className="product-search">
        <span className="products-sr-only">Search products on this page</span>
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" />
        </svg>
        <input type="search" name="search" placeholder="Search products..." defaultValue={filters.search} />
      </label>
      <button className="product-button" type="submit">Search</button>
    </form>
  );
}
