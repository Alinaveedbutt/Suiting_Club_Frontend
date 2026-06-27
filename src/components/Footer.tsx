import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-charcoal border-t border-border">
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="mb-6">
              <Link to="/">
                <span className="font-display text-3xl text-foreground tracking-wide">
                  Suiting Club
                </span>
                <span className="block text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-1">
                  Lahore
                </span>
              </Link>
            </div>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Where timeless elegance meets modern sophistication. Experience the
              finest suiting fabrics and exceptional service at our Mall Road boutique.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-display text-lg text-foreground mb-6">Explore</h4>
            <nav className="space-y-3">
              <Link
                to="/category/sherwani"
                className="block text-muted-foreground hover:text-gold transition-colors duration-300 text-sm"
              >
                Sherwani
              </Link>
              <Link
                to="/category/suits"
                className="block text-muted-foreground hover:text-gold transition-colors duration-300 text-sm"
              >
                Suits
              </Link>
              <Link
                to="/category/blazers"
                className="block text-muted-foreground hover:text-gold transition-colors duration-300 text-sm"
              >
                Blazers
              </Link>
              <Link
                to="/collections"
                className="block text-muted-foreground hover:text-gold transition-colors duration-300 text-sm"
              >
                Collections
              </Link>
              <Link
                to="/category/new-arrivals"
                className="block text-muted-foreground hover:text-gold transition-colors duration-300 text-sm"
              >
                New Arrivals
              </Link>
            </nav>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-display text-lg text-foreground mb-6">Contact</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>Shop No. 15, Naqi Center</p>
              <p>71 Mall Road, Lahore</p>
              <a
                href="tel:+923334264511"
                className="block hover:text-gold transition-colors duration-300"
              >
                0333 426 4511
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground uppercase tracking-widest">
            © {new Date().getFullYear()} Suiting Club. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-px bg-gold" />
            <span className="text-xs text-gold uppercase tracking-widest">Est. 1999</span>
            <div className="w-8 h-px bg-gold" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
