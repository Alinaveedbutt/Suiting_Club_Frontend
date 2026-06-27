import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    images: string[];
    category_name?: string;
    category_slug?: string;
}

interface ProductCardProps {
    product: Product;
    index?: number;
}

const formatPKR = (price: number) => {
    return `PKR ${price.toLocaleString("en-PK")}`;
};

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
    const imageUrl = product.images?.[0] || "/uploads/products/placeholder.jpg";

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            <Link
                to={`/products/${product.slug}`}
                className="group block"
                id={`product-card-${product.slug}`}
            >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-charcoal mb-4">
                    <img
                        src={imageUrl}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' fill='%231a1a1a'%3E%3Crect width='400' height='500'/%3E%3Ctext x='50%25' y='50%25' fill='%23666' text-anchor='middle' dy='.3em' font-family='sans-serif' font-size='14'%3EImage Coming Soon%3C/text%3E%3C/svg%3E";
                        }}
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />

                    {/* Quick View Label */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <span className="block w-full text-center text-xs uppercase tracking-widest text-foreground bg-background/80 backdrop-blur-sm py-3 border border-gold/30">
                            View Details
                        </span>
                    </div>
                </div>

                {/* Info */}
                <div className="space-y-1.5">
                    {product.category_name && (
                        <span className="text-[11px] uppercase tracking-[0.2em] text-gold">
                            {product.category_name}
                        </span>
                    )}
                    <h3 className="font-display text-lg text-foreground group-hover:text-gold transition-colors duration-300 leading-tight">
                        {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium">
                        {formatPKR(product.price)}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;
export { formatPKR };
export type { Product };
