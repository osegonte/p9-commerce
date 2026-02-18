import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  slug: string;
}

export default function ProductCard({ name, price, image, slug }: ProductCardProps) {
  return (
    <Link href={`/product/${slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-3">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      <p className="text-[#1a1a1a] text-[14px]">{name}</p>
      <p className="text-[#6b6560] text-[13px] mt-1">{price}</p>
    </Link>
  );
}
