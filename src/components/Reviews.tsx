"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { reviews } from "@/data/business";
import { Reveal } from "./Reveal";

export function Reviews() {
  const [index, setIndex] = useState(0);
  const next = useCallback(() => setIndex((i) => (i + 1) % reviews.length), []);
  const prev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [next]);

  const r = reviews[index];

  return (
    <section id="reviews" className="relative bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-fire">
            Reviews
          </p>
          <h2 className="font-display text-4xl font-extrabold uppercase text-white sm:text-5xl">
            Wat Lokeren zegt
          </h2>
        </Reveal>

        <div className="relative min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-2xl rounded-3xl border border-white/8 bg-ink p-8 text-center shadow-card sm:p-12"
            >
              <div className="mb-5 flex justify-center gap-1 text-amber">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} filled={i < r.rating} />
                ))}
              </div>
              <blockquote className="font-display text-2xl font-bold leading-relaxed text-white sm:text-3xl">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-8 flex items-center justify-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-fire/15 text-sm font-bold text-fire">
                  {r.initials}
                </span>
                <span className="text-sm font-medium text-white/70">
                  {r.name}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-fire hover:text-fire"
            aria-label="Vorige"
          >
            ‹
          </button>
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Review ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-fire" : "w-2 bg-white/25"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-fire hover:text-fire"
            aria-label="Volgende"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.4"
      className={filled ? "" : "text-white/20"}
    >
      <path d="M12 2l2.9 6.3L22 9.3l-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 7.1-1z" />
    </svg>
  );
}
