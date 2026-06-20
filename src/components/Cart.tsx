"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCart, eur, itemTotal } from "@/lib/cart";

export function CartDrawer() {
  const { items, isOpen, closeCart, add, decrement, remove, total, clear } =
    useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-ink/75 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 360, damping: 38 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col border-l border-white/10 bg-surface"
          >
            <div className="flex items-center justify-between border-b border-white/8 px-6 py-5">
              <h3 className="font-display text-2xl font-bold text-white">
                Jouw mandje
              </h3>
              <button
                onClick={closeCart}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-fire hover:text-fire"
                aria-label="Sluiten"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <span className="text-5xl">🔥</span>
                  <p className="mt-4 font-display text-xl font-bold text-white">
                    Je mandje is leeg
                  </p>
                  <p className="mt-2 text-sm text-white/50">
                    Tijd om iets lekkers toe te voegen.
                  </p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li
                      key={item.key}
                      className="flex gap-4 rounded-2xl border border-white/8 bg-ink p-3"
                    >
                      {item.dish.image ? (
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                          <Image
                            src={item.dish.image}
                            alt={item.dish.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-surface text-2xl">
                          🌯
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="truncate text-sm font-bold text-white">
                            {item.dish.name}
                          </p>
                          <button
                            onClick={() => remove(item.key)}
                            className="text-xs text-white/40 transition-colors hover:text-chili"
                          >
                            ✕
                          </button>
                        </div>
                        {item.addOns.length > 0 && (
                          <p className="mt-0.5 text-xs text-white/45">
                            {item.addOns.map((a) => a.name).join(", ")}
                          </p>
                        )}
                        <p className="mt-1 text-sm font-semibold text-amber">
                          {eur(itemTotal(item))}
                        </p>
                        <div className="mt-2 inline-flex items-center gap-3 rounded-full border border-white/15 px-2 py-1">
                          <button
                            onClick={() => decrement(item.key)}
                            className="grid h-6 w-6 place-items-center rounded-full text-white/80 hover:text-fire"
                            aria-label="Minder"
                          >
                            −
                          </button>
                          <span className="w-4 text-center text-sm text-white">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => add(item.dish, item.addOns)}
                            className="grid h-6 w-6 place-items-center rounded-full text-white/80 hover:text-fire"
                            aria-label="Meer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-white/8 px-6 py-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-white/60">Totaal</span>
                  <span className="font-display text-2xl font-extrabold text-white">
                    {eur(total)}
                  </span>
                </div>
                <button className="w-full rounded-full bg-fire py-4 text-base font-bold uppercase tracking-wide text-ink shadow-fire transition-transform hover:scale-[1.02] active:scale-95">
                  Afrekenen
                </button>
                <button
                  onClick={clear}
                  className="mt-2 w-full py-2 text-xs text-white/40 transition-colors hover:text-chili"
                >
                  Mandje leegmaken
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export function FloatingCart() {
  const { count, openCart, isOpen } = useCart();
  if (isOpen) return null;

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={openCart}
          className="fixed bottom-24 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-fire text-ink shadow-fire animate-pulse-fire sm:bottom-6"
          aria-label="Mandje openen"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span className="absolute -right-1 -top-1 grid h-6 min-w-6 place-items-center rounded-full bg-ink px-1 text-xs font-bold text-fire">
            {count}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export function MobileOrderBar() {
  const { count, total, openCart } = useCart();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 glass px-4 py-3 sm:hidden">
      {count > 0 ? (
        <button
          onClick={openCart}
          className="flex w-full items-center justify-between rounded-full bg-fire px-5 py-3.5 text-sm font-bold uppercase tracking-wide text-ink"
        >
          <span>
            {count} {count === 1 ? "item" : "items"}
          </span>
          <span>Mandje · {eur(total)}</span>
        </button>
      ) : (
        <a
          href="#menu"
          className="block w-full rounded-full bg-fire px-5 py-3.5 text-center text-sm font-bold uppercase tracking-wide text-ink"
        >
          Bestel nu
        </a>
      )}
    </div>
  );
}
