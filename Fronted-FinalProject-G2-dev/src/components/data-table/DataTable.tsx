"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/services/product";
import { DataTable as BaseDataTable } from "./data-tables";
import { columns as defaultColumns, type ProductTableRow } from "./columns";

export default function DataTable() {
  const [data, setData] = useState<ProductTableRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        const firstPage = await getProducts(0);
        const pageNumbers = Array.from({ length: firstPage.totalPages }, (_, index) => index);
        const pages = await Promise.all(pageNumbers.map((page) => getProducts(page)));

        const rows: ProductTableRow[] = pages.flatMap((response) =>
          response.content.map((product) => {
            const imageValue = product.thumbnail ?? (Array.isArray(product.images) ? product.images[0] : null);
            const image = typeof imageValue === "string" ? imageValue : "";

            return {
              uuid: product.uuid,
              name: product.name,
              image,
              price: product.priceOut,
              category: product.category?.name ?? "Uncategorized",
              brand: product.brand?.name ?? "Unknown",
              stock: product.stockQuantity,
              availability: product.availability ? "In stock" : "Out of stock",
            };
          }),
        );

        if (active) setData(rows);
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : "Failed to load products.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadProducts();

    return () => {
      active = false;
    };
  }, []);

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  if (loading) {
    return <div className="p-6 text-center text-zinc-500">Loading products...</div>;
  }

  return <BaseDataTable columns={defaultColumns} data={data} />;
}

export type { ProductTableRow };
export { defaultColumns as columns };
