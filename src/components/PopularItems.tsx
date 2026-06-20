"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { popularItems, tagLabels } from "@/data/menu";
import { useCart, eur } from "@/lib/cart";
import { Reveal, stagger, staggerItem } from "./Reveal";

export function PopularItems() {
  const { add } = useCart();

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-fire">
            Crowd favorites
          </p>
          <h2 className="font-display text-4xl font-extrabold uppercase text-white sm:text-5xl">
            Populaire toppers
          </h2>
          <p className="mt-4 text-white/60">
            De gerechten waar Lokeren voor in de rij staat.
          </p>
        </Reveal>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {popularItems.map((dish) => (
            <motion.article
              key={dish.id}
              variants={staggerItem}
              className="group relative overflow-hidden rounded-3xl border border-white/8 bg-surface shadow-card transition-transform duration-500 hover:-translate-y-2"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {dish.image && (
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/10 to-transparent" />
                {dish.tags?.[0] && (
                  <span className="absolute left-4 top-4 rounded-full bg-fire px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink">
                    {tagLabels[dish.tags[0]]}
                  </span>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-2xl font-bold text-white">
                    {dish.name}
                  </h3>
                  <span className="shrink-0 font-display text-xl font-extrabold text-amber">
                    {eur(dish.price)}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {dish.description}
                </p>
                <button
                  onClick={() => add(dish)}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-fire py-3 text-sm font-bold uppercase tracking-wide text-ink transition-all hover:bg-amber active:scale-95"
                >
                  In mandje
                  <span className="text-lg leading-none">+</span>
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
