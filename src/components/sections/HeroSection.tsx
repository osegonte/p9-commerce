"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import HeroBlock from "@/components/HeroBlock";

const IMG1_RATIO = 1571 / 2506;
const IMG2_RATIO = 2038 / 2506;

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        height: "min(100svh, 960px)",
        minHeight: "560px",
        background: "#ffffff",
      }}
    >
      <div className="flex h-full w-full items-stretch" style={{ gap: "1px" }}>

        {/* Image 1 */}
        <div
          className="relative shrink-0"
          style={{
            aspectRatio: `${IMG1_RATIO}`,
            height: "100%",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateX(-40px)",
            transition: "opacity 1s ease 0ms, transform 1.1s cubic-bezier(0.16,1,0.3,1) 0ms",
          }}
        >
          <HeroBlock
            src="/hero/hero-01.jpg"
            label="01"
            loaded={true}
            initialTransform="none"
            delay={0}
            objectFit="cover"
            objectPosition="center"
          />
        </div>

        {/* Image 2 */}
        <div
          className="relative shrink-0"
          style={{
            aspectRatio: `${IMG2_RATIO}`,
            height: "100%",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateX(40px)",
            transition: "opacity 1s ease 100ms, transform 1.1s cubic-bezier(0.16,1,0.3,1) 100ms",
          }}
        >
          <HeroBlock
            src="/hero/hero-02.jpg"
            label="02"
            loaded={true}
            initialTransform="none"
            delay={0}
            objectFit="cover"
            objectPosition="center"
          />
        </div>

        {/* Glass strip — hero-03 blurred behind frosted panel */}
        <div
          className="relative overflow-hidden"
          style={{
            flex: "1",
            minWidth: "60px",
            opacity: loaded ? 1 : 0,
            transition: "opacity 1.2s ease 300ms",
          }}
        >
          {/* hero-03 as background — scaled up slightly so blur edges don't show */}
          <Image
            src="/hero/hero-03.jpg"
            alt=""
            fill
            unoptimized
            style={{
              objectFit: "cover",
              objectPosition: "center",
              transform: "scale(1.1)",
              filter: "blur(24px) saturate(120%) brightness(1.05)",
            }}
            sizes="20vw"
          />
          {/* Frosted white overlay on top of the blur */}
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(255,255,255,0.35)",
            }}
          />
          {/* Left edge fade to blend with image 2 */}
          <div
            className="absolute inset-y-0 left-0 w-6 pointer-events-none"
            style={{
              background: "linear-gradient(to right, rgba(0,0,0,0.06), transparent)",
            }}
          />
        </div>
      </div>

      {/* Header gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent pointer-events-none z-10" />

      {/* Tagline */}
      <p
        className="absolute bottom-8 left-6 z-20 text-white text-[11px] tracking-[0.4em] uppercase font-light pointer-events-none"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "none" : "translateY(10px)",
          transition: "opacity 1s ease 800ms, transform 1s ease 800ms",
        }}
      >
        Stay Above.
      </p>
    </section>
  );
}