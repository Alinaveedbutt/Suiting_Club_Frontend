import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";
import ProductCard, { formatPKR, type Product } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface ProductDetail extends Product {
    description: string;
    category_name: string;
    category_slug: string;
    collections: { id: number; name: string; slug: string }[];
}

const ProductPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [related, setRelated] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [orderOpen, setOrderOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setSelectedImage(0);
            try {
                const res = await fetch(`/api/products/${slug}`);
                if (!res.ok) throw new Error("Product not found");
                const data = await res.json();
                setProduct(data);

                // Fetch related products from same category
                if (data.category_slug) {
                    const relRes = await fetch(
                        `/api/products?category=${data.category_slug}&limit=4`
                    );
                    const relData = await relRes.json();
                    setRelated(relData.filter((p: Product) => p.slug !== slug));
                }
            } catch (err) {
                console.error("Failed to fetch product:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) {
        return (
            <main className="min-h-screen bg-background">
                <Header />
                <div className="pt-32 pb-20">
                    <div className="container mx-auto px-6 lg:px-12">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 animate-pulse">
                            <div className="aspect-[3/4] bg-charcoal" />
                            <div className="space-y-4 pt-8">
                                <div className="h-4 bg-charcoal w-1/4" />
                                <div className="h-10 bg-charcoal w-3/4" />
                                <div className="h-6 bg-charcoal w-1/3" />
                                <div className="h-24 bg-charcoal w-full mt-8" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (!product) {
        return (
            <main className="min-h-screen bg-background">
                <Header />
                <div className="pt-32 pb-20 text-center">
                    <h1 className="font-display text-3xl text-foreground mb-4">
                        Product Not Found
                    </h1>
                    <Link
                        to="/"
                        className="text-gold uppercase tracking-widest text-sm hover:text-gold-light transition-colors"
                    >
                        ← Back to Home
                    </Link>
                </div>
                <Footer />
            </main>
        );
    }

    const images = product.images?.length
        ? product.images
        : ["/uploads/products/placeholder.jpg"];

    return (
        <>
            <Helmet>
                <title>{product.name} | Suiting Club Lahore</title>
                <meta name="description" content={product.description} />
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
                            className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground mb-10"
                        >
                            <Link to="/" className="hover:text-gold transition-colors">
                                Home
                            </Link>
                            <ChevronRight className="w-3 h-3" />
                            <Link
                                to={`/category/${product.category_slug}`}
                                className="hover:text-gold transition-colors"
                            >
                                {product.category_name}
                            </Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-foreground truncate max-w-[200px]">
                                {product.name}
                            </span>
                        </motion.nav>

                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                            {/* Image Gallery */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.7 }}
                            >
                                {/* Main Image */}
                                <div className="relative aspect-[3/4] overflow-hidden bg-charcoal mb-4">
                                    <img
                                        src={images[selectedImage]}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src =
                                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='800' fill='%231a1a1a'%3E%3Crect width='600' height='800'/%3E%3Ctext x='50%25' y='50%25' fill='%23666' text-anchor='middle' dy='.3em' font-family='sans-serif' font-size='16'%3EImage Coming Soon%3C/text%3E%3C/svg%3E";
                                        }}
                                    />
                                </div>

                                {/* Thumbnail Strip */}
                                {images.length > 1 && (
                                    <div className="flex gap-3">
                                        {images.map((img, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setSelectedImage(i)}
                                                className={`w-20 h-20 overflow-hidden border-2 transition-colors ${selectedImage === i
                                                        ? "border-gold"
                                                        : "border-transparent hover:border-border"
                                                    }`}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`${product.name} view ${i + 1}`}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).style.display = "none";
                                                    }}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </motion.div>

                            {/* Product Details */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="flex flex-col"
                            >
                                <span className="text-gold uppercase tracking-[0.3em] text-sm mb-3">
                                    {product.category_name}
                                </span>

                                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 leading-tight">
                                    {product.name}
                                </h1>

                                <p className="text-2xl text-gold font-display mb-6">
                                    {formatPKR(product.price)}
                                </p>

                                <div className="w-16 h-px bg-gold mb-8" />

                                <p className="text-muted-foreground leading-relaxed text-base mb-8">
                                    {product.description}
                                </p>

                                {/* Collections Tags */}
                                {product.collections?.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {product.collections.map((col) => (
                                            <Link
                                                key={col.id}
                                                to={`/collections/${col.slug}`}
                                                className="text-xs uppercase tracking-widest px-3 py-1.5 border border-border text-muted-foreground hover:border-gold hover:text-gold transition-colors"
                                            >
                                                {col.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}

                                {/* Order Button */}
                                <div className="mt-auto pt-4">
                                    <Button
                                        variant="gold"
                                        size="xl"
                                        className="w-full sm:w-auto"
                                        onClick={() => setOrderOpen(true)}
                                        id="order-now-btn"
                                    >
                                        Order Now
                                    </Button>

                                    <p className="text-xs text-muted-foreground mt-4">
                                        Free delivery across Pakistan. No payment required online —
                                        pay on delivery.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Related Products */}
                {related.length > 0 && (
                    <section className="pb-24 lg:pb-32 border-t border-border pt-16">
                        <div className="container mx-auto px-6 lg:px-12">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="mb-10"
                            >
                                <span className="text-gold uppercase tracking-[0.3em] text-sm">
                                    You May Also Like
                                </span>
                                <h2 className="font-display text-3xl text-foreground mt-2">
                                    Related Products
                                </h2>
                            </motion.div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                                {related.slice(0, 4).map((p, i) => (
                                    <ProductCard key={p.id} product={p} index={i} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <Footer />
            </main>

            <OrderModal
                open={orderOpen}
                onOpenChange={setOrderOpen}
                productSlug={product.slug}
                productName={product.name}
            />
        </>
    );
};

export default ProductPage;
