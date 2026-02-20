// FILE: src/app/auth/callback/route.ts
// Supabase redirects here after magic link click.
// Exchanges the code for a session, then routes:
//   - admins  → /admin
//   - everyone else → /  (homepage, no forced login)

import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.exchangeCodeForSession(code);

    if (session?.user?.email) {
      // Check if this user is an admin
      const { data } = await supabase
        .from("admins")
        .select("email")
        .eq("email", session.user.email)
        .maybeSingle();

      if (data) {
        // Admin → go to admin panel
        return NextResponse.redirect(new URL("/admin", requestUrl.origin));
      }
    }
  }

  // Everyone else → homepage
  return NextResponse.redirect(new URL("/", requestUrl.origin));
}