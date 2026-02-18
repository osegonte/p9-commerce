"use client";

import { useEffect, useRef, useState } from "react";

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full py-24 sm:py-32 lg:py-40 flex justify-center items-center overflow-hidden"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div
        className="relative z-10 w-full max-w-[580px] px-8 text-center"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 1s ease 0ms" }}
      >
        <p className="text-[#888] text-[10px] tracking-[0.35em] uppercase mb-8"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(12px)", transition: "opacity 0.8s ease 100ms, transform 0.8s ease 100ms" }}>
          About Nynth World
        </p>
        <p className="text-[#555] text-[13px] leading-[1.9] mb-1"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(12px)", transition: "opacity 0.8s ease 180ms, transform 0.8s ease 180ms" }}>
          Founded 20th October 2022. Officially registered 2nd October 2025.
        </p>
        <p className="text-[#888] text-[10px] tracking-[0.22em] uppercase mb-1"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(12px)", transition: "opacity 0.8s ease 220ms, transform 0.8s ease 220ms" }}>
          Built with long-term vision and discipline.
        </p>
        <p className="text-[#888] text-[10px] tracking-[0.22em] uppercase mb-10"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(12px)", transition: "opacity 0.8s ease 260ms, transform 0.8s ease 260ms" }}>
          The brand stands on one principle
        </p>
        <h2 className="text-[#1a1a1a] leading-none mb-6"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(52px, 9vw, 88px)",
            fontWeight: 400,
            letterSpacing: "-0.01em",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px) scale(0.98)",
            transition: "opacity 1s ease 350ms, transform 1.1s cubic-bezier(0.16,1,0.3,1) 350ms",
            textShadow: "0 1px 0 rgba(255,255,255,0.8), 0 -1px 0 rgba(0,0,0,0.08)",
          }}>
          STAY ABOVE.
        </h2>
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(12px)", transition: "opacity 0.8s ease 480ms, transform 0.8s ease 480ms" }}>
          <p className="text-[#444] text-[15px] leading-[2.1]" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic" }}>Above doubt.</p>
          <p className="text-[#444] text-[15px] leading-[2.1]" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic" }}>Above pressure.</p>
          <p className="text-[#444] text-[15px] leading-[2.1]" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic" }}>Above circumstances.</p>
        </div>
        <div className="mx-auto my-10"
          style={{ width: visible ? "100%" : "0%", height: "0.5px", backgroundColor: "rgba(0,0,0,0.12)", transition: "width 1s ease 600ms" }} />
        <p className="text-[#555] text-[14px] leading-[1.9] mb-8"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(12px)", transition: "opacity 0.8s ease 700ms, transform 0.8s ease 700ms" }}>
          Nynth represents winners who move with vision, build in silence, and turn pain into power.
        </p>
        <p className="text-[#888] text-[10px] tracking-[0.25em] uppercase mb-2"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 780ms" }}>
          Led by CEO
        </p>
        <p className="text-[#1a1a1a] text-[22px] mb-8"
          style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(8px)", transition: "opacity 0.8s ease 820ms, transform 0.8s ease 820ms" }}>
          Newman Yange
        </p>
        <p className="text-[#555] text-[14px] leading-[1.9] mb-10"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(12px)", transition: "opacity 0.8s ease 880ms, transform 0.8s ease 880ms" }}>
          Built on structure, presence, and legacy. This is not for everyone, only for those who understand the standard.
        </p>
        <p className="text-[#888] text-[10px] tracking-[0.35em] uppercase"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 960ms" }}>
          Welcome to Nynth World
        </p>
      </div>
    </section>
  );
}