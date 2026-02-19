// FILE: src/components/sections/NewArrivalsFetcher.tsx
// Server component — fetches newest 8 products, passes to client strip

import { getAllProducts } from "@/lib/products";
import NewArrivalsSection from "./NewArrivalsSection";

export default async function NewArrivalsFetcher() {
  const all = await getAllProducts();
  const products = all.slice(0, 8);
  return <NewArrivalsSection products={products} />;
}