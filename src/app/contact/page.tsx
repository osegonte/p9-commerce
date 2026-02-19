// FILE: src/app/contact/page.tsx
"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";
import Link from "next/link";

const SOCIALS = [
  {
    label: "Instagram",
    handle: "@nynthworld",
    href: "https://www.instagram.com/nynthworld?igsh=MWw2b3A1MGF3cGN2Zg==",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    handle: "@nynthworld",
    href: "https://www.tiktok.com/@nynthworld?_t=8nWlI6pKSBR&_r=1",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.57 6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.37-6.22V9.4a8.16 8.16 0 0 0 3.85.96V7.1a4.85 4.85 0 0 1-.01-.4Z" />
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    handle: "@nynthworld",
    href: "https://x.com/nynthworld?s=21&t=rLr-dq5F-lmaCFDgrYcsRg",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[17px] h-[17px]">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    handle: "Nynth World",
    href: "https://www.facebook.com/share/14WwgipXPFn/?mibextid=wwXIfr",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

type Tab = "email" | "phone";

export default function ContactPage() {
  const [tab, setTab] = useState<Tab>("email");

  return (
    <>
      <Header alwaysDark />
      <section className="bg-white pt-14 sm:pt-16 min-h-[100svh] flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-[420px] py-16">

          {/* Title */}
          <h1 className="text-[#1a1a1a] text-[26px] font-light text-center mb-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Contact Us
          </h1>
          <p className="text-[#aaa] text-[12px] tracking-[0.15em] uppercase text-center mb-10">
            We&apos;re here for you
          </p>

          {/* Tab toggle — Email / Phone */}
          <div className="flex border border-neutral-200 mb-8">
            {(["email", "phone"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-3 text-[11px] tracking-[0.15em] uppercase transition-colors duration-200 ${
                  tab === t
                    ? "bg-[#1a1a1a] text-white"
                    : "text-[#8a8580] hover:text-[#1a1a1a]"
                }`}
              >
                {t === "email" ? "Email" : "Phone"}
              </button>
            ))}
          </div>

          {/* Email panel */}
          {tab === "email" && (
            <div className="text-center">
              <p className="text-[#6b6560] text-[13px] mb-6 leading-relaxed">
                Tap below to open your mail app. We usually respond within 24 hours.
              </p>
              <a
                href="mailto:nynthworld@gmail.com?subject=Enquiry from uh9.com"
                className="flex items-center justify-center gap-3 w-full bg-[#1a1a1a] text-white py-4 text-[13px] tracking-[0.15em] uppercase hover:bg-[#333] transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                nynthworld@gmail.com
              </a>
            </div>
          )}

          {/* Phone panel */}
          {tab === "phone" && (
            <div className="text-center">
              <p className="text-[#6b6560] text-[13px] mb-6 leading-relaxed">
                Tap below to call us directly.
              </p>
              <a
                href="tel:+2348158115858"
                className="flex items-center justify-center gap-3 w-full bg-[#1a1a1a] text-white py-4 text-[13px] tracking-[0.15em] uppercase hover:bg-[#333] transition-colors duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                +234 815 811 5858
              </a>
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-neutral-100" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#ccc]">Or find us on</span>
            <div className="flex-1 h-px bg-neutral-100" />
          </div>

          {/* Social links */}
          <div className="space-y-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-4 py-3.5 border border-neutral-100 hover:border-[#1a1a1a] transition-colors duration-200 group"
              >
                <div className="flex items-center gap-3 text-[#6b6560] group-hover:text-[#1a1a1a] transition-colors duration-200">
                  {s.icon}
                  <span className="text-[13px] font-light">{s.label}</span>
                </div>
                <span className="text-[11px] text-[#aaa] group-hover:text-[#1a1a1a] transition-colors duration-200">
                  {s.handle}
                </span>
              </a>
            ))}
          </div>

          {/* Back to shop */}
          <div className="mt-10 text-center">
            <Link href="/" className="text-[11px] tracking-[0.15em] uppercase text-[#aaa] hover:text-[#1a1a1a] transition-colors duration-200">
              ← Back to Shop
            </Link>
          </div>

        </div>
      </section>
      <Footer />
    </>
  );
}