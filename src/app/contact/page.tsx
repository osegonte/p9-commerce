import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";

export default function ContactPage() {
  return (
    <>
      <Header />
      <section className="bg-white pt-24 pb-16 sm:pb-20 min-h-[70vh]">
        <div className="mx-10 sm:mx-14 lg:mx-24 xl:mx-28">
          <div className="max-w-[600px] mx-auto">
            <h1
              className="text-[#1a1a1a] font-semibold text-center mb-4"
              style={{ fontSize: "22px" }}
            >
              Contact Us
            </h1>
            <p className="text-[#6b6560] text-[15px] text-center mb-12 leading-[1.7]">
              Questions, collaborations, or just want to connect — reach out.
            </p>

            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#8a8580] text-[11px] tracking-[0.2em] uppercase mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-neutral-200 px-4 py-3 text-[14px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-[#8a8580] text-[11px] tracking-[0.2em] uppercase mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full border border-neutral-200 px-4 py-3 text-[14px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors duration-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#8a8580] text-[11px] tracking-[0.2em] uppercase mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full border border-neutral-200 px-4 py-3 text-[14px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-[#8a8580] text-[11px] tracking-[0.2em] uppercase mb-2">
                  Message
                </label>
                <textarea
                  rows={6}
                  className="w-full border border-neutral-200 px-4 py-3 text-[14px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors duration-200 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#1a1a1a] text-white py-4 text-[13px] tracking-[0.15em] uppercase hover:bg-[#333] transition-colors duration-300"
              >
                Send Message
              </button>
            </form>

            <div className="mt-16 pt-10 border-t border-neutral-100 text-center">
              <p className="text-[#8a8580] text-[11px] tracking-[0.25em] uppercase mb-3">Email</p>
              <p className="text-[#1a1a1a] text-[14px]">hello@nynth.com</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
