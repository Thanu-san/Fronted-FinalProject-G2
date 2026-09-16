import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromoBanner from "@/components/home/PromoBanner";
import Newsletter from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <PromoBanner />
      <Newsletter />
    </main>
  );
}