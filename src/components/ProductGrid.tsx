import ProductCard from "@/components/ProductCard";

interface Product {
  name: string;
  price: string;
  image: string;
  slug: string;
}

interface ProductGridProps {
  title: string;
  products: Product[];
}

const placeholderProducts: Product[] = [
  { name: "Product One", price: "€89.00", image: "/placeholder-product.jpg", slug: "product-one" },
  { name: "Product Two", price: "€109.00", image: "/placeholder-product.jpg", slug: "product-two" },
  { name: "Product Three", price: "€69.00", image: "/placeholder-product.jpg", slug: "product-three" },
  { name: "Product Four", price: "€129.00", image: "/placeholder-product.jpg", slug: "product-four" },
  { name: "Product Five", price: "€95.00", image: "/placeholder-product.jpg", slug: "product-five" },
  { name: "Product Six", price: "€79.00", image: "/placeholder-product.jpg", slug: "product-six" },
];

export default function ProductGrid({ title, products }: ProductGridProps) {
  const items = products.length > 0 ? products : placeholderProducts;

  return (
    <>
      <section className="bg-white pt-24 pb-16 sm:pb-20">
        <div className="mx-10 sm:mx-14 lg:mx-24 xl:mx-28">
          <h1
            className="text-[#1a1a1a] font-semibold text-center mb-12 sm:mb-16"
            style={{ fontSize: "22px" }}
          >
            {title}
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
            {items.map((product) => (
              <ProductCard key={product.slug} {...product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
