// FILE: src/app/hoodies/page.tsx

import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/sections/Footer";
import { getProductsByCategory } from "@/lib/products";

export default async function HoodiesPage() {
  const products = await getProductsByCategory("Hoodies");
  return (
    <>
      <Header alwaysDark />
      {/* Spacer for fixed header height */}
      <div className="h-14 sm:h-16" />
      <ProductGrid title="Hoodies" products={products} />
      <Footer />
    </>
  );
}