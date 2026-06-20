"use client";

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { Dish, AddOn } from "@/data/menu";

export type CartItem = {
  key: string; // dish id + addon signature
  dish: Dish;
  qty: number;
  addOns: AddOn[];
};

type State = { items: CartItem[]; isOpen: boolean };

type Action =
  | { type: "add"; dish: Dish; addOns?: AddOn[] }
  | { type: "decrement"; key: string }
  | { type: "remove"; key: string }
  | { type: "clear" }
  | { type: "openCart" }
  | { type: "closeCart" };

function keyFor(dish: Dish, addOns: AddOn[]) {
  return (
    dish.id +
    (addOns.length ? "::" + addOns.map((a) => a.id).sort().join("+") : "")
  );
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add": {
      const addOns = action.addOns ?? [];
      const key = keyFor(action.dish, addOns);
      const existing = state.items.find((i) => i.key === key);
      const items = existing
        ? state.items.map((i) =>
            i.key === key ? { ...i, qty: i.qty + 1 } : i
          )
        : [...state.items, { key, dish: action.dish, qty: 1, addOns }];
      return { ...state, items, isOpen: true };
    }
    case "decrement": {
      const items = state.items
        .map((i) => (i.key === action.key ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0);
      return { ...state, items };
    }
    case "remove":
      return { ...state, items: state.items.filter((i) => i.key !== action.key) };
    case "clear":
      return { ...state, items: [] };
    case "openCart":
      return { ...state, isOpen: true };
    case "closeCart":
      return { ...state, isOpen: false };
    default:
      return state;
  }
}

function itemTotal(i: CartItem) {
  const addOnSum = i.addOns.reduce((s, a) => s + a.price, 0);
  return (i.dish.price + addOnSum) * i.qty;
}

type CartValue = {
  items: CartItem[];
  isOpen: boolean;
  count: number;
  total: number;
  add: (dish: Dish, addOns?: AddOn[]) => void;
  decrement: (key: string) => void;
  remove: (key: string) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], isOpen: false });

  const value = useMemo<CartValue>(() => {
    const count = state.items.reduce((n, i) => n + i.qty, 0);
    const total = state.items.reduce((s, i) => s + itemTotal(i), 0);
    return {
      items: state.items,
      isOpen: state.isOpen,
      count,
      total,
      add: (dish, addOns) => dispatch({ type: "add", dish, addOns }),
      decrement: (key) => dispatch({ type: "decrement", key }),
      remove: (key) => dispatch({ type: "remove", key }),
      clear: () => dispatch({ type: "clear" }),
      openCart: () => dispatch({ type: "openCart" }),
      closeCart: () => dispatch({ type: "closeCart" }),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export { itemTotal };

export const eur = (n: number) =>
  new Intl.NumberFormat("nl-BE", { style: "currency", currency: "EUR" }).format(n);
