"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function Header() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAccountClick = async () => {
    if (user) {
      await supabase.auth.signOut();
      router.push("/");
    } else {
      router.push("/login");
    }
  };

  const navItems = [
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Hoodies", href: "/hoodies" },
    { label: "Tees", href: "/tees" },
    { label: "Headwear", href: "/headwear" },
    { label: "Accessories", href: "/accessories" },
    { label: "Lookbook", href: "/lookbook" },
  ];

  const iconColor = scrolled ? "text-black" : "text-white";

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 sm:h-16">

          {/* ── Left: Menu ── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2.5"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col justify-center gap-[5px] w-5 h-5">
              <span className={`block h-[1.5px] w-full transition-all duration-300 origin-center ${scrolled ? "bg-black" : "bg-white"} ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
              <span className={`block h-[1.5px] w-full transition-all duration-300 ${scrolled ? "bg-black" : "bg-white"} ${menuOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`block h-[1.5px] w-full transition-all duration-300 origin-center ${scrolled ? "bg-black" : "bg-white"} ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
            </div>
            <span className={`text-[11px] tracking-[0.15em] uppercase font-light hidden sm:inline transition-colors duration-500 ${scrolled ? "text-black" : "text-white"}`}>
              menu
            </span>
          </button>

          {/* ── Center: Logo ── */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="block">
              <svg
                viewBox="0 0 120 32"
                className={`h-5 sm:h-6 w-auto transition-colors duration-500 ${scrolled ? "fill-black" : "fill-white"}`}
                xmlns="http://www.w3.org/2000/svg"
              >
                <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle"
                  fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
                  fontSize="24" fontWeight="300" letterSpacing="6">
                  NYNT
                </text>
              </svg>
            </Link>
          </div>

          {/* ── Right: Icons ── */}
          <div className="flex items-center gap-5 sm:gap-6">

            {/* Contact — desktop only */}
            <Link href="/contact"
              className={`text-[11px] tracking-[0.15em] uppercase font-light hidden lg:inline transition-colors duration-500 ${iconColor}`}>
              contact
            </Link>

            {/* Contact icon — mobile */}
            <Link href="/contact" className={`lg:hidden transition-colors duration-500 ${iconColor}`} aria-label="Contact">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-[18px] h-[18px]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
            </Link>

            {/* Account — filled when logged in, outline when logged out */}
            <button
              onClick={handleAccountClick}
              className={`transition-colors duration-500 relative group ${iconColor}`}
              aria-label={user ? "Sign out" : "Sign in"}
            >
              {user ? (
                /* Filled icon = logged in */
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] sm:w-5 sm:h-5">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                </svg>
              ) : (
                /* Outline icon = logged out */
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-[18px] h-[18px] sm:w-5 sm:h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              )}

              {/* Tooltip */}
              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] tracking-wide whitespace-nowrap bg-black/80 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                {user ? "Sign out" : "Sign in"}
              </span>
            </button>

            {/* Cart */}
            <Link href="/cart" className={`transition-colors duration-500 relative ${iconColor}`} aria-label="Cart">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-[18px] h-[18px] sm:w-5 sm:h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Full-screen Menu Overlay ── */}
      <div className={`fixed inset-0 z-40 bg-black transition-all duration-500 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <nav className="flex flex-col justify-center items-start h-full px-4 sm:px-6 lg:px-8">
          {navItems.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-white text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide py-3 sm:py-4 hover:opacity-50 transition-all duration-300"
              style={{
                transitionDelay: menuOpen ? `${i * 60}ms` : "0ms",
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: menuOpen ? 1 : 0,
              }}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-12 pt-8 border-t border-white/20 w-full">
            <Link href="/contact"
              className="text-white/60 text-sm tracking-[0.15em] uppercase font-light hover:text-white transition-colors duration-300"
              onClick={() => setMenuOpen(false)}>
              Contact Us
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}