// FILE: src/components/sections/AboutSection.tsx
// Requires: npm install framer-motion
// Image: place your PNG cutout at public/about/about-image.png

"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay },
  }),
};

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="w-full bg-white py-20 sm:py-28 lg:py-36 overflow-visible">
      <div className="px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: Text ── */}
          <motion.div
            className="max-w-[520px]"
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          >
            {/* Label — underlined */}
            <motion.p
              className="text-[#888] text-[10px] tracking-[0.35em] uppercase mb-8 inline-block border-b border-[#ccc] pb-0.5"
              variants={fadeUp} custom={0.0}
              initial="hidden" animate={inView ? "show" : "hidden"}
            >
              About Nynth World
            </motion.p>

            <motion.p
              className="text-[#555] text-[13px] leading-[1.9] mb-1"
              variants={fadeUp} custom={0.15}
              initial="hidden" animate={inView ? "show" : "hidden"}
            >
              Founded 20th October 2022. Officially registered 2nd October 2025.
            </motion.p>

            <motion.p
              className="text-[#888] text-[10px] tracking-[0.22em] uppercase mb-1"
              variants={fadeUp} custom={0.25}
              initial="hidden" animate={inView ? "show" : "hidden"}
            >
              Built with long-term vision and discipline.
            </motion.p>

            <motion.p
              className="text-[#888] text-[10px] tracking-[0.22em] uppercase mb-10"
              variants={fadeUp} custom={0.35}
              initial="hidden" animate={inView ? "show" : "hidden"}
            >
              The brand stands on one principle
            </motion.p>

            {/* STAY ABOVE */}
            <motion.h2
              className="text-[#1a1a1a] leading-none mb-6"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(48px, 7vw, 80px)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
              }}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.48 }}
            >
              STAY ABOVE.
            </motion.h2>

            {/* Above doubt / pressure / circumstances */}
            {["Above doubt.", "Above pressure.", "Above circumstances."].map((line, i) => (
              <motion.p
                key={line}
                className="text-[#444] text-[15px] leading-[2.1]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic" }}
                variants={fadeUp} custom={0.65 + i * 0.13}
                initial="hidden" animate={inView ? "show" : "hidden"}
              >
                {line}
              </motion.p>
            ))}

            {/* Expanding divider */}
            <motion.div
              className="my-8 h-px bg-black/10"
              initial={{ scaleX: 0, originX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.05 }}
            />

            <motion.p
              className="text-[#555] text-[14px] leading-[1.9] mb-8"
              variants={fadeUp} custom={1.1}
              initial="hidden" animate={inView ? "show" : "hidden"}
            >
              Nynth represents winners who move with vision, build in silence, and turn pain into power.
            </motion.p>

            <motion.p
              className="text-[#888] text-[10px] tracking-[0.25em] uppercase mb-2"
              variants={fadeUp} custom={1.25}
              initial="hidden" animate={inView ? "show" : "hidden"}
            >
              Led by CEO
            </motion.p>

            <motion.p
              className="text-[#1a1a1a] text-[22px] mb-8"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}
              variants={fadeUp} custom={1.35}
              initial="hidden" animate={inView ? "show" : "hidden"}
            >
              Newman Yange
            </motion.p>

            <motion.p
              className="text-[#555] text-[14px] leading-[1.9] mb-8"
              variants={fadeUp} custom={1.48}
              initial="hidden" animate={inView ? "show" : "hidden"}
            >
              Built on structure, presence, and legacy. This is not for everyone — only for those who understand the standard.
            </motion.p>

            <motion.p
              className="text-[#888] text-[10px] tracking-[0.35em] uppercase"
              variants={fadeUp} custom={1.6}
              initial="hidden" animate={inView ? "show" : "hidden"}
            >
              Welcome to Nynth World
            </motion.p>
          </motion.div>

          {/* ── Right: Image ── */}
          {/*
            Place your PNG cutout at: public/about/about-image.png
            PNG keeps transparency — subject sits cleanly on white.
            drop-shadow traces the exact cutout shape for definition.
            marginBottom lets the subject bleed naturally past the section.
          */}
          <motion.div
            className="flex items-start justify-center w-full"
            style={{ marginBottom: "-60px" }}
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <Image
              src="/about/about-image.png"
              alt="Nynth World — Stay Above"
              width={600}
              height={900}
              unoptimized
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "88vh",
                objectFit: "contain",
                objectPosition: "top center",
                filter: "drop-shadow(0px 6px 28px rgba(0,0,0,0.16)) drop-shadow(0px 2px 6px rgba(0,0,0,0.10))",
              }}
              sizes="(max-width: 1024px) 90vw, 45vw"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}