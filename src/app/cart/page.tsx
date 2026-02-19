// FILE: src/app/cart/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";
import { useCartStore } from "@/lib/cartStore";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();

  return (
    <>
      <Header alwaysDark />

      <section className="bg-white pt-14 sm:pt-16 pb-16 sm:pb-24 min-h-[70vh]">
        <div className="px-6 sm:px-10 lg:px-16 xl:px-20 pt-10">

          <h1 className="text-[#1a1a1a] text-[22px] font-light tracking-wide mb-10">
            Your Bag
            {items.length > 0 && (
              <span className="text-[#aaa] text-[16px] ml-3">({items.length} {items.length === 1 ? "item" : "items"})</span>
            )}
          </h1>

          {items.length === 0 ? (
            /* ── Empty state ── */
            <div className="py-24 text-center">
              <p className="text-[#8a8580] text-[15px] mb-8">Your bag is empty.</p>
              <Link
                href="/new-arrivals"
                className="inline-block bg-[#1a1a1a] text-white px-10 py-4 text-[13px] tracking-[0.15em] uppercase hover:bg-[#333] transition-colors duration-300"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">

              {/* ── Cart items ── */}
              <div className="lg:col-span-2 space-y-0 divide-y divide-neutral-100">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-5 py-6">

                    {/* Thumbnail */}
                    <Link href={`/product/${item.slug}`} className="shrink-0">
                      <div className="relative w-20 h-28 sm:w-24 sm:h-32 bg-[#f2f2f0] overflow-hidden">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-neutral-200" />
                        )}
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-3 mb-1">
                        <Link href={`/product/${item.slug}`}>
                          <p className="text-[#1a1a1a] text-[14px] font-light hover:underline underline-offset-2 leading-snug">
                            {item.name}
                          </p>
                        </Link>
                        <p className="text-[#1a1a1a] text-[14px] shrink-0">
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>

                      {item.size && (
                        <p className="text-[12px] text-[#8a8580] tracking-[0.08em] uppercase mb-3">
                          Size: {item.size}
                        </p>
                      )}

                      {/* Quantity + remove */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-neutral-200">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-[#6b6560] hover:text-[#1a1a1a] transition-colors text-base"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-[13px] text-[#1a1a1a] select-none">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-[#6b6560] hover:text-[#1a1a1a] transition-colors text-base"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id, item.size)}
                          className="text-[11px] text-[#aaa] hover:text-red-400 tracking-[0.1em] uppercase transition-colors duration-200"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Order summary ── */}
              <div className="lg:sticky lg:top-24 bg-[#f8f8f8] p-7">
                <p className="text-[13px] tracking-[0.15em] uppercase text-[#1a1a1a] mb-6">
                  Order Summary
                </p>

                {/* Line items */}
                <div className="space-y-2 mb-4">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex justify-between text-[13px] text-[#6b6560]">
                      <span className="truncate mr-3">
                        {item.name}{item.size ? ` · ${item.size}` : ""} × {item.quantity}
                      </span>
                      <span className="shrink-0">₦{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-neutral-200 my-4" />

                <div className="flex justify-between text-[13px] text-[#6b6560] mb-2">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>

                <div className="h-px bg-neutral-200 my-4" />

                <div className="flex justify-between text-[15px] text-[#1a1a1a] font-medium mb-7">
                  <span>Total</span>
                  <span>₦{totalPrice().toLocaleString()}</span>
                </div>

                {/* Checkout — wire to Stripe later */}
                <button className="w-full bg-[#1a1a1a] text-white py-4 text-[13px] tracking-[0.15em] uppercase hover:bg-[#333] transition-colors duration-300">
                  Checkout
                </button>

                <Link
                  href="/new-arrivals"
                  className="block text-center text-[11px] text-[#aaa] hover:text-[#1a1a1a] tracking-[0.1em] uppercase mt-4 transition-colors duration-200"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}