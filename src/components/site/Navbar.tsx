import { useEffect, useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const productLinks = [
  "Bellows Expansion Joints",
  "Lined Valves",
  "Laboratory Glassware",
  "Glass Heat Exchangers",
  "Industrial Sight Glass",
  "PTFE Lined Fittings",
  "Industrial Bellows",
  "PTFE Industrial Stirrer",
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-smooth ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-20">
        <a href="#home" className="flex items-center gap-3 group">
          <img
            src={logo}
            alt="Gujarat Scientific and Polymer logo"
            className="h-12 w-12 object-contain transition-smooth group-hover:scale-105"
            width={48}
            height={48}
          />
          <div className="hidden sm:block leading-tight">
            <div className="font-display font-bold text-base text-primary tracking-tight">
              GUJARAT SCIENTIFIC
            </div>
            <div className="text-[10px] font-semibold text-secondary tracking-[0.2em] uppercase">
              And Polymer
            </div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          <button onClick={() => scrollTo("home")} className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-quick">
            Home
          </button>
          <button onClick={() => scrollTo("about")} className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-quick">
            Company
          </button>
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              onClick={() => scrollTo("products")}
              className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-quick flex items-center gap-1"
            >
              Products <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {productsOpen && (
              <div className="absolute top-full left-0 pt-2 w-72 animate-fade-in">
                <div className="bg-card rounded-xl shadow-elegant border border-border p-2 grid">
                  {productLinks.map((p) => (
                    <button
                      key={p}
                      onClick={() => scrollTo("products")}
                      className="text-left text-sm px-3 py-2 rounded-lg hover:bg-muted transition-quick text-foreground/80 hover:text-primary"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button onClick={() => scrollTo("why")} className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-quick">
            Why Us
          </button>
          <button onClick={() => scrollTo("contact")} className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-quick">
            Contact
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+91" className="hidden xl:flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-quick">
            <Phone className="w-4 h-4" />
            <span className="font-medium">Call Us</span>
          </a>
          <Button variant="hero" size="sm" onClick={() => scrollTo("contact")}>
            Get a Quote
          </Button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-primary"
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border animate-fade-in">
          <div className="container py-4 flex flex-col gap-1">
            {[
              ["Home", "home"],
              ["Company", "about"],
              ["Products", "products"],
              ["Why Us", "why"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-left px-3 py-3 text-base font-medium text-foreground/80 hover:bg-muted rounded-lg"
              >
                {label}
              </button>
            ))}
            <Button variant="hero" className="mt-2" onClick={() => scrollTo("contact")}>
              Get a Quote
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
