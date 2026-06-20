"use client";

import { useEffect, useState } from "react";
import { business, dayNamesNL, hours } from "@/data/business";
import { formatRange, getStatus, type OpenState } from "@/lib/status";
import { Reveal } from "./Reveal";

const stateStyles: Record<OpenState, string> = {
  open: "bg-green-500/15 text-green-400 border-green-500/30",
  "closing-soon": "bg-amber/15 text-amber border-amber/30",
  closed: "bg-chili/15 text-chili border-chili/30",
};

const weekOrder = [1, 2, 3, 4, 5, 6, 0];

export function Contact() {
  const [status, setStatus] = useState(() => getStatus());

  useEffect(() => {
    setStatus(getStatus());
    const t = setInterval(() => setStatus(getStatus()), 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mb-14 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-fire">
            Vind ons
          </p>
          <h2 className="font-display text-4xl font-extrabold uppercase text-white sm:text-5xl">
            Kom langs in Lokeren
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal className="overflow-hidden rounded-3xl border border-white/8">
            <iframe
              title="Kaart BABA Döner"
              src={business.mapEmbed}
              className="h-full min-h-[400px] w-full"
              style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-6">
            <div className="rounded-3xl border border-white/8 bg-surface p-7">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h3 className="font-display text-2xl font-bold text-white">
                  Openingsuren
                </h3>
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-bold ${stateStyles[status.state]}`}
                >
                  <span className="h-2 w-2 rounded-full bg-current" />
                  {status.label}
                </span>
              </div>
              <ul className="space-y-1">
                {weekOrder.map((day) => {
                  const isToday = day === status.today;
                  return (
                    <li
                      key={day}
                      className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm ${
                        isToday
                          ? "bg-fire/10 font-bold text-white"
                          : "text-white/60"
                      }`}
                    >
                      <span>{dayNamesNL[day]}</span>
                      <span>{formatRange(hours[day])}</span>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-3 text-xs text-white/35">
                Openingsuren zijn voorlopig — pas aan in de data.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoCard label="Adres" value={business.address} href={business.mapsUrl} />
              <InfoCard label="Telefoon" value={business.phone} href={business.phoneHref} />
            </div>

            <a
              href="#menu"
              className="rounded-full bg-fire px-8 py-4 text-center text-base font-bold uppercase tracking-wide text-ink shadow-fire transition-transform hover:scale-[1.02] active:scale-95"
            >
              Bestel nu
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className="rounded-2xl border border-white/8 bg-surface p-5 transition-colors hover:border-fire/40"
    >
      <p className="mb-1 text-xs font-bold uppercase tracking-widest text-fire">
        {label}
      </p>
      <p className="text-sm font-medium text-white/85">{value}</p>
    </a>
  );
}
