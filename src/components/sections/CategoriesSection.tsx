import Image from "next/image";

export default function CategoriesSection() {
  const categories = [
    { name: "Headwear", src: "/categories/headwear.jpg" },
    { name: "Tees", src: "/categories/tees.jpg" },
    { name: "Hoodies", src: "/categories/hoodies.jpg" },
  ];

  return (
    <section className="bg-white pb-16 sm:pb-20 lg:pb-24">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {categories.map((cat) => (
          <a
            key={cat.name}
            href={`/${cat.name.toLowerCase()}`}
            className="group block"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
              <Image
                src={cat.src}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
            </div>
            <p
              className="text-center text-[#1a1a1a] mt-4"
              style={{ fontSize: "14px", letterSpacing: "0.02em" }}
            >
              {cat.name}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}