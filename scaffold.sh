#!/bin/bash

# ============================================
# NYNT — Scaffold all remaining pages
# Run from project root: bash scaffold.sh
# ============================================

# ── Shared ProductCard component ──
mkdir -p src/components
cat > src/components/ProductCard.tsx << 'EOF'
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  slug: string;
}

export default function ProductCard({ name, price, image, slug }: ProductCardProps) {
  return (
    <Link href={`/product/${slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 mb-3">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      <p className="text-[#1a1a1a] text-[14px]">{name}</p>
      <p className="text-[#6b6560] text-[13px] mt-1">{price}</p>
    </Link>
  );
}
EOF

# ── Shared ProductGrid component ──
cat > src/components/ProductGrid.tsx << 'EOF'
import ProductCard from "@/components/ProductCard";

interface Product {
  name: string;
  price: string;
  image: string;
  slug: string;
}

interface ProductGridProps {
  title: string;
  products: Product[];
}

const placeholderProducts: Product[] = [
  { name: "Product One", price: "€89.00", image: "/placeholder-product.jpg", slug: "product-one" },
  { name: "Product Two", price: "€109.00", image: "/placeholder-product.jpg", slug: "product-two" },
  { name: "Product Three", price: "€69.00", image: "/placeholder-product.jpg", slug: "product-three" },
  { name: "Product Four", price: "€129.00", image: "/placeholder-product.jpg", slug: "product-four" },
  { name: "Product Five", price: "€95.00", image: "/placeholder-product.jpg", slug: "product-five" },
  { name: "Product Six", price: "€79.00", image: "/placeholder-product.jpg", slug: "product-six" },
];

export default function ProductGrid({ title, products }: ProductGridProps) {
  const items = products.length > 0 ? products : placeholderProducts;

  return (
    <>
      <section className="bg-white pt-24 pb-16 sm:pb-20">
        <div className="mx-10 sm:mx-14 lg:mx-24 xl:mx-28">
          <h1
            className="text-[#1a1a1a] font-semibold text-center mb-12 sm:mb-16"
            style={{ fontSize: "22px" }}
          >
            {title}
          </h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
            {items.map((product) => (
              <ProductCard key={product.slug} {...product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
EOF

# ── Placeholder product image ──
convert -size 600x800 xc:'#e8e8e8' public/placeholder-product.jpg 2>/dev/null || echo "No ImageMagick — add public/placeholder-product.jpg manually"

# ── Shop category pages ──
declare -A categories
categories[new-arrivals]="New Arrivals"
categories[hoodies]="Hoodies"
categories[tees]="Tees"
categories[headwear]="Headwear"
categories[shoes]="Shoes"
categories[accessories]="Accessories"

for slug in "${!categories[@]}"; do
  title="${categories[$slug]}"
  mkdir -p "src/app/$slug"
  cat > "src/app/$slug/page.tsx" << EOF
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/sections/Footer";

export default function ${title// /}Page() {
  return (
    <>
      <Header />
      <ProductGrid title="${title}" products={[]} />
      <Footer />
    </>
  );
}
EOF
done

# ── Product detail page ──
mkdir -p src/app/product/\[slug\]
cat > 'src/app/product/[slug]/page.tsx' << 'EOF'
"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";

export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const sizes = ["S", "M", "L", "XL", "XXL"];

  return (
    <>
      <Header />
      <section className="bg-white pt-24 pb-16 sm:pb-20">
        <div className="mx-10 sm:mx-14 lg:mx-24 xl:mx-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

            {/* Images */}
            <div className="grid grid-cols-2 gap-2">
              <div className="relative aspect-[3/4] bg-neutral-100 col-span-2">
                <Image
                  src="/placeholder-product.jpg"
                  alt="Product"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] bg-neutral-100">
                <Image
                  src="/placeholder-product.jpg"
                  alt="Product"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[3/4] bg-neutral-100">
                <Image
                  src="/placeholder-product.jpg"
                  alt="Product"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Details */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <p className="text-[#8a8580] text-[11px] tracking-[0.25em] uppercase mb-3">
                Hoodies
              </p>
              <h1 className="text-[#1a1a1a] text-2xl sm:text-3xl font-semibold mb-2">
                Product Name
              </h1>
              <p className="text-[#1a1a1a] text-lg mb-8">€129.00</p>

              <p className="text-[#8a8580] text-[11px] tracking-[0.2em] uppercase mb-3">
                Size
              </p>
              <div className="flex gap-2 mb-8">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border text-[13px] transition-colors duration-200 ${
                      selectedSize === size
                        ? "border-[#1a1a1a] text-[#1a1a1a]"
                        : "border-neutral-200 text-[#6b6560] hover:border-neutral-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <button className="w-full bg-[#1a1a1a] text-white py-4 text-[13px] tracking-[0.15em] uppercase hover:bg-[#333] transition-colors duration-300 mb-4">
                Add to Cart
              </button>

              <div className="mt-10 border-t border-neutral-100 pt-8">
                <p className="text-[#1a1a1a] text-[14px] font-semibold mb-3">Details</p>
                <p className="text-[#6b6560] text-[14px] leading-[1.8] font-light">
                  Premium quality streetwear crafted with attention to detail. Built to last, designed to stand out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
EOF

# ── Cart page ──
mkdir -p src/app/cart
cat > src/app/cart/page.tsx << 'EOF'
"use client";

import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";
import Link from "next/link";

export default function CartPage() {
  const cartEmpty = true; // placeholder — will be dynamic later

  return (
    <>
      <Header />
      <section className="bg-white pt-24 pb-16 sm:pb-20 min-h-[70vh]">
        <div className="mx-10 sm:mx-14 lg:mx-24 xl:mx-28">
          <h1
            className="text-[#1a1a1a] font-semibold text-center mb-12"
            style={{ fontSize: "22px" }}
          >
            Your Bag
          </h1>

          {cartEmpty ? (
            <div className="text-center py-20">
              <p className="text-[#6b6560] text-[15px] mb-8">Your bag is empty.</p>
              <Link
                href="/new-arrivals"
                className="inline-block bg-[#1a1a1a] text-white px-10 py-4 text-[13px] tracking-[0.15em] uppercase hover:bg-[#333] transition-colors duration-300"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart items — left */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex gap-6 py-6 border-b border-neutral-100">
                  <div className="w-24 h-32 bg-neutral-100 shrink-0" />
                  <div className="flex-1">
                    <p className="text-[#1a1a1a] text-[14px] font-semibold">Product Name</p>
                    <p className="text-[#6b6560] text-[13px] mt-1">Size: M</p>
                    <p className="text-[#1a1a1a] text-[14px] mt-2">€129.00</p>
                  </div>
                  <button className="text-[#6b6560] text-[12px] uppercase tracking-[0.1em] hover:text-[#1a1a1a] self-start">
                    Remove
                  </button>
                </div>
              </div>

              {/* Summary — right */}
              <div className="lg:sticky lg:top-24 lg:self-start bg-neutral-50 p-8">
                <p className="text-[#1a1a1a] text-[14px] font-semibold mb-6">Order Summary</p>
                <div className="flex justify-between text-[14px] text-[#6b6560] mb-3">
                  <span>Subtotal</span>
                  <span>€129.00</span>
                </div>
                <div className="flex justify-between text-[14px] text-[#6b6560] mb-6">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="h-[0.5px] bg-neutral-200 mb-6" />
                <div className="flex justify-between text-[15px] text-[#1a1a1a] font-semibold mb-8">
                  <span>Total</span>
                  <span>€129.00</span>
                </div>
                <button className="w-full bg-[#1a1a1a] text-white py-4 text-[13px] tracking-[0.15em] uppercase hover:bg-[#333] transition-colors duration-300">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
EOF

# ── Login page ──
mkdir -p src/app/login
cat > src/app/login/page.tsx << 'EOF'
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
EOF

# ── Contact page ──
mkdir -p src/app/contact
cat > src/app/contact/page.tsx << 'EOF'
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
EOF

# ── Full lookbook page ──
mkdir -p src/app/lookbook
cat > src/app/lookbook/page.tsx << 'EOF'
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";

const images = [
  "/lookbook/look-01.jpg",
  "/lookbook/look-02.jpg",
  "/lookbook/look-03.jpg",
  "/lookbook/look-04.jpg",
  "/lookbook/look-05.jpg",
];

export default function LookbookPage() {
  return (
    <>
      <Header />
      <section className="bg-white pt-24 pb-16 sm:pb-20">
        <div className="mx-10 sm:mx-14 lg:mx-24 xl:mx-28">
          <h1
            className="text-[#1a1a1a] font-semibold text-center mb-12 sm:mb-16"
            style={{ fontSize: "22px" }}
          >
            Lookbook
          </h1>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
            {images.map((src, i) => (
              <div key={i} className="relative break-inside-avoid overflow-hidden bg-neutral-100">
                <Image
                  src={src}
                  alt={`Lookbook ${i + 1}`}
                  width={800}
                  height={1000}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
EOF

echo ""
echo "✅ All pages scaffolded:"
echo "   /new-arrivals"
echo "   /hoodies"
echo "   /tees"
echo "   /headwear"
echo "   /shoes"
echo "   /accessories"
echo "   /product/[slug]"
echo "   /cart"
echo "   /login"
echo "   /contact"
echo "   /lookbook"
echo ""
echo "📂 Images needed:"
echo "   public/placeholder-product.jpg (created if ImageMagick available)"
echo "   public/lookbook/look-01 through 05.jpg (already created earlier)"
echo "   public/categories/headwear.jpg, tees.jpg, hoodies.jpg (already created earlier)"
echo ""
echo "🚀 Run: npm run dev"