"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

const CATEGORIES = ["Hoodies", "Tees", "Headwear", "Accessories", "Shoes", "New Arrivals"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
type Tab = "products" | "admins";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  sizes: string[];
  slug: string;
  in_stock: boolean;
}

interface Admin {
  id: string;
  email: string;
  created_by: string;
  created_at: string;
}

const emptyForm = {
  name: "",
  description: "",
  price: "",
  category: "Hoodies",
  sizes: [] as string[],
  in_stock: true,
};

export default function AdminPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [currentEmail, setCurrentEmail] = useState("");
  const [tab, setTab] = useState<Tab>("products");

  // Products state
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [productLoading, setProductLoading] = useState(false);
  const [productError, setProductError] = useState<string | null>(null);
  const [productSuccess, setProductSuccess] = useState<string | null>(null);
  const [formView, setFormView] = useState(false);

  // Admins state
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState<string | null>(null);
  const [adminSuccess, setAdminSuccess] = useState<string | null>(null);

  // Auth + admin check
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) { router.push("/login"); return; }

      const email = session.user.email ?? "";
      setCurrentEmail(email);

      // Check if this email is in the admins table
      const { data } = await supabase
        .from("admins")
        .select("email")
        .eq("email", email)
        .maybeSingle();

      if (!data) {
        // Not an admin — kick back to home
        router.push("/");
        return;
      }

      setAuthorized(true);
      setChecking(false);
      fetchProducts();
      fetchAdmins();
    });
  }, [router]);

  const fetchProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setProducts(data);
  };

  const fetchAdmins = async () => {
    const { data } = await supabase
      .from("admins")
      .select("*")
      .order("created_at", { ascending: true });
    if (data) setAdmins(data);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const slugify = (str: string) =>
    str.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const handleSizeToggle = (size: string) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProductLoading(true);
    setProductError(null);
    setProductSuccess(null);

    try {
      let imageUrl: string | null = null;

      if (imageFile) {
        const ext = imageFile.name.split(".").pop();
        const filename = `${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("products")
          .upload(filename, imageFile, { upsert: true });
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from("products").getPublicUrl(filename);
        imageUrl = urlData.publicUrl;
      }

      const slug = slugify(form.name);
      const payload = {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        category: form.category,
        sizes: form.sizes,
        slug,
        in_stock: form.in_stock,
        ...(imageUrl && { images: [imageUrl] }),
      };

      if (editingId) {
        const { error } = await supabase.from("products").update(payload).eq("id", editingId);
        if (error) throw error;
        setProductSuccess("Product updated.");
      } else {
        const { error } = await supabase.from("products").insert({ ...payload, images: imageUrl ? [imageUrl] : [] });
        if (error) throw error;
        setProductSuccess("Product added.");
      }

      setForm(emptyForm);
      setImageFile(null);
      setImagePreview(null);
      setEditingId(null);
      setFormView(false);
      fetchProducts();
    } catch (err: unknown) {
      setProductError(err instanceof Error ? err.message : "Something went wrong.");
    }
    setProductLoading(false);
  };

  const handleEdit = (product: Product) => {
    setForm({
      name: product.name,
      description: product.description || "",
      price: String(product.price),
      category: product.category,
      sizes: product.sizes || [],
      in_stock: product.in_stock,
    });
    setImagePreview(product.images?.[0] || null);
    setEditingId(product.id);
    setFormView(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoading(true);
    setAdminError(null);
    setAdminSuccess(null);
    const { error } = await supabase.from("admins").insert({
      email: newAdminEmail.trim().toLowerCase(),
      created_by: currentEmail,
    });
    if (error) {
      setAdminError(error.message);
    } else {
      setAdminSuccess(`${newAdminEmail} is now an admin.`);
      setNewAdminEmail("");
      fetchAdmins();
    }
    setAdminLoading(false);
  };

  const handleRemoveAdmin = async (id: string, email: string) => {
    if (email === currentEmail) { alert("You can't remove yourself."); return; }
    if (!confirm(`Remove ${email} as admin?`)) return;
    await supabase.from("admins").delete().eq("id", id);
    fetchAdmins();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (checking) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <p className="text-[#aaa] text-[13px] tracking-wide">Checking access...</p>
    </div>
  );
  if (!authorized) return null;

  return (
    <div className="min-h-screen bg-[#f8f8f8]">

      {/* Top bar */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-[13px] tracking-[0.2em] uppercase text-[#1a1a1a] font-medium">
              NYNTH Admin
            </span>
            <button
              onClick={() => { setTab("products"); setFormView(false); setEditingId(null); setForm(emptyForm); setImagePreview(null); }}
              className={`text-[12px] tracking-[0.1em] uppercase transition-colors duration-200 ${tab === "products" ? "text-[#1a1a1a]" : "text-[#aaa] hover:text-[#1a1a1a]"}`}
            >
              Products
            </button>
            <button
              onClick={() => setTab("admins")}
              className={`text-[12px] tracking-[0.1em] uppercase transition-colors duration-200 ${tab === "admins" ? "text-[#1a1a1a]" : "text-[#aaa] hover:text-[#1a1a1a]"}`}
            >
              Admins
            </button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-[#aaa] hidden sm:block">{currentEmail}</span>
            <a href="/" target="_blank" className="text-[11px] text-[#aaa] hover:text-[#1a1a1a] transition-colors duration-200 tracking-wide">
              View Site ↗
            </a>
            <button onClick={handleSignOut} className="text-[11px] text-[#aaa] hover:text-[#1a1a1a] transition-colors duration-200 tracking-wide uppercase">
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* ── PRODUCTS TAB ── */}
        {tab === "products" && (
          <>
            {/* Add / Edit Form */}
            {formView && (
              <div className="bg-white border border-neutral-200 p-8 mb-10">
                <h2 className="text-[16px] font-medium text-[#1a1a1a] mb-8 tracking-wide">
                  {editingId ? "Edit Product" : "New Product"}
                </h2>
                <form onSubmit={handleProductSubmit} className="space-y-6">

                  {/* Image upload */}
                  <div>
                    <label className="block text-[11px] tracking-[0.2em] uppercase text-[#8a8580] mb-3">Product Image</label>
                    <div
                      onClick={() => fileRef.current?.click()}
                      className="border border-dashed border-neutral-300 rounded cursor-pointer hover:border-neutral-500 transition-colors duration-200 overflow-hidden"
                      style={{ aspectRatio: "3/4", maxWidth: "200px" }}
                    >
                      {imagePreview ? (
                        <div className="relative w-full h-full">
                          <Image src={imagePreview} alt="Preview" fill className="object-cover" unoptimized />
                        </div>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#aaa]">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                          </svg>
                          <span className="text-[11px] tracking-wide">Upload image</span>
                        </div>
                      )}
                    </div>
                    <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </div>

                  {/* Name + Price */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] tracking-[0.2em] uppercase text-[#8a8580] mb-2">Product Name</label>
                      <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-neutral-200 px-4 py-3 text-[14px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors duration-200 bg-white"
                        placeholder="e.g. NYNT Classic Hoodie" required />
                    </div>
                    <div>
                      <label className="block text-[11px] tracking-[0.2em] uppercase text-[#8a8580] mb-2">Price (₦)</label>
                      <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                        className="w-full border border-neutral-200 px-4 py-3 text-[14px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors duration-200 bg-white"
                        placeholder="89.00" step="0.01" min="0" required />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-[11px] tracking-[0.2em] uppercase text-[#8a8580] mb-2">Category</label>
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full border border-neutral-200 px-4 py-3 text-[14px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors duration-200 bg-white appearance-none">
                      {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-[11px] tracking-[0.2em] uppercase text-[#8a8580] mb-2">Description</label>
                    <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                      rows={3} className="w-full border border-neutral-200 px-4 py-3 text-[14px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors duration-200 bg-white resize-none"
                      placeholder="Product description..." />
                  </div>

                  {/* Sizes */}
                  <div>
                    <label className="block text-[11px] tracking-[0.2em] uppercase text-[#8a8580] mb-3">Sizes</label>
                    <div className="flex gap-2 flex-wrap">
                      {SIZES.map((size) => (
                        <button key={size} type="button" onClick={() => handleSizeToggle(size)}
                          className={`w-12 h-12 border text-[13px] transition-colors duration-200 ${form.sizes.includes(size) ? "border-[#1a1a1a] bg-[#1a1a1a] text-white" : "border-neutral-200 text-[#6b6560] hover:border-neutral-400"}`}>
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* In stock */}
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => setForm({ ...form, in_stock: !form.in_stock })}
                      className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${form.in_stock ? "bg-[#1a1a1a]" : "bg-neutral-300"}`}>
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${form.in_stock ? "translate-x-5" : "translate-x-0.5"}`} />
                    </button>
                    <span className="text-[13px] text-[#6b6560]">In stock</span>
                  </div>

                  {productError && <p className="text-red-500 text-[13px]">{productError}</p>}
                  {productSuccess && <p className="text-green-600 text-[13px]">{productSuccess}</p>}

                  <div className="flex gap-3 pt-2">
                    <button type="submit" disabled={productLoading}
                      className="bg-[#1a1a1a] text-white px-8 py-3 text-[12px] tracking-[0.15em] uppercase hover:bg-[#333] transition-colors duration-300 disabled:opacity-50">
                      {productLoading ? "Saving..." : editingId ? "Update Product" : "Add Product"}
                    </button>
                    <button type="button" onClick={() => { setFormView(false); setEditingId(null); setForm(emptyForm); setImagePreview(null); }}
                      className="border border-neutral-200 text-[#6b6560] px-8 py-3 text-[12px] tracking-[0.15em] uppercase hover:border-neutral-400 transition-colors duration-300">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Product list */}
            {!formView && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[16px] font-medium text-[#1a1a1a] tracking-wide">
                    Products <span className="text-[#aaa] font-normal text-[14px]">({products.length})</span>
                  </h2>
                  <button onClick={() => { setFormView(true); setEditingId(null); setForm(emptyForm); setImagePreview(null); }}
                    className="bg-[#1a1a1a] text-white px-6 py-2.5 text-[11px] tracking-[0.15em] uppercase hover:bg-[#333] transition-colors duration-300">
                    + Add Product
                  </button>
                </div>

                {products.length === 0 ? (
                  <div className="bg-white border border-neutral-200 py-20 text-center">
                    <p className="text-[#aaa] text-[13px] tracking-wide mb-4">No products yet.</p>
                    <button onClick={() => setFormView(true)}
                      className="bg-[#1a1a1a] text-white px-8 py-3 text-[12px] tracking-[0.15em] uppercase hover:bg-[#333] transition-colors duration-300">
                      Add First Product
                    </button>
                  </div>
                ) : (
                  <div className="space-y-[1px] bg-neutral-200">
                    <div className="bg-[#f8f8f8] grid grid-cols-12 gap-4 px-6 py-3">
                      <div className="col-span-1" />
                      <div className="col-span-4 text-[10px] tracking-[0.2em] uppercase text-[#aaa]">Name</div>
                      <div className="col-span-2 text-[10px] tracking-[0.2em] uppercase text-[#aaa]">Category</div>
                      <div className="col-span-2 text-[10px] tracking-[0.2em] uppercase text-[#aaa]">Price</div>
                      <div className="col-span-2 text-[10px] tracking-[0.2em] uppercase text-[#aaa]">Stock</div>
                      <div className="col-span-1" />
                    </div>
                    {products.map((product) => (
                      <div key={product.id} className="bg-white grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-neutral-50 transition-colors duration-150">
                        <div className="col-span-1">
                          <div className="relative w-10 h-12 bg-neutral-100 overflow-hidden">
                            {product.images?.[0] ? (
                              <Image src={product.images[0]} alt={product.name} fill className="object-cover" unoptimized />
                            ) : (
                              <div className="w-full h-full bg-neutral-200" />
                            )}
                          </div>
                        </div>
                        <div className="col-span-4">
                          <p className="text-[14px] text-[#1a1a1a] font-light">{product.name}</p>
                          <p className="text-[11px] text-[#aaa] mt-0.5">{product.slug}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="text-[11px] tracking-[0.1em] uppercase text-[#6b6560]">{product.category}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-[14px] text-[#1a1a1a]">₦{Number(product.price).toFixed(2)}</span>
                        </div>
                        <div className="col-span-2">
                          <span className={`text-[11px] tracking-[0.1em] uppercase ${product.in_stock ? "text-green-600" : "text-red-400"}`}>
                            {product.in_stock ? "In Stock" : "Out of Stock"}
                          </span>
                        </div>
                        <div className="col-span-1 flex items-center justify-end gap-3">
                          <button onClick={() => handleEdit(product)} className="text-[#aaa] hover:text-[#1a1a1a] transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
                            </svg>
                          </button>
                          <button onClick={() => handleDelete(product.id)} className="text-[#aaa] hover:text-red-500 transition-colors duration-200">
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
          <div className="max-w-xl">
            <h2 className="text-[16px] font-medium text-[#1a1a1a] mb-8 tracking-wide">Manage Admins</h2>

            {/* Add admin form */}
            <div className="bg-white border border-neutral-200 p-6 mb-6">
              <p className="text-[11px] tracking-[0.2em] uppercase text-[#8a8580] mb-4">Add New Admin</p>
              <form onSubmit={handleAddAdmin} className="flex gap-3">
                <input
                  type="email"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  className="flex-1 border border-neutral-200 px-4 py-3 text-[14px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a] transition-colors duration-200"
                  placeholder="email@example.com"
                  required
                />
                <button type="submit" disabled={adminLoading}
                  className="bg-[#1a1a1a] text-white px-6 py-3 text-[12px] tracking-[0.15em] uppercase hover:bg-[#333] transition-colors duration-300 disabled:opacity-50 shrink-0">
                  {adminLoading ? "..." : "Add"}
                </button>
              </form>
              {adminError && <p className="text-red-500 text-[13px] mt-3">{adminError}</p>}
              {adminSuccess && <p className="text-green-600 text-[13px] mt-3">{adminSuccess}</p>}
            </div>

            {/* Admin list */}
            <div className="space-y-[1px] bg-neutral-200">
              {admins.map((admin) => (
                <div key={admin.id} className="bg-white px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-[14px] text-[#1a1a1a] font-light">{admin.email}</p>
                    <p className="text-[11px] text-[#aaa] mt-0.5">
                      {admin.email === currentEmail ? "You" : `Added by ${admin.created_by}`}
                    </p>
                  </div>
                  {admin.email !== currentEmail && (
                    <button onClick={() => handleRemoveAdmin(admin.id, admin.email)}
                      className="text-[#aaa] hover:text-red-500 transition-colors duration-200 text-[11px] tracking-[0.1em] uppercase">
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