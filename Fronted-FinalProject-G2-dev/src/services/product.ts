import type { Product, ProductResponse } from "@/types/product";

async function request(path: string): Promise<Response> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  return fetch(`${baseUrl.replace(/\/$/, "")}${path}`, {
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
}

export async function getProducts(page = 0): Promise<ProductResponse> {
  const response = await request(`/products?page=${Math.max(0, Math.floor(page))}&size=12`);
  if (!response.ok) throw new Error(`Failed to fetch products (${response.status}).`);
  const data: ProductResponse = await response.json();
  if (!Array.isArray(data.content) || !Number.isInteger(data.totalPages)) {
    throw new Error("The product API returned an invalid list response.");
  }
  return data;
}

export async function getProductByUuid(uuid: string): Promise<Product | null> {
  if (!/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(uuid)) return null;
  const response = await request(`/products/${encodeURIComponent(uuid)}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Failed to fetch product (${response.status}).`);
  const data: Product = await response.json();
  if (data.uuid !== uuid || typeof data.name !== "string") {
    throw new Error("The product API returned an invalid product response.");
  }
  return data;
}
