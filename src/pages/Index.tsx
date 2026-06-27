import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Collections from "@/components/Collections";
import Craftsmanship from "@/components/Craftsmanship";
import Location from "@/components/Location";
import Footer from "@/components/Footer";


const Index = () => {
  return (
    <>
      <Helmet>
        <title>Suiting Club Lahore | Premium Men's Suiting Fabrics & Formal Wear</title>
        <meta
          name="description"
          content="Discover premium men's suiting fabrics at Suiting Club, Mall Road Lahore. Specializing in wedding suits, business attire, and formal wear. Visit our boutique for exceptional quality and service."
        />
        <meta
          name="keywords"
          content="suiting club, men's suits lahore, premium suiting fabric, wedding suits pakistan, formal wear lahore, mall road suits, gents suiting"
        />
        <link rel="canonical" href="https://suitingclub.pk" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Suiting Club Lahore | Premium Men's Suiting" />
        <meta
          property="og:description"
          content="Where elegance meets precision. Premium suiting fabrics for weddings, business, and special occasions."
        />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ClothingStore",
            "name": "Suiting Club",
            "description": "Premium men's suiting store specializing in high-quality suiting fabrics and formal wear",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Shop No. 15, Naqi Center, 71 Mall Road",
              "addressLocality": "Lahore",
              "addressCountry": "Pakistan"
            },
            "openingHours": ["Mo-Sa 11:00-21:00", "Su 14:00-20:00"],
            "priceRange": "$$"
          })}
        </script>
      </Helmet>

      <main className="min-h-screen bg-background">
        <Header />
        <Hero />
        <Collections />
        <Craftsmanship />
        <Location />
        <Footer />
        
      </main>
    </>
  );
};

export default Index;
