import Image from "next/image";

interface HeroBlockProps {
  src: string;
  label: string;
  blurred?: boolean;
}

export default function HeroBlock({ src, label, blurred = false }: HeroBlockProps) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-neutral-900">
      <Image
        src={src}
        alt={label}
        fill
        className={`object-cover transition-transform duration-700 ${
          blurred ? "scale-125 blur-[40px]" : ""
        }`}
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
      {blurred && (
        <div className="absolute inset-0 bg-black/20" />
      )}
    </div>
  );
}