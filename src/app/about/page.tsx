// FILE: src/app/about/page.tsx
import Header from "@/components/Header";
import AboutSection from "@/components/sections/AboutSection";
import Footer from "@/components/sections/Footer";

export default function AboutPage() {
  return (
    <>
      <Header alwaysDark />
      <div className="pt-14 sm:pt-16">
        <AboutSection />
      </div>
      <Footer />
    </>
  );
}