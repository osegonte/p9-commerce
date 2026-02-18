"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";

export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const sizes = ["S", "M", "L", "XL", "XXL"];

  return (
    <>
      <Header />
      <section className="bg-white pt-24 pb-16 sm:pb-20">
        <div className="mx-10 sm:mx-14 lg:mx-24 xl:mx-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

            {/* Images */}
            <div className="grid grid-cols-2 gap-2">
              <div className="relative aspect-[3/4] bg-neutral-100 col-span-2">
                <Image
                  src="/placeholder-product.jpg"
                  alt="Product"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] bg-neutral-100">
                <Image
                  src="/placeholder-product.jpg"
                  alt="Product"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] bg-neutral-100">
                <Image
                  src="/placeholder-product.jpg"
                  alt="Product"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Details */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <p className="text-[#8a8580] text-[11px] tracking-[0.25em] uppercase mb-3">
                Hoodies
              </p>
              <h1 className="text-[#1a1a1a] text-2xl sm:text-3xl font-semibold mb-2">
                Product Name
              </h1>
              <p className="text-[#1a1a1a] text-lg mb-8">€129.00</p>

              <p className="text-[#8a8580] text-[11px] tracking-[0.2em] uppercase mb-3">
                Size
              </p>
              <div className="flex gap-2 mb-8">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border text-[13px] transition-colors duration-200 ${
                      selectedSize === size
                        ? "border-[#1a1a1a] text-[#1a1a1a]"
                        : "border-neutral-200 text-[#6b6560] hover:border-neutral-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <button className="w-full bg-[#1a1a1a] text-white py-4 text-[13px] tracking-[0.15em] uppercase hover:bg-[#333] transition-colors duration-300 mb-4">
                Add to Cart
              </button>

              <div className="mt-10 border-t border-neutral-100 pt-8">
                <p className="text-[#1a1a1a] text-[14px] font-semibold mb-3">Details</p>
                <p className="text-[#6b6560] text-[14px] leading-[1.8] font-light">
                  Premium quality streetwear crafted with attention to detail. Built to last, designed to stand out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
