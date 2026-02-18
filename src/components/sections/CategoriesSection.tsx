import Image from "next/image";
import Link from "next/link";

const categories = [
  { name: "Headwear",  href: "/headwear",  src: "/categories/headwear.jpg"  },
  { name: "Tees",      href: "/tees",      src: "/categories/tees.jpg"      },
  { name: "Hoodies",   href: "/hoodies",   src: "/categories/hoodies.jpg"   },
];

export default function CategoriesSection() {
  return (
    <section className="w-full bg-white py-16 sm:py-20">
      <div
        className="grid grid-cols-2 sm:grid-cols-3"
        style={{ gap: "1px", backgroundColor: "#e8e8e8" }}
      >
        {categories.map((cat) => (
          <Link key={cat.name} href={cat.href} className="group block bg-white">
            {/* Square image container */}
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "1 / 1", backgroundColor: "#f4f4f2" }}
            >
              <Image
                src={cat.src}
                alt={cat.name}
                fill
                unoptimized
                className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            </div>
            {/* Label */}
            <div className="px-4 py-5 bg-white">
              <p className="text-[#1a1a1a] text-[14px] font-light tracking-wide">
                {cat.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}