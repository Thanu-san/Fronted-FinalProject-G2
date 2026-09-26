import { notFound } from "next/navigation";
import { getProductByUuid, getProducts } from "@/services/product";
import ProductDetail from "@/components/products/ProductDetail";

export default async function ProductDetailPage({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params;
  const product = await getProductByUuid(uuid);
  if (!product) notFound();
  // Related products are optional: a list failure must not hide the product.
  const catalog = await getProducts().catch(() => null);
  const relatedProducts = (catalog?.content ?? [])
    .filter(item => item.uuid !== product.uuid && product.category?.uuid && item.category?.uuid === product.category.uuid)
    .slice(0, 6);
  return <ProductDetail key={product.uuid} product={product} relatedProducts={relatedProducts} />;
}
