// FILE: src/components/ProductCard.tsx

import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  slug: string;
}

export default function ProductCard({ name, price, image, slug }: ProductCardProps) {
  return (
    <Link href={`/product/${slug}`} className="group block">
      {/* Image — tall portrait, light grey bg like reference */}
      <div
        className="relative w-full overflow-hidden bg-[#f2f2f0]"
        style={{ aspectRatio: "3 / 4" }}
      >
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            unoptimized
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-[#e8e8e6]" />
        )}
      </div>

      {/* Label */}
      <div className="pt-3">
        <p className="text-[#1a1a1a] text-[13px] leading-[1.45] font-light tracking-[0.01em]">
          {name}
        </p>
        <p className="text-[#1a1a1a] text-[13px] mt-[5px] font-light">
          {price}
        </p>
      </div>
    </Link>
  );
}