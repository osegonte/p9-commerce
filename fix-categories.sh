#!/bin/zsh

# Fix: Create category shop pages (compatible with macOS zsh)

create_category() {
  local slug="$1"
  local title="$2"
  local component="${title// /}"

  mkdir -p "src/app/$slug"
  cat > "src/app/$slug/page.tsx" << EOF
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/sections/Footer";

export default function ${component}Page() {
  return (
    <>
      <Header />
      <ProductGrid title="${title}" products={[]} />
      <Footer />
    </>
  );
}
EOF
  echo "  ✓ /$slug"
}

echo "Creating category pages..."
create_category "new-arrivals" "New Arrivals"
create_category "hoodies" "Hoodies"
create_category "tees" "Tees"
create_category "headwear" "Headwear"
create_category "shoes" "Shoes"
create_category "accessories" "Accessories"
echo "✅ Done. Run: npm run dev"