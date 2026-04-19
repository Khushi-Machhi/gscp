import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, ArrowUp } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div
        className="absolute -top-40 left-1/3 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
        style={{ background: "radial-gradient(circle, hsl(205 90% 60%), transparent 70%)" }}
      />

      <div className="container relative pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Logo" className="h-12 w-12 object-contain" width={48} height={48} />
              <div>
                <div className="font-display font-bold text-lg leading-tight">GUJARAT SCIENTIFIC</div>
                <div className="text-[10px] tracking-[0.25em] text-secondary font-semibold uppercase">
                  And Polymer
                </div>
              </div>
            </div>
            <p className="mt-5 text-primary-foreground/70 text-sm leading-relaxed max-w-sm">
              A trusted manufacturer and supplier of PTFE products, lined valves, glass equipment and industrial
              hardware — engineered for the world's most demanding processes.
            </p>
            <div className="mt-6 flex gap-2">
              {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social"
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-secondary hover:border-secondary transition-smooth"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <div className="font-display font-semibold text-base mb-4">Company</div>
            <ul className="space-y-2.5 text-sm text-primary-foreground/70">
              {["Home", "Company Profile", "Our Products", "Why Us", "Contact Us"].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-secondary transition-quick">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            <div className="font-display font-semibold text-base mb-4">Products</div>
            <ul className="space-y-2.5 text-sm text-primary-foreground/70">
              {[
                "Bellows Expansion Joints",
                "Lined Valves",
                "Laboratory Glassware",
                "Glass Heat Exchangers",
                "Industrial Sight Glass",
                "PTFE Lined Fittings",
              ].map((l) => (
                <li key={l}>
                  <a href="#products" className="hover:text-secondary transition-quick">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <div className="font-display font-semibold text-base mb-4">Get in Touch</div>
            <ul className="space-y-3 text-sm text-primary-foreground/75">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-secondary shrink-0" />
                <span>Gujarat, India</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-secondary shrink-0" />
                <span>+91 — Call for quotation</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-secondary shrink-0" />
                <span>info@gujaratscientific.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/60">
            © {new Date().getFullYear()} Gujarat Scientific And Polymer. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-primary-foreground/60 hover:text-secondary">Terms of Use</a>
            <a href="#" className="text-xs text-primary-foreground/60 hover:text-secondary">Privacy</a>
            <button
              onClick={scrollTop}
              aria-label="Back to top"
              className="ml-2 w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center hover:shadow-glow transition-smooth"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
