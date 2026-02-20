// FILE: src/app/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already logged in, redirect appropriately
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) return;
      // Check if admin
      const { data } = await supabase
        .from("admins")
        .select("email")
        .eq("email", session.user.email ?? "")
        .maybeSingle();
      router.push(data ? "/admin" : "/");
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Top bar */}
      <div className="px-6 h-14 flex items-center justify-between border-b border-neutral-100">
        <Link href="/" className="text-[13px] tracking-[0.2em] uppercase text-[#1a1a1a] font-medium">
          NYNT
        </Link>
        <Link href="/" className="text-[11px] tracking-[0.15em] uppercase text-[#aaa] hover:text-[#1a1a1a] transition-colors">
          ← Back to Shop
        </Link>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-[380px]">

          {!sent ? (
            <>
              <h1 className="text-[#1a1a1a] text-[24px] font-light mb-2"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Sign in
              </h1>
              <p className="text-[#aaa] text-[13px] mb-10 leading-relaxed">
                Enter your email — we&apos;ll send you a magic link.
                No password needed.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  autoFocus
                  className="w-full border border-neutral-200 px-4 py-4 text-[16px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors bg-white"
                />

                {error && (
                  <p className="text-red-500 text-[13px]">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#1a1a1a] text-white py-4 text-[12px] tracking-[0.2em] uppercase hover:bg-[#333] transition-colors disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Magic Link"}
                </button>
              </form>

              <p className="text-[11px] text-[#ccc] mt-8 leading-relaxed">
                Admin access is by invitation only.
                If you&apos;re a customer, you don&apos;t need an account to browse or shop.
              </p>
            </>
          ) : (
            /* Sent state */
            <div className="text-center">
              <div className="w-12 h-12 border border-neutral-200 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5 text-[#1a1a1a]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </div>
              <h2 className="text-[#1a1a1a] text-[20px] font-light mb-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Check your inbox
              </h2>
              <p className="text-[#6b6560] text-[14px] leading-relaxed mb-8">
                We sent a magic link to <strong>{email}</strong>.
                Tap it to sign in — it expires in 1 hour.
              </p>
              <button
                onClick={() => { setSent(false); setEmail(""); }}
                className="text-[11px] tracking-[0.15em] uppercase text-[#aaa] hover:text-[#1a1a1a] transition-colors"
              >
                Try a different email
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}