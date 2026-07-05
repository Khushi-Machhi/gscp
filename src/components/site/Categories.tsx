import { Link } from "react-router-dom";
import { ArrowRight, Beaker, Wrench, Layers, Gauge, Droplets, Cog } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const iconMap: Record<string, typeof Wrench> = {
  "bellows-expansion-joints": Wrench,
  "lined-valves": Cog,
  "laboratory-glassware": Beaker,
  "glass-heat-exchangers": Gauge,
  "industrial-sight-glass": Droplets,
  "ptfe-lined-fittings": Layers,
  "ptfe-products": Wrench,
  "food-product-kettles": Cog,
};

const Categories = () => {
  const fetchCategories = async () => {
    const { data, error } = await supabase.from("categories").select("id,name,slug,short,description,image").order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  };

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    retry: false,
  });
  return (
    <section className="py-20 lg:py-24 bg-gradient-soft">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold tracking-wider uppercase">
            Our Categories
          </span>
          <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary leading-tight">
            A complete range of <span className="text-gradient">industrial solutions</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            From PTFE-lined fittings to laboratory glassware — explore product families engineered for
            performance, longevity and uncompromising safety.
          </p>
        </div>

        <div className="mt-12 sm:mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((c, i) => {
            const Icon = iconMap[c.slug] ?? Wrench;
            return (
              <Link
                key={c.slug}
                to={`/products/${c.slug}`}
                className="group relative bg-card rounded-2xl p-5 sm:p-6 border border-border hover:border-secondary/50 shadow-soft hover:shadow-hover transition-smooth animate-fade-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-brand opacity-0 group-hover:opacity-[0.04] transition-smooth" />
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-secondary/15 to-primary/10 text-secondary flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-smooth">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="mt-4 font-display font-semibold text-primary text-sm sm:text-base">{c.name}</h3>
                <div className="mt-1 text-xs text-muted-foreground">{c.short}</div>
                <ArrowRight className="absolute bottom-5 right-5 w-4 h-4 text-secondary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-smooth" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
