import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactCTA = () => (
  <section className="py-20 bg-background">
    <div className="container">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-hero p-10 lg:p-16 text-primary-foreground shadow-elegant">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div
          className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(circle, hsl(205 90% 60%), transparent 70%)" }}
        />
        <div className="relative grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-block px-3 py-1 rounded-full glass text-xs font-semibold tracking-wider uppercase">
              Get in Touch
            </span>
            <h2 className="mt-4 font-display font-bold text-3xl lg:text-5xl leading-tight">
              Ready to discuss your <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">requirement?</span>
            </h2>
            <p className="mt-4 text-primary-foreground/80 text-lg max-w-xl">
              Get a quotation, request a price list or talk to our technical team — we typically reply within one
              business day.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 lg:items-end lg:justify-end">
            <Button asChild variant="hero" size="lg">
              <Link to="/contact">
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg">
              <a href="tel:+91 9824202661">
                <Phone className="w-4 h-4" /> Call Us
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ContactCTA;
