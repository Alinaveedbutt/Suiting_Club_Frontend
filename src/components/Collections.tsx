import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProductCard, { type Product } from "@/components/ProductCard";

const Collections = () => {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?featured=true&limit=6")
      .then((res) => res.json())
      .then((data) => setFeatured(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="collections" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="text-gold uppercase tracking-[0.3em] text-sm">Featured Products</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mt-4">
              Curated Excellence
            </h2>
            <div className="w-24 h-px bg-gold mx-auto mt-8" />
          </motion.div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-charcoal mb-4" />
                <div className="h-4 bg-charcoal w-3/4 mb-2" />
                <div className="h-3 bg-charcoal w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
            {featured.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}

        {/* Browse All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <Link
            to="/collections"
            className="inline-flex items-center gap-3 text-gold uppercase tracking-widest text-sm hover:text-gold-light transition-colors duration-300 group"
          >
            <span>Browse All Collections</span>
            <div className="w-8 h-px bg-gold group-hover:w-12 transition-all duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Collections;
