import Link from "next/link";
import { redirect } from "next/navigation";
import { getProducts } from "@/services/product";
import type { Product, ProductFilterValues } from "@/types/product";
import ProductList from "@/components/products/ProductList";
import ProductSearch from "@/components/products/ProductSearch";
import ProductFilter from "@/components/products/ProductFilter";

// These filters apply to fetched products, not to undocumented API parameters.
function filterProducts(products: Product[], filters: ProductFilterValues) {
  const searchText = filters.search.trim().toLowerCase();
  const filteredProducts = products.filter(product => {
    const inStock = product.availability && product.stockQuantity > 0;
    const productText = product.name.toLowerCase();
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
  const page = Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const data = await getProducts(page - 1);
  if (page > Math.max(1, data.totalPages)) redirect(`/products?page=${Math.max(1, data.totalPages)}`);

  const priceLimit = Math.max(1, ...data.content.map(product => Math.ceil(product.priceOut)));
  const requestedPrice = getParam("maxPrice") === "" ? priceLimit : Number(getParam("maxPrice"));
  const filters: ProductFilterValues = {
    search: getParam("search"),
    category: getParam("category"),
    availability: getParam("availability"),
    maxPrice: Number.isFinite(requestedPrice) ? Math.max(0, Math.min(priceLimit, requestedPrice)) : priceLimit,
    sort: getParam("sort") || "default",
  };
  const view = getParam("view") === "list" ? "list" : "grid";
  const products = filterProducts(data.content, filters);
  const viewParams = new URLSearchParams({
    page: String(page), ...filters, maxPrice: String(filters.maxPrice),
  });
  const pages = Array.from({ length: data.totalPages }, (_, index) => index + 1)
    .filter(number => number === 1 || number === data.totalPages || Math.abs(number - page) <= 1);

  return (
    <main>
      <section className="products-hero">
        <div className="products-container">
          <p className="products-eyebrow">PRODUCTS</p>
          <h1>Discover Your<br />Next Favorite Product</h1>
          <p>High quality, great prices, and the latest collection for you.</p>
          <div className="products-hero-art" aria-hidden="true">
            <div className="products-laptop"><span /></div>
          </div>
        </div>
      </section>
      <section className="products-container products-catalog" aria-label="Product catalog">
        <ProductSearch key={viewParams.toString()} filters={filters} page={page} view={view} />
        <p className="products-scope-note">Filters update automatically and apply to this page.</p>
        <div className="products-catalog-layout">
          <ProductFilter key={viewParams.toString()} products={data.content} filters={filters} priceLimit={priceLimit} page={page} view={view} />
          <div className="products-catalog-main">
            <div className="products-results">
              <p role="status">{data.totalElements} products <span>/ {products.length} shown on this page</span></p>
              <div className="products-view-controls">
                <Link href={`/products?${viewParams}&view=grid`} aria-current={view === "grid" ? "true" : undefined}>Grid</Link>
                <Link href={`/products?${viewParams}&view=list`} aria-current={view === "list" ? "true" : undefined}>List</Link>
              </div>
            </div>
            <p className="products-cart-note">Cart coming soon. Explore product details in the meantime.</p>
            <ProductList products={products} view={view} />
            {data.totalPages > 1 && (
              <nav className="products-pagination" aria-label="Product pages">
                {page > 1 && <Link href={`/products?page=${page - 1}`} aria-label="Previous page">Previous</Link>}
                {pages.map((number, index) => (
                  <span className="product-page-link" key={number}>
                    {index > 0 && number - pages[index - 1] > 1 && <span aria-hidden="true">...</span>}
                    <Link href={`/products?page=${number}`} aria-label={`Page ${number}`} aria-current={number === page ? "page" : undefined}>{number}</Link>
                  </span>
                ))}
                {!data.last && <Link href={`/products?page=${page + 1}`} aria-label="Next page">Next</Link>}
              </nav>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
