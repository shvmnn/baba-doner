import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { PopularItems } from "@/components/PopularItems";
import { WhyBaba } from "@/components/WhyBaba";
import { DigitalMenu } from "@/components/DigitalMenu";
import { ComboDeals } from "@/components/ComboDeals";
import { Reviews } from "@/components/Reviews";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CartDrawer, FloatingCart, MobileOrderBar } from "@/components/Cart";
import { business } from "@/data/business";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: business.name,
    servesCuisine: ["Turkish", "Street Food", "Döner Kebab"],
    priceRange: business.priceRange,
    telephone: business.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Stationsstraat 12",
      postalCode: "9160",
      addressLocality: "Lokeren",
      addressCountry: "BE",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.rating,
      reviewCount: business.reviewCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <PopularItems />
        <WhyBaba />
        <DigitalMenu />
        <ComboDeals />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <CartDrawer />
      <FloatingCart />
      <MobileOrderBar />
      <div className="h-20 sm:hidden" />
    </>
  );
}
