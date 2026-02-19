// FILE: src/components/AddToCartButton.tsx
"use client";

import { useState } from "react";
import type { DBProduct } from "@/lib/products";
import { useCartStore } from "@/lib/cartStore";

interface Props {
  product: DBProduct;
}

export default function AddToCartButton({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);

  const sizes = product.sizes ?? [];
  const hasSizes = sizes.length > 0;
  const canAdd = product.in_stock && (!hasSizes || selectedSize !== null);

  const handleAdd = () => {
    if (!canAdd) return;

    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images?.[0] ?? "",
      size: selectedSize,
      quantity,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="space-y-5">

      {/* ── Size selector ── */}
      {hasSizes && (
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#8a8580] mb-3">Size</p>
          <div className="flex gap-2 flex-wrap">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size === selectedSize ? null : size)}
                className={`w-12 h-12 border text-[13px] font-light transition-colors duration-200 ${
                  selectedSize === size
                    ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                    : "border-neutral-200 text-[#6b6560] hover:border-[#1a1a1a]"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {!selectedSize && (
            <p className="text-[11px] text-[#aaa] mt-2">Please select a size</p>
          )}
        </div>
      )}

      {/* ── Quantity selector ── */}
      <div>
        <p className="text-[11px] tracking-[0.2em] uppercase text-[#8a8580] mb-3">Quantity</p>
        <div className="flex items-center border border-neutral-200 w-fit">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-10 flex items-center justify-center text-[#6b6560] hover:text-[#1a1a1a] transition-colors duration-150 text-lg"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-10 text-center text-[14px] text-[#1a1a1a] select-none">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-10 h-10 flex items-center justify-center text-[#6b6560] hover:text-[#1a1a1a] transition-colors duration-150 text-lg"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* ── Add to Cart button ── */}
      <button
        onClick={handleAdd}
        disabled={!canAdd}
        className={`w-full py-4 text-[13px] tracking-[0.15em] uppercase transition-all duration-300 ${
          added
            ? "bg-[#2a6a3a] text-white"
            : canAdd
            ? "bg-[#1a1a1a] text-white hover:bg-[#333]"
            : "bg-neutral-100 text-[#aaa] cursor-not-allowed"
        }`}
      >
        {!product.in_stock
          ? "Out of Stock"
          : added
          ? "Added to Cart ✓"
          : hasSizes && !selectedSize
          ? "Select a Size"
          : "Add to Cart"}
      </button>
    </div>
  );
}