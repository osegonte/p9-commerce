// FILE: src/components/ProductGallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const hasImages = images.length > 0;
  const activeImage = hasImages ? images[activeIndex] : null;

  return (
    <div className="flex gap-3 sm:gap-4">

      {/* ── Thumbnail strip — left side, vertical ── */}
      {images.length > 1 && (
        <div className="flex flex-col gap-2 w-[64px] sm:w-[72px] shrink-0">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative overflow-hidden transition-all duration-200 ${
                i === activeIndex
                  ? "ring-1 ring-[#1a1a1a] opacity-100"
                  : "opacity-50 hover:opacity-80"
              }`}
              style={{ aspectRatio: "3/4" }}
              aria-label={`View ${i + 1}`}
            >
              <Image
                src={src}
                alt={`${name} view ${i + 1}`}
                fill
                unoptimized
                className="object-cover bg-[#f2f2f0]"
              />
            </button>
          ))}
        </div>
      )}

      {/* ── Main image ── */}
      <div className="relative flex-1 overflow-hidden bg-[#f2f2f0]" style={{ aspectRatio: "3/4" }}>
        {activeImage ? (
          <Image
            key={activeIndex} // remount on change = no stale image
            src={activeImage}
            alt={name}
            fill
            unoptimized
            className="object-cover object-center transition-opacity duration-300"
            sizes="(max-width: 1024px) 90vw, 50vw"
            priority
          />
        ) : (
          <div className="w-full h-full bg-[#e8e8e6]" />
        )}
      </div>
    </div>
  );
}