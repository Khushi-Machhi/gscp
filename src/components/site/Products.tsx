import { Send, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import valve from "@/assets/p-valve.jpg";
import bellow from "@/assets/p-bellow.jpg";
import rods from "@/assets/p-rods.jpg";
import reactor from "@/assets/p-reactor.jpg";
import sight from "@/assets/p-sight.jpg";
import elbow from "@/assets/p-elbow.jpg";
import heat from "@/assets/p-heat.jpg";
import flange from "@/assets/p-flange.jpg";

const products = {
  "New Arrivals": [
    { name: "Bakelite Bonet And PTFE Valve", img: valve, tag: "Valves" },
    { name: "PTFE High Pressure Bellow", img: bellow, tag: "Bellows" },
    { name: "Teflon Rods", img: rods, tag: "PTFE" },
    { name: "MS PTFE Lined Header", img: heat, tag: "Lined" },
    { name: "PTFE Lined Equal Tees", img: elbow, tag: "Fittings" },
    { name: "PTFE Machined Bellow", img: bellow, tag: "Bellows" },
    { name: "Double Window Sight Glass", img: sight, tag: "Glass" },
    { name: "300mm PTFE Bellow", img: bellow, tag: "Bellows" },
  ],
  Featured: [
    { name: "PTFE Lap Seal", img: valve, tag: "Sealing" },
    { name: "50L Jacketed Glass Reactor", img: reactor, tag: "Glass" },
    { name: "SS PTFE Pbt Blade Stirrer", img: rods, tag: "Stirrer" },
    { name: "Glass Stirring Assembly", img: reactor, tag: "Glass" },
    { name: "PTFE Lined Reducing Flange", img: flange, tag: "Flanges" },
    { name: "PTFE Feed Pipes", img: elbow, tag: "Pipes" },
    { name: "45° MS PTFE Lined Elbow", img: elbow, tag: "Fittings" },
    { name: "PTFE Lined Plug Valve", img: valve, tag: "Valves" },
  ],
};

const Products = () => {
  const [tab, setTab] = useState<keyof typeof products>("New Arrivals");

  return (
    <section id="products" className="py-24 bg-gradient-soft relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top, hsl(205 90% 90%), transparent 60%)" }}
      />
      <div className="container relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold tracking-wider uppercase">
              Our Catalogue
            </span>
            <h2 className="mt-4 font-display font-bold text-4xl lg:text-5xl text-primary">
              Built for the world's most <span className="text-gradient">demanding processes</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Delivering PTFE Bellow, Double Window Sight Glass, PTFE Lined Reducing Flange, Glass Stirring
              Assembly and many other precision-engineered products.
            </p>
          </div>

          <div className="inline-flex p-1.5 bg-card border border-border rounded-full shadow-soft">
            {(Object.keys(products) as Array<keyof typeof products>).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-smooth ${
                  tab === t
                    ? "bg-gradient-brand text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products[tab].map((p, i) => (
            <article
              key={`${tab}-${p.name}-${i}`}
              className="group bg-card rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-hover transition-smooth hover:-translate-y-1.5 animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="relative aspect-square bg-gradient-to-br from-muted to-background overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  width={800}
                  height={800}
                  className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-background/85 backdrop-blur text-[10px] font-bold tracking-wider uppercase text-primary">
                  {p.tag}
                </span>
                <button
                  aria-label="Zoom"
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/85 backdrop-blur text-primary opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold text-base text-primary leading-snug min-h-[3rem]">
                  {p.name}
                </h3>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-primary transition-quick"
                >
                  <Send className="w-3.5 h-3.5" />
                  Send Inquiry
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="hero" size="lg" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Products;
