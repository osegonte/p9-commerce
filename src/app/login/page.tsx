"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <>
      <Header />
      <section className="bg-white pt-24 pb-16 sm:pb-20 min-h-[70vh] flex justify-center">
        <div className="w-full max-w-[400px] px-8 mt-8">
          <h1
            className="text-[#1a1a1a] font-semibold text-center mb-10"
            style={{ fontSize: "22px" }}
          >
            {isSignUp ? "Create Account" : "Sign In"}
          </h1>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {isSignUp && (
              <div>
                <label className="block text-[#8a8580] text-[11px] tracking-[0.2em] uppercase mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full border border-neutral-200 px-4 py-3 text-[14px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors duration-200"
                  placeholder="Full name"
                />
              </div>
            )}
            <div>
              <label className="block text-[#8a8580] text-[11px] tracking-[0.2em] uppercase mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-neutral-200 px-4 py-3 text-[14px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors duration-200"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-[#8a8580] text-[11px] tracking-[0.2em] uppercase mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full border border-neutral-200 px-4 py-3 text-[14px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors duration-200"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1a1a1a] text-white py-4 text-[13px] tracking-[0.15em] uppercase hover:bg-[#333] transition-colors duration-300 mt-2"
            >
              {isSignUp ? "Create Account" : "Sign In"}
            </button>
          </form>

          <p className="text-center text-[#6b6560] text-[13px] mt-8">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[#1a1a1a] underline underline-offset-2"
            >
              {isSignUp ? "Sign In" : "Create one"}
            </button>
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
