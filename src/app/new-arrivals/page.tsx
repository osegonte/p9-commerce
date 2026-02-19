// FILE: src/app/new-arrivals/page.tsx

import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/sections/Footer";
import { getAllProducts } from "@/lib/products";

export default async function NewArrivalsPage() {
  const products = await getAllProducts();
  return (
    <>
      <Header alwaysDark />
      <div className="h-14 sm:h-16" />
      <ProductGrid title="Show all" products={products} />
      <Footer />
    </>
  );
}