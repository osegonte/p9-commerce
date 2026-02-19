// FILE: src/components/sections/NewArrivalsSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import type { DBProduct } from "@/lib/products";

interface Props {
  products: DBProduct[];
}

export default function NewArrivalsSection({ products }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  if (products.length === 0) return null;

  const count = products.length;

  /*
   * Layout logic:
   * - 5+ products: fill full width edge to edge
   * - <5 products: each card has a comfortable fixed width, strip is centered
   *
   * stepPct = how far each card's left edge is from the previous one (% of container)
   * cardPct = each card's width (% of container)
   */
  const FILLS_FULL = count >= 5;
  // For few products: each card ~60% wide, step ~28% → nice overlap, centered strip
  const stepPct = FILLS_FULL ? Math.round(65 / count) : 28;
  const cardPct = FILLS_FULL
    ? 100 - stepPct * (count - 1)
    : 60;
  // Total strip width as % — used to center when not filling full width
  const stripWidthPct = FILLS_FULL
    ? 100
    : stepPct * (count - 1) + cardPct;

  return (
    <section ref={ref} className="w-full bg-white py-16 sm:py-20 lg:py-28 overflow-hidden">
      <div className="px-6 sm:px-10 lg:px-16 xl:px-20">

        {/* ── Header ── */}
        <div className="flex items-end justify-between mb-10 sm:mb-12">
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(12px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <p className="text-[#aaa] text-[10px] tracking-[0.35em] uppercase mb-2">
              Just dropped
            </p>
            <h2
              className="text-[#1a1a1a] text-[28px] sm:text-[34px] font-light leading-none"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              New Arrivals
            </h2>
          </div>

          <Link
            href="/new-arrivals"
            className="text-[11px] tracking-[0.18em] uppercase text-[#8a8580] hover:text-[#1a1a1a] transition-colors duration-200 border-b border-current pb-0.5 mb-1"
            style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.2s" }}
          >
            View All
          </Link>
        </div>

        {/* ── Card strip ── */}
        <div className="relative">

          {/* Left blur fade */}
          <div
            className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 z-20 pointer-events-none"
            style={{ background: "linear-gradient(to right, white 0%, transparent 100%)" }}
          />
          {/* Right blur fade */}
          <div
            className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 z-20 pointer-events-none"
            style={{ background: "linear-gradient(to left, white 0%, transparent 100%)" }}
          />

          {/* Cards container — centered when few products, full width when many */}
          <div
            className="relative mx-auto"
            style={{
              height: "420px",
              width: FILLS_FULL ? "100%" : `${stripWidthPct}%`,
            }}
          >
            {products.map((product, i) => {
              const isHovered = hovered === i;
              const leftPct = i * stepPct;
              // Last card fills remaining width; others use cardPct
              const widthPct = i === count - 1 ? 100 - leftPct : cardPct;

              return (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="absolute top-0 block"
                  style={{
                    left: `${leftPct}%`,
                    width: `${widthPct}%`,
                    height: "100%",
                    // Hovered card comes to front; otherwise stack right-to-left
                    zIndex: isHovered ? 50 : count - i,
                    transform: isHovered
                      ? "translateY(-14px) scale(1.025)"
                      : visible
                      ? "translateY(0) scale(1)"
                      : "translateY(32px) scale(0.95)",
                    opacity: visible ? 1 : 0,
                    transition: [
                      `transform 0.45s cubic-bezier(0.16,1,0.3,1)`,
                      `opacity 0.7s ease ${i * 0.08}s`,
                      `box-shadow 0.35s ease`,
                    ].join(", "),
                    boxShadow: isHovered
                      ? "0 24px 52px rgba(0,0,0,0.24)"
                      : "0 4px 18px rgba(0,0,0,0.09)",
                  }}
                >
                  <div className="relative w-full h-full overflow-hidden bg-[#f2f2f0]">
                    {product.images?.[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        unoptimized
                        className="object-cover object-center"
                        sizes="(max-width: 640px) 80vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#e4e4e2]" />
                    )}

                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent"
                      style={{
                        opacity: isHovered ? 1 : 0.35,
                        transition: "opacity 0.35s ease",
                      }}
                    />

                    {/* Label — slides up on hover */}
                    <div
                      className="absolute bottom-0 left-0 right-0 p-4 sm:p-5"
                      style={{
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? "translateY(0)" : "translateY(8px)",
                        transition: "opacity 0.3s ease, transform 0.35s ease",
                      }}
                    >
                      <p className="text-[9px] tracking-[0.22em] uppercase text-white/60 mb-1">
                        {product.category}
                      </p>
                      <p className="text-white text-[14px] font-light leading-snug">
                        {product.name}
                      </p>
                      <p className="text-white/75 text-[13px] mt-1">
                        ₦{Number(product.price).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ── CTA ── */}
        <div
          className="mt-12 text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(10px)",
            transition: "opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s",
          }}
        >
          <Link
            href="/new-arrivals"
            className="inline-block border border-[#1a1a1a] text-[#1a1a1a] px-10 py-3.5 text-[11px] tracking-[0.2em] uppercase hover:bg-[#1a1a1a] hover:text-white transition-all duration-300"
          >
            Shop New Arrivals
          </Link>
        </div>

      </div>
    </section>
  );
}