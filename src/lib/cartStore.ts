// FILE: src/lib/cartStore.ts
// Cart state using Zustand + localStorage persistence
// Install: npm install zustand

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;          // product id
  slug: string;
  name: string;
  price: number;       // numeric, in Naira
  image: string;
  size: string | null;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string, size: string | null) => void;
  updateQuantity: (id: string, size: string | null, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (incoming) => {
        const qty = incoming.quantity ?? 1;
        set((state) => {
          const existing = state.items.find(
            (i) => i.id === incoming.id && i.size === incoming.size
          );
          if (existing) {
            // Increment quantity if same product + size already in cart
            return {
              items: state.items.map((i) =>
                i.id === incoming.id && i.size === incoming.size
                  ? { ...i, quantity: i.quantity + qty }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...incoming, quantity: qty }] };
        });
      },

      removeItem: (id, size) => {
        set((state) => ({
          items: state.items.filter((i) => !(i.id === id && i.size === size)),
        }));
      },

      updateQuantity: (id, size, quantity) => {
        if (quantity < 1) {
          get().removeItem(id, size);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id && i.size === size ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: "nynt-cart", // localStorage key
    }
  )
);