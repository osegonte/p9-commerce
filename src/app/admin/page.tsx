// FILE: src/app/admin/page.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

const CATEGORIES = ["Hoodies", "Tees", "Headwear", "Accessories", "Shoes", "New Arrivals"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const IMAGE_SLOTS = [
  { key: "front", label: "Front" },
  { key: "side",  label: "Side"  },
  { key: "back",  label: "Back"  },
] as const;
type SlotKey = typeof IMAGE_SLOTS[number]["key"];
type Tab = "products" | "admins";

interface Product {
  id: string; name: string; description: string; price: number;
  category: string; images: string[]; sizes: string[]; slug: string; in_stock: boolean;
}
interface Admin { id: string; email: string; created_by: string; created_at: string; }

const emptyForm = { name: "", description: "", price: "", category: "Hoodies", sizes: [] as string[], in_stock: true };
type SlotState = { file: File | null; preview: string | null; existingUrl: string | null };
const emptySlots = (): Record<SlotKey, SlotState> => ({
  front: { file: null, preview: null, existingUrl: null },
  side:  { file: null, preview: null, existingUrl: null },
  back:  { file: null, preview: null, existingUrl: null },
});

export default function AdminPage() {
  const router = useRouter();
  const fileRefs = useRef<Record<SlotKey, HTMLInputElement | null>>({ front: null, side: null, back: null });
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [currentEmail, setCurrentEmail] = useState("");
  const [tab, setTab] = useState<Tab>("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [slots, setSlots] = useState<Record<SlotKey, SlotState>>(emptySlots());
  const [productLoading, setProductLoading] = useState(false);
  const [productError, setProductError] = useState<string | null>(null);
  const [productSuccess, setProductSuccess] = useState<string | null>(null);
  const [formView, setFormView] = useState(false);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState<string | null>(null);
  const [adminSuccess, setAdminSuccess] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) { router.push("/login"); return; }
      const email = session.user.email ?? "";
      setCurrentEmail(email);
      const { data } = await supabase.from("admins").select("email").eq("email", email).maybeSingle();
      if (!data) { router.push("/"); return; }
      setAuthorized(true);
      setChecking(false);
      fetchProducts();
      fetchAdmins();
    });
  }, [router]);

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (data) setProducts(data);
  };
  const fetchAdmins = async () => {
    const { data } = await supabase.from("admins").select("*").order("created_at", { ascending: true });
    if (data) setAdmins(data);
  };
  const handleSlotChange = (slotKey: SlotKey, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSlots((prev) => ({ ...prev, [slotKey]: { file, preview: URL.createObjectURL(file), existingUrl: prev[slotKey].existingUrl } }));
  };
  const clearSlot = (slotKey: SlotKey) => {
    setSlots((prev) => ({ ...prev, [slotKey]: { file: null, preview: null, existingUrl: null } }));
    if (fileRefs.current[slotKey]) fileRefs.current[slotKey]!.value = "";
  };
  const slugify = (str: string) => str.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const handleSizeToggle = (size: string) => {
    setForm((prev) => ({ ...prev, sizes: prev.sizes.includes(size) ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size] }));
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProductLoading(true); setProductError(null); setProductSuccess(null);
    try {
      const imageUrls: string[] = [];
      for (const slot of IMAGE_SLOTS) {
        const state = slots[slot.key];
        if (state.file) {
          const ext = state.file.name.split(".").pop();
          const filename = `${Date.now()}-${slot.key}.${ext}`;
          const { error: uploadError } = await supabase.storage.from("products").upload(filename, state.file, { upsert: true });
          if (uploadError) throw uploadError;
          const { data: urlData } = supabase.storage.from("products").getPublicUrl(filename);
          imageUrls.push(urlData.publicUrl);
        } else if (state.existingUrl) {
          imageUrls.push(state.existingUrl);
        }
      }
      const payload = {
        name: form.name, description: form.description, price: parseFloat(form.price),
        category: form.category, sizes: form.sizes, slug: slugify(form.name),
        in_stock: form.in_stock, images: imageUrls,
      };
      if (editingId) {
        const { error } = await supabase.from("products").update(payload).eq("id", editingId);
        if (error) throw error;
        setProductSuccess("Product updated.");
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
        setProductSuccess("Product added.");
      }
      resetForm(); fetchProducts();
    } catch (err: unknown) {
      setProductError(err instanceof Error ? err.message : "Something went wrong.");
    }
    setProductLoading(false);
  };

  const resetForm = () => {
    setForm(emptyForm); setSlots(emptySlots()); setEditingId(null); setFormView(false);
    (Object.keys(fileRefs.current) as SlotKey[]).forEach((k) => { if (fileRefs.current[k]) fileRefs.current[k]!.value = ""; });
  };

  const handleEdit = (product: Product) => {
    setForm({ name: product.name, description: product.description || "", price: String(product.price), category: product.category, sizes: product.sizes || [], in_stock: product.in_stock });
    const newSlots = emptySlots();
    IMAGE_SLOTS.forEach((slot, i) => { if (product.images?.[i]) newSlots[slot.key] = { file: null, preview: product.images[i], existingUrl: product.images[i] }; });
    setSlots(newSlots); setEditingId(product.id); setFormView(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault(); setAdminLoading(true); setAdminError(null); setAdminSuccess(null);
    const { error } = await supabase.from("admins").insert({ email: newAdminEmail.trim().toLowerCase(), created_by: currentEmail });
    if (error) { setAdminError(error.message); }
    else { setAdminSuccess(`${newAdminEmail} is now an admin.`); setNewAdminEmail(""); fetchAdmins(); }
    setAdminLoading(false);
  };

  const handleRemoveAdmin = async (id: string, email: string) => {
    if (email === currentEmail) { alert("You can't remove yourself."); return; }
    if (!confirm(`Remove ${email} as admin?`)) return;
    await supabase.from("admins").delete().eq("id", id); fetchAdmins();
  };

  const handleSignOut = async () => { await supabase.auth.signOut(); router.push("/"); };

  if (checking) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <p className="text-[#aaa] text-[13px] tracking-wide">Checking access...</p>
    </div>
  );
  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-[#f8f8f8]">

      {/* ── Sticky top bar ── */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-20">
        <div className="px-4 sm:px-6 h-14 flex items-center justify-between">
          <span className="text-[13px] tracking-[0.2em] uppercase text-[#1a1a1a] font-medium">NYNTH Admin</span>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-6">
            <button onClick={() => { setTab("products"); resetForm(); }}
              className={`text-[12px] tracking-[0.1em] uppercase transition-colors ${tab === "products" ? "text-[#1a1a1a]" : "text-[#aaa] hover:text-[#1a1a1a]"}`}>
              Products
            </button>
            <button onClick={() => setTab("admins")}
              className={`text-[12px] tracking-[0.1em] uppercase transition-colors ${tab === "admins" ? "text-[#1a1a1a]" : "text-[#aaa] hover:text-[#1a1a1a]"}`}>
              Admins
            </button>
            <a href="/" target="_blank" className="text-[11px] text-[#aaa] hover:text-[#1a1a1a] transition-colors">View Site ↗</a>
            <button onClick={handleSignOut} className="text-[11px] text-[#aaa] hover:text-[#1a1a1a] transition-colors uppercase">Sign Out</button>
          </div>

          {/* Mobile hamburger */}
          <button className="sm:hidden p-2 -mr-1 text-[#6b6560]" onClick={() => setMenuOpen(!menuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="sm:hidden bg-white border-t border-neutral-100 px-4 py-2 flex flex-col">
            <button onClick={() => { setTab("products"); resetForm(); setMenuOpen(false); }}
              className={`text-left text-[14px] uppercase py-3.5 border-b border-neutral-50 ${tab === "products" ? "text-[#1a1a1a]" : "text-[#888]"}`}>
              Products
            </button>
            <button onClick={() => { setTab("admins"); setMenuOpen(false); }}
              className={`text-left text-[14px] uppercase py-3.5 border-b border-neutral-50 ${tab === "admins" ? "text-[#1a1a1a]" : "text-[#888]"}`}>
              Admins
            </button>
            <a href="/" target="_blank" className="text-[14px] text-[#888] py-3.5 border-b border-neutral-50">View Site ↗</a>
            <button onClick={handleSignOut} className="text-left text-[14px] text-[#888] uppercase py-3.5 border-b border-neutral-50">Sign Out</button>
            <p className="text-[11px] text-[#ccc] py-3">{currentEmail}</p>
          </div>
        )}
      </div>

      <div className="px-4 sm:px-6 py-6 max-w-5xl mx-auto">

        {/* ── PRODUCTS TAB ── */}
        {tab === "products" && (
          <>
            {/* Form view */}
            {formView && (
              <div className="bg-white border border-neutral-200 p-5 sm:p-8 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[15px] font-medium text-[#1a1a1a]">
                    {editingId ? "Edit Product" : "New Product"}
                  </h2>
                  <button onClick={resetForm} className="p-2 text-[#aaa] hover:text-[#1a1a1a] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleProductSubmit} className="space-y-6">

                  {/* Image slots */}
                  <div>
                    <label className="block text-[11px] tracking-[0.2em] uppercase text-[#8a8580] mb-3">Product Images</label>
                    <div className="grid grid-cols-3 gap-3">
                      {IMAGE_SLOTS.map((slot) => {
                        const state = slots[slot.key];
                        const hasImage = state.preview !== null;
                        return (
                          <div key={slot.key} className="flex flex-col gap-1.5">
                            <span className="text-[10px] tracking-[0.15em] uppercase text-[#aaa]">{slot.label}</span>
                            <div
                              onClick={() => !hasImage && fileRefs.current[slot.key]?.click()}
                              className="relative border border-dashed border-neutral-300 overflow-hidden bg-[#fafafa]"
                              style={{ aspectRatio: "3/4" }}
                            >
                              {hasImage ? (
                                <>
                                  <Image src={state.preview!} alt={slot.label} fill className="object-cover object-center" unoptimized />
                                  <button type="button"
                                    onClick={(e) => { e.stopPropagation(); clearSlot(slot.key); }}
                                    className="absolute top-1.5 right-1.5 w-7 h-7 bg-black/70 text-white text-[12px] flex items-center justify-center z-10">
                                    ✕
                                  </button>
                                  <div onClick={() => fileRefs.current[slot.key]?.click()} className="absolute inset-0 cursor-pointer z-0" />
                                </>
                              ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#ccc] cursor-pointer">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                  </svg>
                                  <span className="text-[10px]">Tap to add</span>
                                </div>
                              )}
                            </div>
                            {/* capture="environment" opens camera on mobile */}
                            <input ref={(el) => { fileRefs.current[slot.key] = el; }}
                              type="file" accept="image/*"
                              className="hidden"
                              onChange={(e) => handleSlotChange(slot.key, e)} />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-[11px] tracking-[0.2em] uppercase text-[#8a8580] mb-2">Product Name</label>
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-neutral-200 px-4 py-4 text-[16px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors bg-white"
                      placeholder="e.g. NYNT Classic Hoodie" required />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-[11px] tracking-[0.2em] uppercase text-[#8a8580] mb-2">Price (₦)</label>
                    <input type="number" inputMode="numeric" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className="w-full border border-neutral-200 px-4 py-4 text-[16px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors bg-white"
                      placeholder="25000" step="1" min="0" required />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-[11px] tracking-[0.2em] uppercase text-[#8a8580] mb-2">Category</label>
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full border border-neutral-200 px-4 py-4 text-[16px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors bg-white">
                      {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-[11px] tracking-[0.2em] uppercase text-[#8a8580] mb-2">Description</label>
                    <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                      rows={4} className="w-full border border-neutral-200 px-4 py-4 text-[16px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors bg-white resize-none"
                      placeholder="Product description..." />
                  </div>

                  {/* Sizes */}
                  <div>
                    <label className="block text-[11px] tracking-[0.2em] uppercase text-[#8a8580] mb-3">Sizes</label>
                    <div className="flex gap-2 flex-wrap">
                      {SIZES.map((size) => (
                        <button key={size} type="button" onClick={() => handleSizeToggle(size)}
                          className={`w-12 h-12 border text-[13px] transition-colors ${form.sizes.includes(size) ? "border-[#1a1a1a] bg-[#1a1a1a] text-white" : "border-neutral-200 text-[#6b6560]"}`}>
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* In stock toggle */}
                  <div className="flex items-center gap-3 py-1">
                    <button type="button" onClick={() => setForm({ ...form, in_stock: !form.in_stock })}
                      className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${form.in_stock ? "bg-[#1a1a1a]" : "bg-neutral-300"}`}>
                      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${form.in_stock ? "translate-x-7" : "translate-x-1"}`} />
                    </button>
                    <span className="text-[14px] text-[#6b6560]">In stock</span>
                  </div>

                  {productError && <p className="text-red-500 text-[13px]">{productError}</p>}
                  {productSuccess && <p className="text-green-600 text-[13px]">{productSuccess}</p>}

                  <button type="submit" disabled={productLoading}
                    className="w-full bg-[#1a1a1a] text-white py-4 text-[12px] tracking-[0.15em] uppercase hover:bg-[#333] transition-colors disabled:opacity-50">
                    {productLoading ? "Saving..." : editingId ? "Update Product" : "Add Product"}
                  </button>
                </form>
              </div>
            )}

            {/* Product list */}
            {!formView && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-[15px] font-medium text-[#1a1a1a]">
                    Products <span className="text-[#aaa] font-normal text-[13px]">({products.length})</span>
                  </h2>
                  <button onClick={() => { setFormView(true); resetForm(); setEditingId(null); }}
                    className="bg-[#1a1a1a] text-white px-5 py-3 text-[11px] tracking-[0.15em] uppercase hover:bg-[#333] transition-colors">
                    + Add Product
                  </button>
                </div>

                {products.length === 0 ? (
                  <div className="bg-white border border-neutral-200 py-16 text-center">
                    <p className="text-[#aaa] text-[13px] mb-5">No products yet.</p>
                    <button onClick={() => setFormView(true)}
                      className="bg-[#1a1a1a] text-white px-8 py-3.5 text-[12px] tracking-[0.15em] uppercase hover:bg-[#333] transition-colors">
                      Add First Product
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {products.map((product) => (
                      <div key={product.id} className="bg-white border border-neutral-100 p-4 flex items-center gap-4">
                        <div className="relative w-12 h-16 bg-neutral-100 overflow-hidden shrink-0">
                          {product.images?.[0]
                            ? <Image src={product.images[0]} alt={product.name} fill className="object-cover object-center" unoptimized />
                            : <div className="w-full h-full bg-neutral-200" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] text-[#1a1a1a] font-light truncate">{product.name}</p>
                          <p className="text-[11px] text-[#aaa] mt-0.5">{product.category}</p>
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="text-[13px] text-[#1a1a1a]">₦{Number(product.price).toLocaleString()}</span>
                            <span className={`text-[10px] tracking-[0.1em] uppercase ${product.in_stock ? "text-green-600" : "text-red-400"}`}>
                              {product.in_stock ? "In Stock" : "Out"}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button onClick={() => handleEdit(product)}
                            className="w-10 h-10 flex items-center justify-center text-[#aaa] hover:text-[#1a1a1a] border border-neutral-100 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
                            </svg>
                          </button>
                          <button onClick={() => handleDelete(product.id)}
                            className="w-10 h-10 flex items-center justify-center text-[#aaa] hover:text-red-500 border border-neutral-100 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* ── ADMINS TAB ── */}
        {tab === "admins" && (
          <div>
            <h2 className="text-[15px] font-medium text-[#1a1a1a] mb-5">Manage Admins</h2>
            <div className="bg-white border border-neutral-200 p-5 mb-4">
              <p className="text-[11px] tracking-[0.2em] uppercase text-[#8a8580] mb-3">Add New Admin</p>
              <form onSubmit={handleAddAdmin} className="flex flex-col gap-3">
                <input type="email" inputMode="email" value={newAdminEmail} onChange={(e) => setNewAdminEmail(e.target.value)}
                  className="w-full border border-neutral-200 px-4 py-4 text-[16px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors"
                  placeholder="email@example.com" required />
                <button type="submit" disabled={adminLoading}
                  className="w-full bg-[#1a1a1a] text-white py-4 text-[12px] tracking-[0.15em] uppercase hover:bg-[#333] transition-colors disabled:opacity-50">
                  {adminLoading ? "Adding..." : "Add Admin"}
                </button>
              </form>
              {adminError && <p className="text-red-500 text-[13px] mt-3">{adminError}</p>}
              {adminSuccess && <p className="text-green-600 text-[13px] mt-3">{adminSuccess}</p>}
            </div>
            <div className="space-y-2">
              {admins.map((admin) => (
                <div key={admin.id} className="bg-white border border-neutral-100 px-4 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-[14px] text-[#1a1a1a] font-light">{admin.email}</p>
                    <p className="text-[11px] text-[#aaa] mt-0.5">
                      {admin.email === currentEmail ? "You" : `Added by ${admin.created_by}`}
                    </p>
                  </div>
                  {admin.email !== currentEmail && (
                    <button onClick={() => handleRemoveAdmin(admin.id, admin.email)}
                      className="text-[11px] text-[#aaa] hover:text-red-500 transition-colors uppercase tracking-wide py-2 px-3 border border-neutral-100">
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}