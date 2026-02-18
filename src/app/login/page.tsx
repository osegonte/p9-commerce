"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      });
      if (error) {
        setError(error.message);
      } else {
        setMessage("Account created. You can now sign in.");
        setIsSignUp(false);
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        // Check if admin
        const { data: adminData } = await supabase
          .from("admins")
          .select("email")
          .eq("email", data.user?.email ?? "")
          .single();

        router.push(adminData ? "/admin" : "/");
      }
    }

    setLoading(false);
  };

  return (
    <>
      <Header />
      <section className="bg-white pt-24 pb-16 sm:pb-20 min-h-[70vh] flex justify-center">
        <div className="w-full max-w-[400px] px-8 mt-8">
          <h1 className="text-[#1a1a1a] font-semibold text-center mb-10" style={{ fontSize: "22px" }}>
            {isSignUp ? "Create Account" : "Sign In"}
          </h1>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {isSignUp && (
              <div>
                <label className="block text-[#8a8580] text-[11px] tracking-[0.2em] uppercase mb-2">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full border border-neutral-200 px-4 py-3 text-[14px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors duration-200"
                  placeholder="Full name" required />
              </div>
            )}
            <div>
              <label className="block text-[#8a8580] text-[11px] tracking-[0.2em] uppercase mb-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-neutral-200 px-4 py-3 text-[14px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors duration-200"
                placeholder="your@email.com" required />
            </div>
            <div>
              <label className="block text-[#8a8580] text-[11px] tracking-[0.2em] uppercase mb-2">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-neutral-200 px-4 py-3 text-[14px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors duration-200"
                placeholder="••••••••" required minLength={6} />
            </div>

            {error && <p className="text-red-500 text-[13px]">{error}</p>}
            {message && <p className="text-green-600 text-[13px]">{message}</p>}

            <button type="submit" disabled={loading}
              className="w-full bg-[#1a1a1a] text-white py-4 text-[13px] tracking-[0.15em] uppercase hover:bg-[#333] transition-colors duration-300 mt-2 disabled:opacity-50">
              {loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
            </button>
          </form>

          <p className="text-center text-[#6b6560] text-[13px] mt-8">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => { setIsSignUp(!isSignUp); setError(null); setMessage(null); }}
              className="text-[#1a1a1a] underline underline-offset-2">
              {isSignUp ? "Sign In" : "Create one"}
            </button>
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}