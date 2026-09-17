import { notFound } from "next/navigation";
import { getProductByUuid } from "@/services/product";
import ProductDetail from "@/components/products/ProductDetail";

export default async function ProductDetailPage({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params;
  const product = await getProductByUuid(uuid);
  if (!product) notFound();
  return <ProductDetail key={product.uuid} product={product} />;
}
