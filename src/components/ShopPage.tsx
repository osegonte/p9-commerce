import Link from "next/link";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/sections/Footer";

export type ShopCategory =
  | "new-arrivals"
  | "hoodies"
  | "tees"
  | "headwear"
  | "accessories";

export const SHOP_CATEGORIES: { slug: ShopCategory; label: string }[] = [
  { slug: "new-arrivals", label: "New Arrivals" },
  { slug: "hoodies", label: "Hoodies" },
  { slug: "tees", label: "Tees" },
  { slug: "headwear", label: "Headwear" },
  { slug: "accessories", label: "Accessories" },
];

interface ShopPageProps {
  category: ShopCategory;
  // products will come from Supabase — passed in from each page.tsx
  products?: import("@/lib/products").DBProduct[];
}

export default function ShopPage({ category, products = [] }: ShopPageProps) {
  const current = SHOP_CATEGORIES.find((c) => c.slug === category)!;

  return (
    <>
      <Header />

      <section className="bg-white pt-20 sm:pt-24">
        {/* ── Category Nav ── */}
        <div className="border-b border-neutral-100">
          <div className="mx-10 sm:mx-14 lg:mx-24 xl:mx-28 flex items-center gap-8 overflow-x-auto py-4">
            {SHOP_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className={`whitespace-nowrap text-[11px] tracking-[0.18em] uppercase pb-1 transition-colors duration-200 ${
                  cat.slug === category
                    ? "text-[#1a1a1a] border-b border-[#1a1a1a]"
                    : "text-[#8a8580] hover:text-[#1a1a1a]"
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ── Title ── */}
        <div className="mx-10 sm:mx-14 lg:mx-24 xl:mx-28 pt-10 pb-8">
          <h1 className="text-[#1a1a1a] font-semibold text-[22px]">
            {current.label}
          </h1>
        </div>
      </section>

      {/* ── Grid — swap products={[]} for Supabase data when ready ── */}
      <ProductGrid products={products} title={category} />

      <Footer />
    </>
  );
}