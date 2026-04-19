import { ArrowRight, Beaker, Wrench, Layers, Gauge, Droplets, Cog } from "lucide-react";

const categories = [
  { icon: Wrench, name: "Bellows Expansion Joints", count: "12+ variants" },
  { icon: Cog, name: "Lined Valves", count: "PTFE • PFA" },
  { icon: Beaker, name: "Laboratory Glassware", count: "Premium grade" },
  { icon: Gauge, name: "Glass Heat Exchangers", count: "Shell & Tube" },
  { icon: Droplets, name: "Industrial Sight Glass", count: "Single & Double" },
  { icon: Layers, name: "PTFE Lined Fittings", count: "Tees • Elbows • Flanges" },
  { icon: Wrench, name: "PTFE Industrial Stirrer", count: "Custom builds" },
  { icon: Cog, name: "Industrial Bellows", count: "High-pressure" },
];

const Categories = () => {
  return (
    <section className="py-24 bg-gradient-soft">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold tracking-wider uppercase">
            Our Categories
          </span>
          <h2 className="mt-4 font-display font-bold text-4xl lg:text-5xl text-primary">
            A complete range of <span className="text-gradient">industrial solutions</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            From PTFE-lined fittings to laboratory glassware — explore product families engineered for
            performance, longevity and uncompromising safety.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map(({ icon: Icon, name, count }, i) => (
            <a
              key={name}
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative bg-card rounded-2xl p-6 border border-border hover:border-secondary/50 shadow-soft hover:shadow-hover transition-smooth animate-fade-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-brand opacity-0 group-hover:opacity-[0.04] transition-smooth" />
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-secondary/15 to-primary/10 text-secondary flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-smooth">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="mt-4 font-display font-semibold text-primary">{name}</h3>
              <div className="mt-1 text-xs text-muted-foreground">{count}</div>
              <ArrowRight className="absolute bottom-5 right-5 w-4 h-4 text-secondary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-smooth" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
