import Image from "next/image";

interface HeroBlockProps {
  src: string;
  label: string;
  blurred?: boolean;
}

export default function HeroBlock({ src, label, blurred = false }: HeroBlockProps) {
  return (
    <div className="relative w-full h-full overflow-hidden bg-neutral-800">
      <Image
        src={src}
        alt={label}
        fill
        className={`object-cover ${blurred ? "blur-2xl scale-110" : ""}`}
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />
      {blurred && (
        <div className="absolute inset-0 bg-black/30" />
      )}
      {/* Dev label — remove later */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <span className="text-white/20 text-[10px] tracking-[0.2em] uppercase">
          {label}
        </span>
      </div>
    </div>
  );
}