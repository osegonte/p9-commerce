export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="mx-10 sm:mx-14 lg:mx-24 xl:mx-28 py-16 sm:py-20">

        {/* Top: Logo + Nav + Socials */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8">

          {/* Brand */}
          <div>
            <p className="text-lg tracking-[0.2em] font-light mb-4">NYNT</p>
            <p className="text-white/40 text-[13px] leading-[1.8] font-light max-w-[260px]">
              Built on vision, discipline, and legacy. Stay above.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-white/40 mb-5">Shop</p>
            <div className="flex flex-col gap-3">
              {["New Arrivals", "Hoodies", "Tees", "Headwear", "Shoes", "Accessories"].map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-white/60 text-[13px] font-light hover:text-white transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Info + Socials */}
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-white/40 mb-5">Info</p>
            <div className="flex flex-col gap-3 mb-10">
              {["About", "Contact", "Shipping & Returns", "Privacy Policy", "Terms of Service"].map((item) => (
                <a
                  key={item}
                  href={`/${item.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}`}
                  className="text-white/60 text-[13px] font-light hover:text-white transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-5">
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="text-white/50 hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} className="w-[18px] h-[18px]">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* TikTok */}
              <a href="#" aria-label="TikTok" className="text-white/50 hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[16px] h-[16px]">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.57 6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.37-6.22V9.4a8.16 8.16 0 0 0 3.85.96V7.1a4.85 4.85 0 0 1-.01-.4Z" />
                </svg>
              </a>
              {/* X / Twitter */}
              <a href="#" aria-label="X" className="text-white/50 hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="text-white/50 hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[16px] h-[16px]">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[0.5px] bg-white/10 mt-14 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-[11px] tracking-[0.1em]">
            © {new Date().getFullYear()} Nynth World. All rights reserved.
          </p>
          <p className="text-white/20 text-[11px] tracking-[0.1em]">
            Lagos · Berlin · Worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}