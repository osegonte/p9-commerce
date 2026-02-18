import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/sections/Footer";

export default function AccessoriesPage() {
  return (
    <>
      <Header />
      <ProductGrid title="Accessories" products={[]} />
      <Footer />
    </>
  );
}
