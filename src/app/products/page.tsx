import Link from "next/link";

import { getAllProducts } from "@/services/product";
import type { Product, ProductFilterValues } from "@/types/product";
import ProductList from "@/components/products/ProductList";
import ProductSearch from "@/components/products/ProductSearch";
import ProductFilter from "@/components/products/ProductFilter";
import { LayoutGrid, List } from "lucide-react";
import ProductHero from "@/components/products/ProductHero";

// Filter the complete catalog before pagination.
function filterProducts(products: Product[], filters: ProductFilterValues) {
  const searchText = filters.search.trim().toLowerCase();
  const filteredProducts = products.filter(product => {
    const inStock = product.availability && product.stockQuantity > 0;
    const productText = `${product.name} ${product.category?.name ?? ""}`.toLowerCase();
    if (!productText.includes(searchText)) return false;
    if (filters.category && product.category?.uuid !== filters.category) return false;
    if (filters.availability === "in" && !inStock) return false;
    if (filters.availability === "out" && inStock) return false;
    return product.priceOut <= filters.maxPrice;
  });

  if (filters.sort === "low") filteredProducts.sort((a, b) => a.priceOut - b.priceOut);
  if (filters.sort === "high") filteredProducts.sort((a, b) => b.priceOut - a.priceOut);
  return filteredProducts;
}

interface ProductsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const query = await searchParams;
  function getParam(name: string) {
    return typeof query[name] === "string" ? query[name] : "";
  }

  const requestedPage = Number(getParam("page"));
  const validPage = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const catalog = await getAllProducts();

  const priceLimit = Math.max(1, ...catalog.map(product => Math.ceil(product.priceOut)));
  const requestedPrice = getParam("maxPrice") === "" ? priceLimit : Number(getParam("maxPrice"));
  const filters: ProductFilterValues = {
    search: getParam("search"),
    category: getParam("category"),
    availability: getParam("availability"),
    maxPrice: Number.isFinite(requestedPrice) ? Math.max(0, Math.min(priceLimit, requestedPrice)) : priceLimit,
    sort: getParam("sort") || "default",
  };
  const view = getParam("view") === "list" ? "list" : "grid";
  const matches = filterProducts(catalog, filters);
  const totalPages = Math.max(1, Math.ceil(matches.length / 12));
  const page = Math.min(validPage, totalPages);
  const products = matches.slice((page - 1) * 12, page * 12);
  const viewParams = new URLSearchParams({
    page: String(page), ...filters, maxPrice: String(filters.maxPrice),
  });
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)
    .filter(number => number === 1 || number === totalPages || Math.abs(number - page) <= 1);
  const categories = [...new Map(catalog.filter(item => item.category).map(item => [item.category!.uuid, item.category!])).values()].slice(0, 4);
  function pageHref(number: number) {
    const params = new URLSearchParams(viewParams);
    params.set("page", String(number));
    params.set("view", view);
    return `/products?${params}`;
  }

  const activeFilters = [
    { key: "search", label: filters.search ? `Search: ${filters.search}` : "" },
    { key: "category", label: filters.category ? catalog.find(item => item.category?.uuid === filters.category)?.category?.name || "Selected category" : "" },
    { key: "availability", label: filters.availability === "in" ? "In stock" : filters.availability === "out" ? "Out of stock" : "" },
    { key: "maxPrice", label: filters.maxPrice < priceLimit ? `Under $${filters.maxPrice}` : "" },
  ].filter(filter => filter.label);
  return (
    <main className="products-catalog-page">
      <ProductHero products={catalog.filter(product => product.thumbnail && product.availability && product.stockQuantity > 0).filter((product, index, items) => items.findIndex(item => item.thumbnail === product.thumbnail) === index).slice(0, 3)} total={catalog.length} />
      <section id="product-catalog" className="products-container products-catalog" aria-label="Product catalog">
        <div className="products-discovery-bar">
          <ProductSearch key={viewParams.toString()} filters={filters} page={page} view={view} />
          {categories.length > 0 && <div className="products-category-shortcuts" aria-label="Browse categories"><span>Explore:</span>{categories.map(category => {
            const params = new URLSearchParams(viewParams);
            params.set("category", category.uuid);
            params.set("page", "1");
            params.set("view", view);
            return <Link key={category.uuid} scroll={false} href={`/products?${params}`} aria-current={filters.category === category.uuid ? "true" : undefined}>{category.name}</Link>;
          })}</div>}
        </div>
        <p className="products-scope-note">Search the full collection. Filters update automatically.</p>
        {activeFilters.length > 0 && <nav className="product-active-filters" aria-label="Active filters">
          {activeFilters.map(filter => {
            const params = new URLSearchParams(viewParams);
            params.delete(filter.key);
            params.set("page", "1");
            params.set("view", view);
            return <Link key={filter.key} scroll={false} href={`/products?${params}`} aria-label={`Remove ${filter.label}`}>{filter.label} <span aria-hidden="true">&times;</span></Link>;
          })}
          <Link scroll={false} href={`/products?view=${view}`}>Clear all</Link>
        </nav>}
        <div className="products-catalog-layout">
          <ProductFilter key={viewParams.toString()} products={catalog} filters={filters} priceLimit={priceLimit} page={page} view={view} />
          <div className="products-catalog-main">
            <div className="products-results">
              <p role="status">{matches.length} products found <span>/ {catalog.length} total</span></p>
              <div className="products-view-controls">
                <Link scroll={false} href={`/products?${viewParams}&view=grid`} aria-label="Grid view" aria-current={view === "grid" ? "true" : undefined}><LayoutGrid size={19} /></Link>
                <Link scroll={false} href={`/products?${viewParams}&view=list`} aria-label="List view" aria-current={view === "list" ? "true" : undefined}><List size={19} /></Link>
              </div>
            </div>
            <p className="products-cart-note">Add available products directly to your cart.</p>
            <ProductList products={products} view={view} />
            {totalPages > 1 && (
              <nav className="products-pagination" aria-label="Product pages">
                {page > 1 && <Link href={pageHref(page - 1)} aria-label="Previous page">Previous</Link>}
                {pages.map((number, index) => (
                  <span className="product-page-link" key={number}>
                    {index > 0 && number - pages[index - 1] > 1 && <span aria-hidden="true">...</span>}
                    <Link href={pageHref(number)} aria-label={`Page ${number}`} aria-current={number === page ? "page" : undefined}>{number}</Link>
                  </span>
                ))}
                {page < totalPages && <Link href={pageHref(page + 1)} aria-label="Next page">Next</Link>}
              </nav>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
