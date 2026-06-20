export const business = {
  name: "BABA Döner Lokeren",
  shortName: "BABA Döner",
  city: "Lokeren",
  address: "Stationsstraat 12, 9160 Lokeren, België",
  phone: "+32 473 11 43 33",
  phoneHref: "tel:+32473114333",
  rating: 4.9,
  reviewCount: 50,
  priceRange: "€10–20",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=BABA+Doner+Stationsstraat+12+Lokeren",
  mapEmbed:
    "https://www.google.com/maps?q=Stationsstraat+12,+9160+Lokeren,+Belgium&output=embed",
};

// LET OP: openingsuren zijn placeholders — vervang door de echte uren.
// 0 = Zondag ... 6 = Zaterdag. null = gesloten.
export type DayHours = { open: string; close: string } | null;

export const hours: Record<number, DayHours> = {
  0: { open: "12:00", close: "23:00" }, // Zondag
  1: { open: "11:00", close: "23:00" }, // Maandag
  2: { open: "11:00", close: "23:00" }, // Dinsdag
  3: { open: "11:00", close: "23:00" }, // Woensdag
  4: { open: "11:00", close: "23:00" }, // Donderdag
  5: { open: "11:00", close: "01:00" }, // Vrijdag (sluit na middernacht)
  6: { open: "11:00", close: "01:00" }, // Zaterdag
};

export const dayNamesNL = [
  "Zondag",
  "Maandag",
  "Dinsdag",
  "Woensdag",
  "Donderdag",
  "Vrijdag",
  "Zaterdag",
];

export const reviews = [
  {
    name: "Yusuf K.",
    initials: "YK",
    rating: 5,
    text: "De beste döner van Lokeren, zonder twijfel. Vers vlees en enorme porties!",
  },
  {
    name: "Emma D.",
    initials: "ED",
    rating: 5,
    text: "Snelle service en zo lekker. De loaded fries zijn echt verslavend.",
  },
  {
    name: "Mehmet A.",
    initials: "MA",
    rating: 5,
    text: "Eindelijk een döner zoals het hoort. Bold, juicy en altijd top.",
  },
  {
    name: "Lotte V.",
    initials: "LV",
    rating: 5,
    text: "Mega box gedeeld met vrienden — iedereen was onder de indruk.",
  },
  {
    name: "Sam B.",
    initials: "SB",
    rating: 5,
    text: "Vriendelijk, snel en overheerlijk. Mijn vaste afhaaladres.",
  },
];
