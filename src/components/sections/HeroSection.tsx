import HeroBlock from "@/components/HeroBlock";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[55vh] sm:h-[60vh] lg:h-[65vh]">
      <div className="relative w-full h-full overflow-hidden">

        {/* Desktop layout (lg+) */}
        <div className="hidden lg:grid h-full w-full grid-cols-6 grid-rows-4">
          <div className="col-span-2 row-span-4">
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
          <div className="col-span-1 row-span-2">
            <HeroBlock src="/hero/hero-06.jpg" label="06" />
          </div>
          <div className="col-span-1 row-span-1">
            <HeroBlock src="/hero/hero-07.jpg" label="07" />
          </div>
          <div className="col-span-1 row-span-1">
            <HeroBlock src="/hero/hero-08.jpg" label="08" />
          </div>
        </div>

        {/* Tablet layout (sm to lg) */}
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

        {/* Mobile layout */}
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
          <div className="col-span-1 row-span-2">
            <HeroBlock src="/hero/hero-04.jpg" label="04" blurred />
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/10 pointer-events-none z-10" />
      </div>
    </section>
  );
}