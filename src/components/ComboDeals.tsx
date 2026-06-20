"use client";

import { addOns } from "@/data/menu";
import { menu } from "@/data/menu";
import { useCart, eur } from "@/lib/cart";
import { Reveal } from "./Reveal";

const familyCombo = menu.find((d) => d.id === "family-combo")!;

export function ComboDeals() {
  const { add, openCart } = useCart();

  return (
    <section id="deals" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-grill-glow opacity-50" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-fire">
            Deals &amp; extra&apos;s
          </p>
          <h2 className="font-display text-4xl font-extrabold uppercase text-white sm:text-5xl">
            Maak het compleet
          </h2>
          <p className="mt-4 text-white/60">
            Pimp je bestelling met onze populairste extra&apos;s.
          </p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Featured family combo */}
          <Reveal className="relative overflow-hidden rounded-3xl border border-fire/30 bg-surface p-8 shadow-fire">
            <span className="inline-block rounded-full bg-fire px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink">
              Beste deal
            </span>
            <h3 className="mt-4 font-display text-3xl font-extrabold text-white">
              {familyCombo.name}
            </h3>
            <p className="mt-2 max-w-sm text-white/60">
              {familyCombo.description}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <span className="font-display text-4xl font-extrabold text-amber">
                {eur(familyCombo.price)}
              </span>
              <button
                onClick={() => add(familyCombo)}
                className="rounded-full bg-fire px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:bg-amber active:scale-95"
              >
                In mandje +
              </button>
            </div>
          </Reveal>

          {/* Quick add-ons */}
          <Reveal delay={0.1} className="rounded-3xl border border-white/8 bg-surface p-8">
            <h3 className="font-display text-2xl font-bold text-white">
              Snel toevoegen
            </h3>
            <div className="mt-5 space-y-3">
              {addOns.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between rounded-2xl border border-white/8 bg-ink px-4 py-3"
                >
                  <span className="font-medium text-white">{a.name}</span>
                  <span className="flex items-center gap-3">
                    <span className="font-semibold text-amber">
                      {eur(a.price)}
                    </span>
                    <button
                      onClick={() => {
                        // add the add-on as a standalone line via a tiny pseudo-dish
                        add(
                          {
                            id: a.id,
                            name: a.name,
                            description: "Extra",
                            price: a.price,
                            category: "Sauces",
                          },
                        );
                      }}
                      className="grid h-9 w-9 place-items-center rounded-full bg-fire text-lg font-bold text-ink transition-colors hover:bg-amber"
                      aria-label={`${a.name} toevoegen`}
                    >
                      +
                    </button>
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={openCart}
              className="mt-6 w-full rounded-full border border-white/15 py-3 text-sm font-semibold text-white/80 transition-colors hover:border-fire hover:text-fire"
            >
              Bekijk mandje
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
