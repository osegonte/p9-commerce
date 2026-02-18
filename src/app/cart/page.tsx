"use client";

import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";
import Link from "next/link";

export default function CartPage() {
  const cartEmpty = true; // placeholder — will be dynamic later

  return (
    <>
      <Header />
      <section className="bg-white pt-24 pb-16 sm:pb-20 min-h-[70vh]">
        <div className="mx-10 sm:mx-14 lg:mx-24 xl:mx-28">
          <h1
            className="text-[#1a1a1a] font-semibold text-center mb-12"
            style={{ fontSize: "22px" }}
          >
            Your Bag
          </h1>

          {cartEmpty ? (
            <div className="text-center py-20">
              <p className="text-[#6b6560] text-[15px] mb-8">Your bag is empty.</p>
              <Link
                href="/new-arrivals"
                className="inline-block bg-[#1a1a1a] text-white px-10 py-4 text-[13px] tracking-[0.15em] uppercase hover:bg-[#333] transition-colors duration-300"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart items — left */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex gap-6 py-6 border-b border-neutral-100">
                  <div className="w-24 h-32 bg-neutral-100 shrink-0" />
                  <div className="flex-1">
                    <p className="text-[#1a1a1a] text-[14px] font-semibold">Product Name</p>
                    <p className="text-[#6b6560] text-[13px] mt-1">Size: M</p>
                    <p className="text-[#1a1a1a] text-[14px] mt-2">€129.00</p>
                  </div>
                  <button className="text-[#6b6560] text-[12px] uppercase tracking-[0.1em] hover:text-[#1a1a1a] self-start">
                    Remove
                  </button>
                </div>
              </div>

              {/* Summary — right */}
              <div className="lg:sticky lg:top-24 lg:self-start bg-neutral-50 p-8">
                <p className="text-[#1a1a1a] text-[14px] font-semibold mb-6">Order Summary</p>
                <div className="flex justify-between text-[14px] text-[#6b6560] mb-3">
                  <span>Subtotal</span>
                  <span>€129.00</span>
                </div>
                <div className="flex justify-between text-[14px] text-[#6b6560] mb-6">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="h-[0.5px] bg-neutral-200 mb-6" />
                <div className="flex justify-between text-[15px] text-[#1a1a1a] font-semibold mb-8">
                  <span>Total</span>
                  <span>€129.00</span>
                </div>
                <button className="w-full bg-[#1a1a1a] text-white py-4 text-[13px] tracking-[0.15em] uppercase hover:bg-[#333] transition-colors duration-300">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
