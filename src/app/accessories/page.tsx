// FILE: src/app/accessories/page.tsx

import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/sections/Footer";
import { getProductsByCategory } from "@/lib/products";

export default async function AccessoriesPage() {
  const products = await getProductsByCategory("Accessories");
  return (
    <>
      <Header alwaysDark />
      <div className="h-14 sm:h-16" />
      <ProductGrid title="Accessories" products={products} />
      <Footer />
    </>
  );
}