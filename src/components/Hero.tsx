"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { business } from "@/data/business";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1633321702518-7feccafb94d5?auto=format&fit=crop&w=2070&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-hero-fade" />
        {/* grill glow */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-grill-glow opacity-70 animate-flicker" />
      </motion.div>

      {/* rising embers */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {EMBERS.map((e, i) => (
          <span
            key={i}
            className="absolute bottom-0 h-1.5 w-1.5 rounded-full bg-fire animate-ember-rise"
            style={{
              left: e.left,
              animationDelay: e.delay,
              animationDuration: e.dur,
              opacity: 0,
            }}
          />
        ))}
      </div>

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto max-w-4xl px-5 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-amber/40 bg-ink/40 px-4 py-2 text-sm font-semibold text-amber backdrop-blur"
        >
          <Star /> {business.rating.toFixed(1)}/5 uit {business.reviewCount}+
          reviews
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-balance text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-7xl md:text-8xl"
        >
          De beste döner
          <span className="block fire-text">in Lokeren</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-balance text-lg text-white/75"
        >
          Vers vlees, bold flavors en een smaak die je niet vergeet.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#menu"
            className="w-full rounded-full bg-fire px-9 py-4 text-base font-bold uppercase tracking-wide text-ink shadow-fire transition-transform hover:scale-[1.04] active:scale-95 sm:w-auto"
          >
            Bestel nu
          </a>
          <a
            href="#menu"
            className="w-full rounded-full border border-white/30 px-9 py-4 text-base font-bold uppercase tracking-wide text-white backdrop-blur transition-colors hover:border-fire hover:text-fire sm:w-auto"
          >
            Bekijk menu
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

const EMBERS = [
  { left: "12%", delay: "0s", dur: "4.2s" },
  { left: "24%", delay: "1.4s", dur: "3.6s" },
  { left: "38%", delay: "0.7s", dur: "4.8s" },
  { left: "52%", delay: "2.1s", dur: "4s" },
  { left: "66%", delay: "0.3s", dur: "3.8s" },
  { left: "78%", delay: "1.8s", dur: "4.5s" },
  { left: "88%", delay: "1s", dur: "4.1s" },
];

function Star() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.9 6.3L22 9.3l-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 7.1-1z" />
    </svg>
  );
}
