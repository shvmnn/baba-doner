# BABA Döner Lokeren — Website

Premium street-food website voor BABA Döner Lokeren.
Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion.

## Starten

```bash
npm install
npm run dev
```

Open http://localhost:3000

```bash
npm run build && npm start   # productie
```

## De echte menukaart toevoegen

Alles staat op één plek: **`src/data/menu.ts`**.
Vervang de `menu`-array door de echte gerechten — behoud dezelfde velden:

```ts
{
  id: "uniek-id",
  name: "Naam gerecht",
  description: "Korte beschrijving.",
  price: 9.5,
  category: "Döner",          // Döner | Wraps | Boxes | Fries | Drinks | Sauces
  tags: ["populair"],          // optioneel: populair | spicy | veggie | xl
  image: "https://...",        // optioneel: nodig voor 'Populaire toppers'
  popular: true,               // optioneel: toont in de Populaire-sectie
}
```

De combo add-ons (combo builder) staan in dezelfde file onder `addOns`.
Menu, zoeken, filters, combo builder en winkelmandje werken automatisch mee.

## Andere data aanpassen

- **`src/data/business.ts`** — adres, telefoon, rating, openingsuren, reviews.
- **Openingsuren zijn placeholders** (BABA Döner-uren waren niet opgegeven).
  Pas ze aan; ze ondersteunen sluiten ná middernacht en sturen automatisch de
  status **Nu open / Sluit binnenkort / Gesloten** aan.

## Bestellen in < 3 klikken

- Elk gerecht heeft een directe **"Toevoegen +"** (1 klik → mandje opent).
- **"Maak combo"** opent een snelle add-on selector (vlees, kaas, friet, drank).
- Floating cart, slide-out drawer en sticky mobiele balk leiden in één tik naar
  afrekenen. De "Afrekenen"-knop is klaar om te koppelen aan je ordersysteem
  (`src/components/Cart.tsx`).

## Structuur

```
src/
  app/          layout, page, globals.css
  components/    Navbar, Hero, PopularItems, WhyBaba, DigitalMenu, ComboDeals,
                Reviews, Contact, Footer, Cart
  data/          menu.ts, business.ts   ← hier pas je inhoud aan
  lib/           cart.tsx, status.ts
```

## Opmerking over fonts

De site gebruikt Google Fonts (Archivo + Inter) via `next/font`.
Dit vereist internettoegang tijdens het builden.
# baba-doner
