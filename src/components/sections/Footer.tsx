// FILE: src/components/sections/Footer.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/nynthworld?igsh=MWw2b3A1MGF3cGN2Zg==",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-[18px] h-[18px]">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@nynthworld?_t=8nWlI6pKSBR&_r=1",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[16px] h-[16px]">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.57 6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.37-6.22V9.4a8.16 8.16 0 0 0 3.85.96V7.1a4.85 4.85 0 0 1-.01-.4Z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/nynthworld?s=21&t=rLr-dq5F-lmaCFDgrYcsRg",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/14WwgipXPFn/?mibextid=wwXIfr",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[16px] h-[16px]">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

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

function AccordionItem({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-white/10">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-left">
        <span className="text-[11px] tracking-[0.2em] uppercase text-white font-normal">{title}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor"
          className="w-4 h-4 text-white/40 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div style={{ maxHeight: open ? "300px" : "0px", overflow: "hidden", transition: "max-height 0.35s ease" }}>
        <div className="pb-4 flex flex-col gap-3">
          {links.map((link) => (
            <Link key={link.label} href={link.href}
              className="text-[13px] text-white/50 hover:text-white transition-colors duration-200 font-light">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16">

          {/* Left — brand + contact + socials */}
          <div>
            <p className="text-white text-[22px] tracking-[0.15em] font-light mb-3"
              style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
              NYNT
            </p>
            <p className="text-white/50 text-[12px] leading-[1.8] font-light max-w-[280px] mb-8">
              Built on vision, discipline, and legacy.<br />Stay Above.
            </p>

            {/* Contact info */}
            <div className="mb-8 space-y-2">
              <a href="mailto:nynthworld@gmail.com"
                className="flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-300 text-[12px]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-4 h-4 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                nynthworld@gmail.com
              </a>
              <a href="tel:+2348158115858"
                className="flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-300 text-[12px]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-4 h-4 shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                +234 815 811 5858
              </a>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-5">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-white/40 hover:text-white transition-colors duration-300">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right — accordion */}
          <div>
            {accordionSections.map((section) => (
              <AccordionItem key={section.title} {...section} />
            ))}
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
            <a href="https://osegonte.dev" target="_blank" rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200">
              Osegonte.webdev
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}