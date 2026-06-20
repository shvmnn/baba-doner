import { business } from "@/data/business";
import { Logo } from "./Logo";

const quickLinks = [
  { href: "#menu", label: "Menu" },
  { href: "#deals", label: "Deals" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-ink">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
            Premium street food in Lokeren. Vers vlees, bold flavors en porties
            die je honger écht stillen.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-fire">
            Menu
          </h4>
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-white/55 transition-colors hover:text-fire"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-fire">
            Contact
          </h4>
          <ul className="space-y-2.5 text-sm text-white/55">
            <li>{business.address}</li>
            <li>
              <a
                href={business.phoneHref}
                className="transition-colors hover:text-fire"
              >
                {business.phone}
              </a>
            </li>
          </ul>
          <div className="mt-5 flex gap-3">
            {["Instagram", "Facebook", "TikTok"].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-fire hover:text-fire"
              >
                {s[0]}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-white/40 sm:flex-row sm:px-8">
          <p>
            © {new Date().getFullYear()} {business.name}. Alle rechten
            voorbehouden.
          </p>
          <p>Made hot in Lokeren 🔥</p>
        </div>
      </div>
    </footer>
  );
}
