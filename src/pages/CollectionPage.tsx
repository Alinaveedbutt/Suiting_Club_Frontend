import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard, { type Product } from "@/components/ProductCard";
import { ChevronRight } from "lucide-react";

interface Collection {
    id: number;
    name: string;
    slug: string;
    description: string;
    image_url: string;
}

const CollectionPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [collection, setCollection] = useState<Collection | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [colRes, prodRes] = await Promise.all([
                    fetch("/api/collections"),
                    fetch(`/api/products?collection=${slug}`),
                ]);
                const collections = await colRes.json();
                const prods = await prodRes.json();

                const colArray = Array.isArray(collections) ? collections : [];
                const col = colArray.find((c: Collection) => c.slug === slug);
                setCollection(col || null);
                setProducts(Array.isArray(prods) ? prods : []);
            } catch (err) {
                console.error("Failed to fetch:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [slug]);

    return (
        <>
            <Helmet>
                <title>{collection?.name || "Collection"} | Suiting Club Lahore</title>
                <meta name="description" content={collection?.description || ""} />
            </Helmet>

            <main className="min-h-screen bg-background">
                <Header />

                {/* Hero Banner */}
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
                            <Link
                                to="/collections"
                                className="hover:text-gold transition-colors"
                            >
                                Collections
                            </Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-foreground">
                                {collection?.name || "..."}
                            </span>
                        </motion.nav>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-gold uppercase tracking-[0.3em] text-sm">
                                Exclusive Collection
                            </span>
                            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mt-3 mb-4">
                                {collection?.name || "Loading..."}
                            </h1>
                            {collection?.description && (
                                <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                                    {collection.description}
                                </p>
                            )}
                            <div className="w-24 h-px bg-gold mt-8" />
                        </motion.div>
                    </div>
                </section>

                {/* Products Grid */}
                <section className="pb-24 lg:pb-32">
                    <div className="container mx-auto px-6 lg:px-12">
                        {loading ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="animate-pulse">
                                        <div className="aspect-[3/4] bg-charcoal mb-4" />
                                        <div className="h-4 bg-charcoal w-3/4 mb-2" />
                                        <div className="h-3 bg-charcoal w-1/2" />
                                    </div>
                                ))}
                            </div>
                        ) : products.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-20"
                            >
                                <p className="text-muted-foreground text-lg">
                                    No products found in this collection.
                                </p>
                                <Link
                                    to="/collections"
                                    className="inline-block mt-4 text-gold uppercase tracking-widest text-sm hover:text-gold-light transition-colors"
                                >
                                    ← Browse Collections
                                </Link>
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                                {products.map((product, index) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        index={index}
                                    />
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

export default CollectionPage;
