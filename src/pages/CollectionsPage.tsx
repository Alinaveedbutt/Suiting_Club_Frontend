import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChevronRight } from "lucide-react";

interface Collection {
    id: number;
    name: string;
    slug: string;
    description: string;
    image_url: string;
    product_count: number;
}

const CollectionsPage = () => {
    const [collections, setCollections] = useState<Collection[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/collections")
            .then((res) => res.json())
            .then((data) => setCollections(Array.isArray(data) ? data : []))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <Helmet>
                <title>Collections | Suiting Club Lahore</title>
                <meta
                    name="description"
                    content="Browse our exclusive collections of premium men's suiting and formal wear."
                />
            </Helmet>

            <main className="min-h-screen bg-background">
                <Header />

                <section className="pt-28 pb-16 lg:pt-36 lg:pb-24">
                    <div className="container mx-auto px-6 lg:px-12">
                        {/* Breadcrumb */}
                        <motion.nav
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-8"
                        >
                            <Link to="/" className="hover:text-gold transition-colors">
                                Home
                            </Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-foreground">Collections</span>
                        </motion.nav>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <span className="text-gold uppercase tracking-[0.3em] text-sm">
                                Curated Selection
                            </span>
                            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mt-3 mb-4">
                                Our Collections
                            </h1>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                Explore our carefully curated collections, each telling a
                                unique story of craftsmanship and style.
                            </p>
                            <div className="w-24 h-px bg-gold mx-auto mt-8" />
                        </motion.div>
                    </div>
                </section>

                {/* Collections Grid */}
                <section className="pb-24 lg:pb-32">
                    <div className="container mx-auto px-6 lg:px-12">
                        {loading ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="animate-pulse">
                                        <div className="aspect-[4/3] bg-charcoal mb-4" />
                                        <div className="h-6 bg-charcoal w-3/4 mb-2" />
                                        <div className="h-4 bg-charcoal w-full" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {collections.map((col, index) => (
                                    <motion.div
                                        key={col.id}
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: index * 0.15 }}
                                    >
                                        <Link
                                            to={`/collections/${col.slug}`}
                                            className="group block"
                                        >
                                            <div className="relative aspect-[4/3] overflow-hidden bg-charcoal mb-5">
                                                <img
                                                    src={col.image_url}
                                                    alt={col.name}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src =
                                                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' fill='%231a1a1a'%3E%3Crect width='600' height='400'/%3E%3Ctext x='50%25' y='50%25' fill='%23666' text-anchor='middle' dy='.3em' font-family='sans-serif' font-size='16'%3ECollection%3C/text%3E%3C/svg%3E";
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500" />

                                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                                    <h2 className="font-display text-2xl lg:text-3xl text-foreground mb-1">
                                                        {col.name}
                                                    </h2>
                                                    <span className="text-xs uppercase tracking-widest text-gold">
                                                        {col.product_count}{" "}
                                                        {col.product_count === 1 ? "piece" : "pieces"}
                                                    </span>
                                                </div>
                                            </div>

                                            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                                                {col.description}
                                            </p>

                                            <div className="mt-4 overflow-hidden">
                                                <div className="w-0 h-px bg-gold group-hover:w-full transition-all duration-700" />
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
};

export default CollectionsPage;
