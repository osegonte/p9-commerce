"use client";

import Image from "next/image";

interface HeroBlockProps {
  src: string;
  label: string;
  loaded: boolean;
  initialTransform?: string;
  delay?: number;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
}

export default function HeroBlock({
  src,
  label,
  loaded,
  initialTransform = "translateY(24px)",
  delay = 0,
  objectFit = "cover",
  objectPosition = "center",
}: HeroBlockProps) {
  return (
    <div
      className="relative w-full h-full bg-neutral-950"
      style={{
        opacity: loaded ? 1 : 0,
        transform: loaded ? "none" : initialTransform,
        transition: `opacity 1s ease ${delay}ms, transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      <Image
        src={src}
        alt={label}
        fill
        unoptimized
        className="transition-none"
        style={{
          objectFit,
          objectPosition,
        }}
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 50vw"
      />
    </div>
  );
}