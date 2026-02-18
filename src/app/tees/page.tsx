import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/sections/Footer";

export default function TeesPage() {
  return (
    <>
      <Header />
      <ProductGrid title="Tees" products={[]} />
      <Footer />
    </>
  );
}
