"use client";

import { useState } from "react";
import Image from "next/image";

const slides = [
  { src: "/lookbook/look-01.jpg", title: "Stay Above" },
  { src: "/lookbook/look-02.jpg", title: "Silent Discipline" },
  { src: "/lookbook/look-03.jpg", title: "Built Different" },
  { src: "/lookbook/look-04.jpg", title: "No Compromise" },
  { src: "/lookbook/look-05.jpg", title: "Legacy" },
];

export default function LookbookSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));

  const prevIndex = current === 0 ? slides.length - 1 : current - 1;
  const nextIndex = current === slides.length - 1 ? 0 : current + 1;

  return (
    <section className="bg-[#0a0a0a] py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Title */}
      <h2
        className="text-white text-center font-semibold mb-12 sm:mb-16"
        style={{ fontSize: "20px", lineHeight: 1.3 }}
      >
        Lookbook
      </h2>

      {/* Carousel */}
      <div className="relative flex items-center justify-center h-[50vh] sm:h-[55vh] lg:h-[60vh]">

        {/* Previous image — peeking left */}
        <div className="absolute left-0 w-[15%] sm:w-[18%] h-[75%] opacity-60">
          <div className="relative w-full h-full">
            <Image
              src={slides[prevIndex].src}
              alt={slides[prevIndex].title}
              fill
              className="object-cover"
              sizes="20vw"
            />
          </div>
        </div>

        {/* Left arrow */}
        <button
          onClick={prev}
          className="absolute left-[16%] sm:left-[19%] z-20 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors duration-300"
          aria-label="Previous"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Center image */}
        <div className="relative w-[52%] sm:w-[48%] lg:w-[45%] h-full z-10">
          <Image
            src={slides[current].src}
            alt={slides[current].title}
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>

        {/* Right arrow */}
        <button
          onClick={next}
          className="absolute right-[16%] sm:right-[19%] z-20 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors duration-300"
          aria-label="Next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Next image — peeking right */}
        <div className="absolute right-0 w-[15%] sm:w-[18%] h-[75%] opacity-60">
          <div className="relative w-full h-full">
            <Image
              src={slides[nextIndex].src}
              alt={slides[nextIndex].title}
              fill
              className="object-cover"
              sizes="20vw"
            />
          </div>
        </div>
      </div>

      {/* Caption */}
      <p
        className="text-white text-center mt-6"
        style={{ fontSize: "15px", letterSpacing: "0.02em" }}
      >
        {slides[current].title}
      </p>
    </section>
  );
}