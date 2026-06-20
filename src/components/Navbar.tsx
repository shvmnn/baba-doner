"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { useCart } from "@/lib/cart";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#deals", label: "Deals" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass border-b border-white/10 py-3" : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top">
          <Logo />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-semibold uppercase tracking-wide text-white/70 transition-colors hover:text-fire"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            className="relative grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-fire hover:text-fire"
            aria-label="Winkelmandje"
          >
            <CartIcon />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-fire px-1 text-[11px] font-bold text-ink">
                {count}
              </span>
            )}
          </button>

          <a
            href="#menu"
            className="hidden rounded-full bg-fire px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink shadow-fire transition-transform hover:scale-[1.04] active:scale-95 sm:inline-block"
          >
            Bestel nu
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white md:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            <Burger open={open} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden"
          >
            <ul className="mx-auto mt-3 flex max-w-7xl flex-col gap-1 px-5 pb-4">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-semibold uppercase tracking-wide text-white/90 transition-colors hover:bg-white/5 hover:text-fire"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#menu"
                  onClick={() => setOpen(false)}
                  className="mt-2 block rounded-full bg-fire px-4 py-3 text-center text-base font-bold uppercase tracking-wide text-ink"
                >
                  Bestel nu
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function Burger({ open }: { open: boolean }) {
  return (
    <div className="relative h-4 w-5">
      <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
      <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-current transition-all duration-300 ${open ? "opacity-0" : "opacity-100"}`} />
      <span className={`absolute left-0 h-0.5 w-5 bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
    </div>
  );
}
