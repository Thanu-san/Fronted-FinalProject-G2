import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import PromoBanner from "@/components/home/PromoBanner";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Benefits from "@/components/home/Benefits";
import { getProducts } from "@/services/product";
import type { Product } from "@/types/product";

export default async function HomePage() {
  let products: Product[] = [];
  try {
    const data = await getProducts(0);
    products = data.content || [];
  } catch (err) {
    console.error("HomePage: Failed to load products from API:", err);
  }

  return (
    <main>
      <Hero products={products} />
      <Categories products={products} />
      <PromoBanner products={products} />
      <FeaturedProducts products={products} />
      <Benefits/>
    </main>
  );
}
