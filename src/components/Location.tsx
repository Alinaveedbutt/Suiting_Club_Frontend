import { motion } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Location = () => {
  return (
    <section id="location" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold uppercase tracking-[0.3em] text-sm">Find Us</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mt-4">
              Visit Our Store
            </h2>
            <div className="w-24 h-px bg-gold mx-auto mt-8" />
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square lg:aspect-auto lg:h-full min-h-[400px] bg-charcoal border border-border overflow-hidden"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3400.3851267823573!2d74.3291!3d31.5573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMzJzI2LjMiTiA3NMKwMTknNDQuOCJF!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Suiting Club Location"
              className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
            {/* Overlay Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none">
              <div className="relative">
                <div className="w-4 h-4 bg-gold rounded-full animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gold/30 rounded-full animate-ping" />
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-8">
              {/* Address */}
              <div className="flex gap-5">
                <div className="w-12 h-12 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground mb-2">Address</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Shop No. 15, Naqi Center<br />
                    71 Mall Road, Lahore<br />
                    Pakistan
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-5">
                <div className="w-12 h-12 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground mb-2">Store Hours</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Monday – Saturday: 11:00 AM – 9:00 PM<br />
                    Sunday: 2:00 PM – 8:00 PM
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-5">
                <div className="w-12 h-12 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground mb-2">Contact</h3>
                  <a
                    href="tel:+923334264511"
                    className="text-muted-foreground hover:text-gold transition-colors duration-300"
                  >
                    0333 426 4511
                  </a>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 pt-8 border-t border-border">
              <Button variant="goldOutline" size="lg" asChild>
                <a
                  href="https://maps.google.com/?q=Shop+No.+15,+Naqi+Center,+71+Mall+Road,+Lahore"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Location;
