import { motion } from "framer-motion";
import craftsmanshipImage from "@/assets/craftsmanship.jpg";

const features = [
  {
    title: "Premium Fabrics",
    description: "Hand-selected materials from the finest mills worldwide.",
  },
  {
    title: "Expert Craftsmanship",
    description: "Decades of tailoring expertise in every piece.",
  },
  {
    title: "Personal Service",
    description: "Dedicated consultations for your perfect fit.",
  },
];

const Craftsmanship = () => {
  return (
    <section id="craftsmanship" className="py-24 lg:py-32 bg-charcoal-light">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden">
              <img
                src={craftsmanshipImage}
                alt="Master tailor working on premium suiting fabric"
                loading="lazy"
                className="w-full aspect-[4/3] object-cover"
              />
              {/* Decorative Frame */}
              <div className="absolute inset-4 border border-gold/30 pointer-events-none" />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 lg:-right-10 bg-background p-6 lg:p-8 border border-border">
              <span className="font-display text-4xl lg:text-5xl text-gold">25+</span>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                Years of Excellence
              </p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold uppercase tracking-[0.3em] text-sm">Our Promise</span>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mt-4 mb-6">
              The Art of
              <br />
              Fine Tailoring
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              At Suiting Club, we believe that exceptional suiting begins with an 
              uncompromising commitment to quality. Every fabric in our collection 
              is chosen for its texture, durability, and timeless appeal.
            </p>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 items-start"
                >
                  <div className="w-2 h-2 bg-gold mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="font-display text-xl text-foreground mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Craftsmanship;
