import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/sections/Footer";

export default function HoodiesPage() {
  return (
    <>
      <Header />
      <ProductGrid title="Hoodies" products={[]} />
      <Footer />
    </>
  );
}
