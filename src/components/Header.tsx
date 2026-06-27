import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Sherwani", href: "/category/sherwani" },
  { name: "Suits", href: "/category/suits" },
  { name: "Blazers", href: "/category/blazers" },
  { name: "Eastern", href: "/category/eastern" },
  { name: "Western", href: "/category/western" },
  { name: "New Arrivals", href: "/category/new-arrivals" },
  { name: "Collections", href: "/collections" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || !isHome
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start">
            <span className="font-display text-2xl lg:text-3xl text-foreground tracking-wide">
              Suiting Club
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-0.5">
              Lahore
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-xs uppercase tracking-widest transition-colors duration-300 ${location.pathname === link.href
                    ? "text-gold"
                    : "text-muted-foreground hover:text-primary"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Contact CTA - Desktop */}
          <a
            href="tel:+923334264511"
            className="hidden lg:block text-sm uppercase tracking-widest text-foreground hover:text-primary transition-colors duration-300"
          >
            Contact
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-foreground p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border"
          >
            <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm uppercase tracking-widest transition-colors duration-300 py-2 ${location.pathname === link.href
                      ? "text-gold"
                      : "text-muted-foreground hover:text-primary"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="tel:+923334264511"
                className="text-sm uppercase tracking-widest text-foreground hover:text-primary transition-colors duration-300 py-2 border-t border-border mt-2 pt-4"
              >
                Contact
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
