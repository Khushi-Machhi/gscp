import { Link } from "react-router-dom";
import { ArrowRight, Send } from "lucide-react";
import PageHeader from "@/components/site/PageHeader";
import { categories, allProducts } from "@/data/catalog";
import { useSEO } from "@/hooks/use-seo";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ProductsPage = () => {
  useSEO(
    "Our Products | Gujarat Scientific And Polymer",
    "Browse our complete range of PTFE products, lined valves, glass heat exchangers, sight glass, fittings and industrial glassware.",
  );
  const [tab, setTab] = useState<"all" | "categories">("all");

  return (
    <>
      <PageHeader
        eyebrow="Our Products"
        title="Complete Industrial Catalogue"
        subtitle="Browse our full range of PTFE, polymer and glass products engineered for demanding industries."
      />

      <section className="py-16 lg:py-20 bg-gradient-soft">
        <div className="container">
          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1.5 bg-card border border-border rounded-full shadow-soft">
              {[
                ["all", "All Products"],
                ["categories", "By Category"],
              ].map(([k, l]) => (
                <button
                  key={k}
                  onClick={() => setTab(k as typeof tab)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-smooth ${
                    tab === k
                      ? "bg-gradient-brand text-primary-foreground shadow-soft"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {tab === "categories" ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((c, i) => (
                <Link
                  key={c.slug}
                  to={`/products/${c.slug}`}
                  className="group bg-card rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-hover transition-smooth hover:-translate-y-1.5 animate-fade-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={c.image}
                      alt={c.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-secondary font-semibold uppercase tracking-wider">
                      {c.short}
                    </div>
                    <h3 className="mt-1 font-display font-semibold text-lg text-primary">{c.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{c.description}</p>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary group-hover:gap-3 transition-smooth">
                      View category <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allProducts.map((p, i) => (
                <article
                  key={`${p.name}-${i}`}
                  className="group bg-card rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-hover transition-smooth hover:-translate-y-1.5 animate-fade-up"
                  style={{ animationDelay: `${(i % 12) * 50}ms` }}
                >
                  <Link to={`/products/${p.categorySlug}`} className="block aspect-square overflow-hidden bg-gradient-to-br from-muted to-background">
                    <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-smooth group-hover:scale-110" />
                  </Link>
                  <div className="p-5">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-secondary">{p.tag}</span>
                    <h3 className="mt-1 font-display font-semibold text-base text-primary leading-snug min-h-[3rem]">
                      <Link to={`/products/${p.categorySlug}`}>{p.name}</Link>
                    </h3>
                    <Link
                      to="/contact"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-primary transition-quick"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Send Inquiry
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-14 text-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/contact">Request Custom Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsPage;
