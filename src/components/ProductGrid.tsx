// FILE: src/components/ProductGrid.tsx

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import type { DBProduct } from "@/lib/products";

const SHOP_CATEGORIES = [
  { label: "Show all",    href: "/new-arrivals" },
  { label: "Hoodies",     href: "/hoodies"      },
  { label: "Tees",        href: "/tees"         },
  { label: "Headwear",    href: "/headwear"      },
  { label: "Accessories", href: "/accessories"  },
];

interface ProductGridProps {
  title: string;
  products: DBProduct[];
  /** Pass the current page slug to highlight the active tab */
  activeCategory?: string;
}

export default function ProductGrid({ title, products, activeCategory }: ProductGridProps) {
  return (
    <section className="bg-white min-h-[60vh]">

      {/* ── Category filter bar — matches reference top nav ── */}
      <div className="border-b border-neutral-200">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-20 flex items-center gap-0 overflow-x-auto">
          {SHOP_CATEGORIES.map((cat) => {
            const isActive = cat.label === title || cat.label === activeCategory;
            return (
              <Link
                key={cat.label}
                href={cat.href}
                className={`
                  relative shrink-0 px-4 py-4 text-[12px] tracking-[0.04em] transition-colors duration-200
                  ${isActive
                    ? "text-[#1a1a1a] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#1a1a1a]"
                    : "text-[#8a8580] hover:text-[#1a1a1a]"
                  }
                `}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Results count + sort bar — exactly like reference ── */}
      <div className="px-6 sm:px-10 lg:px-16 xl:px-20 py-4 flex items-center justify-between border-b border-neutral-100">
        <p className="text-[11px] tracking-[0.12em] uppercase text-[#8a8580]">
          {products.length} {products.length === 1 ? "product" : "products"}
        </p>
        {/* Sort placeholder — wire up later */}
        <p className="text-[11px] tracking-[0.12em] uppercase text-[#8a8580] hidden sm:block">
          Sort by: <span className="text-[#1a1a1a]">New arrivals</span>
        </p>
      </div>

      {/* ── Grid ── */}
      <div className="px-6 sm:px-10 lg:px-16 xl:px-20 py-8">
        {products.length === 0 ? (
          <div className="py-32 text-center">
            <p className="text-[#8a8580] text-[13px] tracking-[0.15em] uppercase">
              No products yet
            </p>
          </div>
        ) : (
          /*
           * 2 cols on mobile → 3 on tablet → 4 on desktop
           * gap-x tight (like reference), gap-y larger for breathing room
           */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-[1px] gap-y-10">
            {products.map((product) => (
              <div key={product.id} className="bg-white px-2 sm:px-3">
                <ProductCard
                  name={product.name}
                  price={`₦${Number(product.price).toLocaleString()}`}
                  image={product.images?.[0] ?? ""}
                  slug={product.slug}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}