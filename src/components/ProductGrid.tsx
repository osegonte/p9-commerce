import ProductCard from "@/components/ProductCard";

export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  slug: string;
}

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <section className="bg-white pb-16 sm:pb-20">
        <div className="mx-10 sm:mx-14 lg:mx-24 xl:mx-28 py-24 text-center">
          <p className="text-[#8a8580] text-[13px] tracking-[0.15em] uppercase">
            No products yet
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white pb-16 sm:pb-20">
      <div className="mx-10 sm:mx-14 lg:mx-24 xl:mx-28">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}