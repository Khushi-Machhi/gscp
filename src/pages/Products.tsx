


import { Link } from "react-router-dom";
import { ArrowRight, Send } from "lucide-react";
import PageHeader from "@/components/site/PageHeader";
import { useSEO } from "@/hooks/use-seo";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

const ProductsPage = () => {
  useSEO(
    "Our Products | Gujarat Scientific And Polymer",
    "Browse our complete range of PTFE products, lined valves, glass heat exchangers, sight glass, fittings and industrial glassware.",
  );
  const [tab, setTab] = useState<"all" | "categories">("all");

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  };

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    retry: false,
  });

  const fetchCategories = async () => {
    const { data, error } = await supabase.from("categories").select("id,name,slug,created_at").order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  };

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    retry: false,
  });

  // surface errors if categories fail to load
  // note: react-query will throw on error because fetchCategories throws; useQuery returns an error in that case
  // but we can catch it via the queryClient or by wrapping fetch; simpler: run a side-effect when categories array is empty and not loading
  useEffect(() => {
    if (!categoriesLoading && (!categories || categories.length === 0)) {
      // attempt a direct check to see if the table is returning rows
      (async () => {
        try {
          const { data, error } = await supabase.from("categories").select("id").limit(1);
          if (error) throw error;
          if (!data || data.length === 0) {
            toast({ title: "No categories found", description: "Categories table returned no rows." });
          }
        } catch (err: any) {
          toast({ title: "Failed fetching categories", description: String(err?.message ?? err) });
        }
      })();
    }
  }, [categories, categoriesLoading]);

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
              {categories.map((c: any, i: number) => {
                const image = c.image ?? `/assets/products/category-${c.slug}.jpeg`;
                const short = c.short ?? "";
                const description = c.description ?? "";
                return (
                  <Link
                    key={c.slug}
                    to={`/products/${c.slug}`}
                    className="group bg-card rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-hover transition-smooth hover:-translate-y-1.5 animate-fade-up"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={image}
                        alt={c.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <div className="text-xs text-secondary font-semibold uppercase tracking-wider">
                        {short}
                      </div>
                      <h3 className="mt-1 font-display font-semibold text-lg text-primary">{c.name}</h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{description}</p>
                      <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary group-hover:gap-3 transition-smooth">
                        View category <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(products || []).map((p: any, i: number) => {
                const categorySlug = p.category ?? "uncategorized";
                const img = p.image_url ?? p.img ?? "/assets/products/placeholder.jpeg";
                return (
                  <article
                    key={`${p.name ?? p.slug}-${i}`}
                    className="group bg-card rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-hover transition-smooth hover:-translate-y-1.5 animate-fade-up"
                    style={{ animationDelay: `${(i % 12) * 50}ms` }}
                  >
                    <div className="block aspect-square overflow-hidden bg-gradient-to-br from-muted to-background">
                      <img src={img} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-smooth" />
                    </div>
                    <div className="p-5">
                      <span className="text-[10px] font-bold tracking-wider uppercase text-secondary">{p.tag ?? ""}</span>
                      <h3 className="mt-1 font-display font-semibold text-base text-primary leading-snug min-h-[3rem]">
                        {p.name}
                      </h3>
                    </div>
                  </article>
                );
              })}
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