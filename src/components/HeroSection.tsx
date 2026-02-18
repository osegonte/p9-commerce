import HeroBlock from "@/components/HeroBlock";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[55vh] sm:h-[60vh] lg:h-[65vh]">
      <div className="relative w-full h-full overflow-hidden">

        {/* ── Desktop (lg+): 6 cols × 4 rows = 24 cells ── */}
        <div className="hidden lg:grid h-full w-full grid-cols-6 grid-rows-4">
          {/* col 1-2, rows 1-4 */}
          <div className="col-span-2 row-span-4">
            <HeroBlock src="/hero/hero-01.jpg" label="01" />
          </div>
          {/* col 3-4, rows 1-2 */}
          <div className="col-span-2 row-span-2">
            <HeroBlock src="/hero/hero-02.jpg" label="02" />
          </div>
          {/* col 5, rows 1-3 */}
          <div className="col-span-1 row-span-3">
            <HeroBlock src="/hero/hero-03.jpg" label="03" />
          </div>
          {/* col 6, rows 1-2 — blurred */}
          <div className="col-span-1 row-span-2">
            <HeroBlock src="/hero/hero-04.jpg" label="04" blurred />
          </div>
          {/* col 3, rows 3-4 — blurred */}
          <div className="col-span-1 row-span-2">
            <HeroBlock src="/hero/hero-05.jpg" label="05" blurred />
          </div>
          {/* col 4, rows 3-4 */}
          <div className="col-span-1 row-span-2">
            <HeroBlock src="/hero/hero-06.jpg" label="06" />
          </div>
          {/* col 5, row 4 */}
          <div className="col-span-1 row-span-1">
            <HeroBlock src="/hero/hero-07.jpg" label="07" />
          </div>
          {/* col 6, rows 3-4 — previously missing corner, now filled */}
          <div className="col-span-1 row-span-2">
            <HeroBlock src="/hero/hero-08.jpg" label="08" />
          </div>
        </div>

        {/* ── Tablet (sm–lg): 4 cols × 4 rows ── */}
        <div className="hidden sm:grid lg:hidden h-full w-full grid-cols-4 grid-rows-4">
          <div className="col-span-1 row-span-4">
            <HeroBlock src="/hero/hero-01.jpg" label="01" />
          </div>
          <div className="col-span-2 row-span-2">
            <HeroBlock src="/hero/hero-02.jpg" label="02" />
          </div>
          <div className="col-span-1 row-span-3">
            <HeroBlock src="/hero/hero-03.jpg" label="03" />
          </div>
          <div className="col-span-1 row-span-2">
            <HeroBlock src="/hero/hero-04.jpg" label="04" blurred />
          </div>
          <div className="col-span-1 row-span-2">
            <HeroBlock src="/hero/hero-05.jpg" label="05" blurred />
          </div>
          <div className="col-span-1 row-span-1">
            <HeroBlock src="/hero/hero-06.jpg" label="06" />
          </div>
        </div>

        {/* ── Mobile: 3 cols × 4 rows ── */}
        <div className="grid sm:hidden h-full w-full grid-cols-3 grid-rows-4">
          <div className="col-span-1 row-span-4">
            <HeroBlock src="/hero/hero-01.jpg" label="01" />
          </div>
          <div className="col-span-2 row-span-2">
            <HeroBlock src="/hero/hero-02.jpg" label="02" />
          </div>
          <div className="col-span-1 row-span-2">
            <HeroBlock src="/hero/hero-03.jpg" label="03" />
          </div>
          <div className="col-span-2 row-span-2">
            <HeroBlock src="/hero/hero-04.jpg" label="04" blurred />
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10 pointer-events-none z-10" />
      </div>
    </section>
  );
}