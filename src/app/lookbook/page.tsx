import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";

const images = [
  "/lookbook/look-01.jpg",
  "/lookbook/look-02.jpg",
  "/lookbook/look-03.jpg",
  "/lookbook/look-04.jpg",
  "/lookbook/look-05.jpg",
];

export default function LookbookPage() {
  return (
    <>
      <Header />
      <section className="bg-white pt-24 pb-16 sm:pb-20">
        <div className="mx-10 sm:mx-14 lg:mx-24 xl:mx-28">
          <h1
            className="text-[#1a1a1a] font-semibold text-center mb-12 sm:mb-16"
            style={{ fontSize: "22px" }}
          >
            Lookbook
          </h1>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
            {images.map((src, i) => (
              <div key={i} className="relative break-inside-avoid overflow-hidden bg-neutral-100">
                <Image
                  src={src}
                  alt={`Lookbook ${i + 1}`}
                  width={800}
                  height={1000}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
