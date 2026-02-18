import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/sections/Footer";

export default function ShoesPage() {
  return (
    <>
      <Header />
      <ProductGrid title="Shoes" products={[]} />
      <Footer />
    </>
  );
}
