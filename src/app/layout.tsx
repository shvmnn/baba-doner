import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { business } from "@/data/business";

const display = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BABA Döner Lokeren — De beste döner in Lokeren",
  description:
    "Premium döner, wraps, boxes en loaded fries in Lokeren. Vers vlees, bold flavors. Bestel nu online of afhaal. ⭐ 4,9/5 uit 50+ reviews.",
  keywords: [
    "döner Lokeren",
    "BABA Döner",
    "kebab Lokeren",
    "afhaal Lokeren",
    "döner bestellen Lokeren",
    "loaded fries Lokeren",
  ],
  openGraph: {
    title: "BABA Döner Lokeren — De beste döner in Lokeren",
    description:
      "Vers vlees, bold flavors en mega porties. Bestel nu online of afhaal.",
    type: "website",
    locale: "nl_BE",
    siteName: business.name,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans bg-ink text-white antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
