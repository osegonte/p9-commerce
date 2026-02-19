// FILE: src/app/headwear/page.tsx

import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/sections/Footer";
import { getProductsByCategory } from "@/lib/products";

export default async function HeadwearPage() {
  const products = await getProductsByCategory("Headwear");
  return (
    <>
      <Header alwaysDark />
      <div className="h-14 sm:h-16" />
      <ProductGrid title="Headwear" products={products} />
      <Footer />
    </>
  );
}