import { createClient } from "@supabase/supabase-js";

// Server-side client (safe to use in async server components)
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export interface DBProduct {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  images: string[];
  sizes: string[];
  slug: string;
  in_stock: boolean;
  created_at: string;
}

export async function getProductsByCategory(category: string): Promise<DBProduct[]> {
  const supabase = getSupabase();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .eq("in_stock", true)
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getAllProducts(): Promise<DBProduct[]> {
  const supabase = getSupabase();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("in_stock", true)
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getProductBySlug(slug: string): Promise<DBProduct | null> {
  const supabase = getSupabase();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  return data ?? null;
}