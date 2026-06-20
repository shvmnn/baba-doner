"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";
import {
  addOns,
  allTags,
  categories,
  menu,
  tagLabels,
  type AddOn,
  type Dish,
  type MenuCategory,
  type Tag,
} from "@/data/menu";
import { useCart, eur } from "@/lib/cart";
import { Reveal } from "./Reveal";

export function DigitalMenu() {
  const { add } = useCart();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<MenuCategory>("Döner");
  const [activeTags, setActiveTags] = useState<Tag[]>([]);
  const [builder, setBuilder] = useState<Dish | null>(null);

  const toggleTag = (t: Tag) =>
    setActiveTags((cur) =>
      cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]
    );

  const searching = query.trim().length > 0 || activeTags.length > 0;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return menu.filter((d) => {
      const matchesQuery =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q);
      const matchesTags =
        activeTags.length === 0 || activeTags.every((t) => d.tags?.includes(t));
      const matchesCat = searching || d.category === active;
      return matchesQuery && matchesTags && matchesCat;
    });
  }, [query, active, activeTags, searching]);

  return (
    <section id="menu" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-fire">
            Het menu
          </p>
          <h2 className="font-display text-4xl font-extrabold uppercase text-white sm:text-5xl">
            Stel je bestelling samen
          </h2>
          <p className="mt-4 text-white/60">
            Zoek, filter en voeg toe — in een paar tikken klaar.
          </p>
        </Reveal>

        {/* search + filters */}
        <Reveal className="mb-8 flex flex-col gap-4">
          <div className="relative">
            <SearchIcon />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Zoek een gerecht…"
              className="w-full rounded-full border border-white/12 bg-surface py-3.5 pl-12 pr-4 text-white outline-none transition-colors placeholder:text-white/35 focus:border-fire"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-fire"
                aria-label="Wissen"
              >
                ✕
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {allTags.map((t) => {
              const on = activeTags.includes(t);
              return (
                <button
                  key={t}
                  onClick={() => toggleTag(t)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${
                    on
                      ? "border-fire bg-fire text-ink"
                      : "border-white/12 text-white/65 hover:border-fire/50"
                  }`}
                >
                  {tagLabels[t]}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* sticky category nav */}
        {!searching && (
          <div className="sticky top-20 z-30 mb-8 -mx-5 px-5 sm:top-24">
            <div className="mx-auto flex max-w-full gap-2 overflow-x-auto rounded-full border border-white/10 bg-ink/95 p-1.5 shadow-card backdrop-blur [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors ${
                    active === cat ? "text-ink" : "text-white/55 hover:text-fire"
                  }`}
                >
                  {active === cat && (
                    <motion.span
                      layoutId="menu-cat-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-fire"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* results */}
        <AnimatePresence mode="wait">
          <motion.div
            key={searching ? "search" : active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {filtered.length === 0 ? (
              <p className="col-span-full py-16 text-center text-white/50">
                Niets gevonden. Probeer een andere zoekterm.
              </p>
            ) : (
              filtered.map((dish) => (
                <article
                  key={dish.id}
                  className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-surface p-4 transition-colors hover:border-fire/40"
                >
                  {dish.image ? (
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        fill
                        sizes="80px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  ) : (
                    <div className="grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-ink text-2xl">
                      🔥
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="truncate font-display text-lg font-bold text-white">
                        {dish.name}
                      </h3>
                      <span className="shrink-0 font-display font-extrabold text-amber">
                        {eur(dish.price)}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-white/55">
                      {dish.description}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => add(dish)}
                        className="rounded-full bg-fire px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-ink transition-colors hover:bg-amber"
                      >
                        Toevoegen +
                      </button>
                      <button
                        onClick={() => setBuilder(dish)}
                        className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold text-white/70 transition-colors hover:border-fire hover:text-fire"
                      >
                        Maak combo
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <ComboBuilder dish={builder} onClose={() => setBuilder(null)} />
    </section>
  );
}

function ComboBuilder({
  dish,
  onClose,
}: {
  dish: Dish | null;
  onClose: () => void;
}) {
  const { add } = useCart();
  const [selected, setSelected] = useState<AddOn[]>([]);

  const toggle = (a: AddOn) =>
    setSelected((cur) =>
      cur.find((x) => x.id === a.id)
        ? cur.filter((x) => x.id !== a.id)
        : [...cur, a]
    );

  const total = dish
    ? dish.price + selected.reduce((s, a) => s + a.price, 0)
    : 0;

  return (
    <AnimatePresence>
      {dish && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-ink/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="fixed left-1/2 top-1/2 z-[90] w-[calc(100%-2.5rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/10 bg-surface p-6 shadow-card"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-fire">
                  Maak je combo
                </p>
                <h3 className="mt-1 font-display text-2xl font-bold text-white">
                  {dish.name}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white hover:border-fire hover:text-fire"
                aria-label="Sluiten"
              >
                ✕
              </button>
            </div>

            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/50">
              Voeg toe
            </p>
            <div className="mt-3 space-y-2">
              {addOns.map((a) => {
                const on = selected.find((x) => x.id === a.id);
                return (
                  <button
                    key={a.id}
                    onClick={() => toggle(a)}
                    className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-colors ${
                      on
                        ? "border-fire bg-fire/10"
                        : "border-white/10 hover:border-white/25"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`grid h-5 w-5 place-items-center rounded-full border text-xs ${
                          on
                            ? "border-fire bg-fire text-ink"
                            : "border-white/30 text-transparent"
                        }`}
                      >
                        ✓
                      </span>
                      <span className="text-sm font-medium text-white">
                        {a.name}
                      </span>
                    </span>
                    <span className="text-sm font-semibold text-amber">
                      +{eur(a.price)}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                add(dish, selected);
                onClose();
                setSelected([]);
              }}
              className="mt-6 flex w-full items-center justify-between rounded-full bg-fire px-6 py-4 font-bold uppercase tracking-wide text-ink transition-colors hover:bg-amber"
            >
              <span>In mandje</span>
              <span>{eur(total)}</span>
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SearchIcon() {
  return (
    <svg
      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
