"use client";

import { Reveal } from "./Reveal";

const items = [
  {
    title: "Vers, elke dag",
    text: "Dagvers vlees en groenten — nooit ingevroren, altijd op smaak.",
    icon: (
      <>
        <path d="M12 2C8 6 6 9 6 13a6 6 0 0 0 12 0c0-4-2-7-6-11Z" />
        <path d="M12 22v-6" />
      </>
    ),
  },
  {
    title: "Razendsnel",
    text: "Vers van de grill in enkele minuten. Bestellen in 3 klikken.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    title: "Mega porties",
    text: "Geen kleine hapjes. Bij BABA ga je altijd voldaan naar huis.",
    icon: (
      <>
        <path d="M4 11h16l-1.5 9h-13z" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </>
    ),
  },
];

export function WhyBaba() {
  return (
    <section className="relative bg-surface py-24 sm:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fire/50 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-fire">
            Waarom BABA
          </p>
          <h2 className="font-display text-4xl font-extrabold uppercase text-white sm:text-5xl">
            Bold. Vers. Snel.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="group h-full rounded-3xl border border-white/8 bg-ink p-8 transition-colors hover:border-fire/50">
                <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-fire/15 text-fire transition-transform duration-500 group-hover:scale-110">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {item.icon}
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-white/55">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
