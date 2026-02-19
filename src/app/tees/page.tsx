// FILE: src/app/tees/page.tsx

import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/sections/Footer";
import { getProductsByCategory } from "@/lib/products";

export default async function TeesPage() {
  const products = await getProductsByCategory("Tees");
  return (
    <>
      <Header alwaysDark />
      <div className="h-14 sm:h-16" />
      <ProductGrid title="Tees" products={products} />
      <Footer />
    </>
  );
}