"use client";

import { useState } from "react";
import Link from "next/link";

const accordionSections = [
  {
    title: "Need Help?",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Size Guide", href: "/size-guide" },
      { label: "Shipping & Returns", href: "/shipping-returns" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Hoodies", href: "/hoodies" },
      { label: "Tees", href: "/tees" },
      { label: "Headwear", href: "/headwear" },
    ],
  },
  {
    title: "Delivery",
    links: [
      { label: "Shipping Information", href: "/shipping-returns" },
      { label: "Track Your Order", href: "/contact" },
      { label: "Returns Policy", href: "/shipping-returns" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
];

function AccordionItem({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-[11px] tracking-[0.2em] uppercase text-white font-normal">
          {title}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.2}
          stroke="currentColor"
          className="w-4 h-4 text-[#1a1a1a] transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      <div
        style={{
          maxHeight: open ? "300px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.35s ease",
        }}
      >
        <div className="pb-4 flex flex-col gap-3">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[13px] text-white/50 hover:text-white transition-colors duration-200 font-light"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#0a0a0a]">
      <div className="mx-8 sm:mx-14 lg:mx-20 py-14 sm:py-16">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16">

          {/* Left — brand + socials */}
          <div>
            <p
              className="text-white text-[22px] tracking-[0.15em] font-light mb-3"
              style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
            >
              NYNT
            </p>
            <p className="text-white/50 text-[12px] leading-[1.8] font-light max-w-[280px] mb-10">
              Built on vision, discipline, and legacy.<br />
              Stay Above.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-5">
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="text-white/40 hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-[18px] h-[18px]">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* TikTok */}
              <a href="#" aria-label="TikTok" className="text-white/40 hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[16px] h-[16px]">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.57 6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.37-6.22V9.4a8.16 8.16 0 0 0 3.85.96V7.1a4.85 4.85 0 0 1-.01-.4Z" />
                </svg>
              </a>
              {/* X */}
              <a href="#" aria-label="X" className="text-white/40 hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="text-white/40 hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[16px] h-[16px]">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right — accordion */}
          <div>
            {accordionSections.map((section) => (
              <AccordionItem key={section.title} {...section} />
            ))}
            {/* Last border */}
            <div className="border-t border-white/10" />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[11px] text-white/30 tracking-[0.08em]">
            © {new Date().getFullYear()} Nynth World. All rights reserved.
          </p>
          <p className="text-[11px] text-white/30 tracking-[0.08em]">
            Made by{" "}
            <a
              href="https://osegonte.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
            >
              Osegonte.webdev
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}