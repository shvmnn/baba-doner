// ─────────────────────────────────────────────────────────────
// MENU — Vervang deze placeholderdata door de echte kaart.
// Houd dezelfde structuur aan; menu, zoeken, filters en cart werken automatisch.
// ─────────────────────────────────────────────────────────────

export type MenuCategory =
  | "Döner"
  | "Wraps"
  | "Boxes"
  | "Fries"
  | "Drinks"
  | "Sauces";

export type Tag = "spicy" | "veggie" | "populair" | "xl";

export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  tags?: Tag[];
  image?: string;
  popular?: boolean;
};

export const categories: MenuCategory[] = [
  "Döner",
  "Wraps",
  "Boxes",
  "Fries",
  "Drinks",
  "Sauces",
];

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

export const menu: Dish[] = [
  // ── Döner
  {
    id: "classic-doner",
    name: "Classic Döner",
    description: "Vers gesneden vlees, knapperige groenten en huissaus in brood.",
    price: 9.5,
    category: "Döner",
    tags: ["populair"],
    image: img("photo-1633321702518-7feccafb94d5"),
    popular: true,
  },
  {
    id: "spicy-doner",
    name: "Spicy Döner",
    description: "Onze klassieker met extra chili en pittige scharfsaus.",
    price: 10.5,
    category: "Döner",
    tags: ["spicy", "populair"],
  },
  {
    id: "veggie-doner",
    name: "Veggie Döner",
    description: "Falafel, gegrilde groenten en romige knoflooksaus.",
    price: 9.0,
    category: "Döner",
    tags: ["veggie"],
  },

  // ── Wraps
  {
    id: "chicken-wrap",
    name: "Chicken Wrap",
    description: "Gegrilde kip, frisse sla en saus naar keuze, stevig gerold.",
    price: 9.0,
    category: "Wraps",
    tags: ["populair"],
    image: img("photo-1626700051175-6818013e1d4f"),
    popular: true,
  },
  {
    id: "mixed-wrap",
    name: "Mixed Wrap",
    description: "Kip én dönervlees samen met groenten en dubbele saus.",
    price: 10.5,
    category: "Wraps",
    tags: ["xl"],
  },
  {
    id: "falafel-wrap",
    name: "Falafel Wrap",
    description: "Krokante falafel, hummus en verse groenten.",
    price: 8.5,
    category: "Wraps",
    tags: ["veggie"],
  },

  // ── Boxes
  {
    id: "mega-box",
    name: "Mega Box",
    description: "Berg vlees op friet met saus en groenten. Honger gegarandeerd weg.",
    price: 13.5,
    category: "Boxes",
    tags: ["xl", "populair"],
    image: img("photo-1639024471283-03518883512d"),
    popular: true,
  },
  {
    id: "chicken-box",
    name: "Chicken Box",
    description: "Krokante kipstukjes op friet met saus naar keuze.",
    price: 12.0,
    category: "Boxes",
  },
  {
    id: "family-combo",
    name: "Family Combo",
    description: "2 döners, 2 wraps, grote friet en 4 drinks. Voor het hele gezin.",
    price: 34.0,
    category: "Boxes",
    tags: ["xl", "populair"],
    image: img("photo-1565299624946-b28f40a0ae38"),
    popular: true,
  },

  // ── Fries
  {
    id: "loaded-fries",
    name: "Loaded Fries",
    description: "Friet met vlees, gesmolten kaas en onze signature saus.",
    price: 8.5,
    category: "Fries",
    tags: ["populair"],
    image: img("photo-1573080496219-bb080dd4f877"),
    popular: true,
  },
  {
    id: "classic-fries",
    name: "Klassieke Friet",
    description: "Knapperige Belgische friet met saus naar keuze.",
    price: 3.5,
    category: "Fries",
    tags: ["veggie"],
  },
  {
    id: "cheese-fries",
    name: "Cheese Fries",
    description: "Friet royaal overgoten met gesmolten kaassaus.",
    price: 5.5,
    category: "Fries",
    tags: ["veggie"],
  },

  // ── Drinks
  {
    id: "cola",
    name: "Cola",
    description: "Ijskoud, 33 cl.",
    price: 2.5,
    category: "Drinks",
  },
  {
    id: "fanta",
    name: "Fanta",
    description: "Ijskoud, 33 cl.",
    price: 2.5,
    category: "Drinks",
  },
  {
    id: "ayran",
    name: "Ayran",
    description: "Verfrissende Turkse yoghurtdrank.",
    price: 2.0,
    category: "Drinks",
    tags: ["populair"],
  },
  {
    id: "water",
    name: "Water",
    description: "Plat of bruisend, 50 cl.",
    price: 2.0,
    category: "Drinks",
  },

  // ── Sauces
  {
    id: "garlic-sauce",
    name: "Knoflooksaus",
    description: "Romig en vol smaak.",
    price: 1.0,
    category: "Sauces",
    tags: ["populair"],
  },
  {
    id: "samurai",
    name: "Samurai",
    description: "Pittige saus voor de durvers.",
    price: 1.0,
    category: "Sauces",
    tags: ["spicy"],
  },
  {
    id: "andalouse",
    name: "Andalouse",
    description: "Licht pittig met paprika.",
    price: 1.0,
    category: "Sauces",
  },
];

export const popularItems = menu.filter((d) => d.popular);

export const allTags: Tag[] = ["populair", "spicy", "veggie", "xl"];

export const tagLabels: Record<Tag, string> = {
  populair: "Populair",
  spicy: "Pittig",
  veggie: "Veggie",
  xl: "XL",
};

// Combo add-ons (combo builder)
export type AddOn = { id: string; name: string; price: number };

export const addOns: AddOn[] = [
  { id: "extra-meat", name: "Extra vlees", price: 3.0 },
  { id: "extra-cheese", name: "Extra kaas", price: 1.5 },
  { id: "side-fries", name: "Portie friet", price: 3.5 },
  { id: "add-drink", name: "Drankje", price: 2.5 },
];
