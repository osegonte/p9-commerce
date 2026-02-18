import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/sections/Footer";

export default function HeadwearPage() {
  return (
    <>
      <Header />
      <ProductGrid title="Headwear" products={[]} />
      <Footer />
    </>
  );
}
