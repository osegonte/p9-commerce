export default function AboutSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24 flex justify-center">
      <div className="max-w-[540px] w-full px-8 text-center">
        <h2
          className="text-[#1a1a1a] font-semibold"
          style={{ fontSize: "22px", lineHeight: 1.3 }}
        >
          Stay Above.
        </h2>
        <p
          className="text-[#4a4a4a] mt-4"
          style={{ fontSize: "15px", lineHeight: 1.7 }}
        >
          Nynth World was built on vision, discipline, and legacy. For those who move with purpose, build in silence, and turn pain into power.
        </p>
      </div>
    </section>
  );
}