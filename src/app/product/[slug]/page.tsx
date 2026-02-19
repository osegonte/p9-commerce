// FILE: src/app/product/[slug]/page.tsx

import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";
import ProductGallery from "@/components/ProductGallery";
import AddToCartButton from "@/components/AddToCartButton";
import { getProductBySlug } from "@/lib/products";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <>
      <Header alwaysDark />

      <section className="bg-white pt-14 sm:pt-16 pb-16 sm:pb-24">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-20 pt-8 sm:pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">

            {/* ── Left: Image gallery ── */}
            <ProductGallery
              images={product.images ?? []}
              name={product.name}
            />

            {/* ── Right: Product info ── */}
            <div className="lg:sticky lg:top-24">

              {/* Category breadcrumb */}
              <p className="text-[#8a8580] text-[11px] tracking-[0.25em] uppercase mb-3">
                {product.category}
              </p>

              {/* Name */}
              <h1 className="text-[#1a1a1a] text-[26px] sm:text-[30px] font-light leading-[1.2] mb-3">
                {product.name}
              </h1>

              {/* Price */}
              <p className="text-[#1a1a1a] text-[18px] mb-8 font-light">
                ₦{Number(product.price).toLocaleString()}
              </p>

              {/* Out of stock badge */}
              {!product.in_stock && (
                <p className="inline-block text-[11px] tracking-[0.15em] uppercase text-red-400 border border-red-200 px-3 py-1 mb-6">
                  Out of stock
                </p>
              )}

              {/* Size selector + Add to Cart (client component) */}
              <AddToCartButton product={product} />

              {/* Divider */}
              <div className="h-px bg-neutral-100 my-8" />

              {/* Description */}
              {product.description && (
                <div className="mb-6">
                  <p className="text-[11px] tracking-[0.2em] uppercase text-[#8a8580] mb-3">Details</p>
                  <p className="text-[#6b6560] text-[14px] leading-[1.9] font-light">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Sizes available (read-only summary) */}
              {product.sizes?.length > 0 && (
                <p className="text-[11px] text-[#aaa] tracking-[0.1em]">
                  Available: {product.sizes.join(", ")}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}