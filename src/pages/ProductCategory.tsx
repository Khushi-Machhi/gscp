// import { Link, useParams } from "react-router-dom";
// import { ArrowLeft, Send, CheckCircle2 } from "lucide-react";
// import PageHeader from "@/components/site/PageHeader";
// import { findCategory, categories } from "@/data/catalog";
// import { useSEO } from "@/hooks/use-seo";
// import { Button } from "@/components/ui/button";
// import NotFound from "@/pages/NotFound";

// const ProductCategory = () => {
//   const { slug = "" } = useParams();
//   const cat = findCategory(slug);

//   useSEO(
//     cat ? `${cat.name} | Gujarat Scientific And Polymer` : "Category not found",
//     cat?.description ?? "",
//   );

//   if (!cat) return <NotFound />;

//   return (
//     <>
//       <PageHeader eyebrow="Product Category" title={cat.name} subtitle={cat.description} />

//       <section className="py-16 lg:py-20 bg-gradient-soft">
//         <div className="container">
//           <Link
//             to="/products"
//             className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-primary mb-8 transition-quick"
//           >
//             <ArrowLeft className="w-4 h-4" /> Back to all products
//           </Link>

//           <div className="grid lg:grid-cols-3 gap-8">
//             <aside className="lg:col-span-1 space-y-2 lg:sticky lg:top-28 self-start">
//               <div className="bg-card rounded-2xl p-5 border border-border shadow-soft">
//                 <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
//                   All Categories
//                 </div>
//                 <ul className="space-y-1">
//                   {categories.map((c) => (
//                     <li key={c.slug}>
//                       <Link
//                         to={`/products/${c.slug}`}
//                         className={`block px-3 py-2 rounded-lg text-sm transition-quick ${
//                           c.slug === slug
//                             ? "bg-gradient-brand text-primary-foreground font-semibold"
//                             : "text-foreground/80 hover:bg-muted hover:text-primary"
//                         }`}
//                       >
//                         {c.name}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="bg-gradient-brand text-primary-foreground rounded-2xl p-6 shadow-elegant">
//                 <div className="font-display font-bold text-lg">Need a custom solution?</div>
//                 <p className="mt-2 text-sm text-primary-foreground/80">
//                   Talk to our team for sizes, materials and bulk orders.
//                 </p>
//                 <Button asChild variant="glass" size="sm" className="mt-4">
//                   <Link to="/contact">Talk to an expert</Link>
//                 </Button>
//               </div>
//             </aside>

//             <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
//               {cat.products.map((p, i) => (
//                 <article
//                   key={p.name}
//                   className="group bg-card rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-hover transition-smooth hover:-translate-y-1.5 animate-fade-up"
//                   style={{ animationDelay: `${i * 60}ms` }}
//                 >
//                   <div className="aspect-square overflow-hidden bg-gradient-to-br from-muted to-background">
//                     <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-smooth group-hover:scale-110" />
//                   </div>
//                   <div className="p-5">
//                     <span className="text-[10px] font-bold tracking-wider uppercase text-secondary">{p.tag}</span>
//                     <h3 className="mt-1 font-display font-semibold text-base text-primary">{p.name}</h3>
//                     <ul className="mt-3 space-y-1">
//                       {["Industry-grade material", "Custom sizes available", "Quality tested"].map((f) => (
//                         <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
//                           <CheckCircle2 className="w-3.5 h-3.5 text-secondary" /> {f}
//                         </li>
//                       ))}
//                     </ul>
//                     <Button asChild variant="hero" size="sm" className="mt-4 w-full">
//                       <Link to="/contact">
//                         <Send className="w-3.5 h-3.5" /> Send Inquiry
//                       </Link>
//                     </Button>
//                   </div>
//                 </article>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default ProductCategory;


import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/site/PageHeader";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useSEO } from "@/hooks/use-seo";
import { Button } from "@/components/ui/button";
import NotFound from "@/pages/NotFound";

const ProductCategory = () => {
  const { slug = "" } = useParams();
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

  useEffect(() => {
    if (!categoriesLoading && (!categories || categories.length === 0)) {
      (async () => {
        try {
          const { data, error } = await supabase.from("categories").select("id").limit(1);
          if (error) throw error;
          // if no rows, warn
          if (!data || data.length === 0) {
            // eslint-disable-next-line no-console
            console.warn("Supabase categories table empty");
          }
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error("Categories fetch error:", err);
        }
      })();
    }
  }, [categories, categoriesLoading]);

  const fetchCategoryProducts = async () => {
    const { data, error } = await supabase.from("products").select("*").eq("category", slug).order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  };

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["categoryProducts", slug],
    queryFn: fetchCategoryProducts,
    enabled: !!slug,
    retry: false,
  });

  const cat = categories.find((c: any) => c.slug === slug);

  useSEO(cat ? `${cat.name} | Gujarat Scientific And Polymer` : "Category not found", cat?.description ?? "");

  if (categoriesLoading || productsLoading) return <p className="p-8">Loading...</p>;
  if (!cat) return <NotFound />;

  return (
    <>
      <PageHeader eyebrow="Product Category" title={cat.name} subtitle={cat.description} />

      <section className="py-16 lg:py-20 bg-gradient-soft">
        <div className="container">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-primary mb-8 transition-quick"
          >
            <ArrowLeft className="w-4 h-4" /> Back to all products
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            <aside className="lg:col-span-1 space-y-2 lg:sticky lg:top-28 self-start">
              <div className="bg-card rounded-2xl p-5 border border-border shadow-soft">
                <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
                  All Categories
                </div>
                <ul className="space-y-1">
                  {categories.map((c: any) => (
                    <li key={c.slug}>
                      <Link
                        to={`/products/${c.slug}`}
                        className={`block px-3 py-2 rounded-lg text-sm transition-quick ${
                          c.slug === slug
                            ? "bg-gradient-brand text-primary-foreground font-semibold"
                            : "text-foreground/80 hover:bg-muted hover:text-primary"
                        }`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-brand text-primary-foreground rounded-2xl p-6 shadow-elegant">
                <div className="font-display font-bold text-lg">Need a custom solution?</div>
                <p className="mt-2 text-sm text-primary-foreground/80">
                  Talk to our team for sizes, materials and bulk orders.
                </p>
                <Button asChild variant="glass" size="sm" className="mt-4">
                  <Link to="/contact">Talk to an expert</Link>
                </Button>
              </div>
            </aside>

            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              {products.map((p: any, i: number) => (
                <article
                  key={p.name}
                  className="group bg-card rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-hover transition-smooth hover:-translate-y-1.5 animate-fade-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <Link to={`/products/${cat.slug}/${p.slug}`} className="block aspect-square overflow-hidden bg-gradient-to-br from-muted to-background">
                    <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-smooth group-hover:scale-110" />
                  </Link>
                  <div className="p-5">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-secondary">{p.tag}</span>
                    <h3 className="mt-1 font-display font-semibold text-base text-primary leading-snug">
                      <Link to={`/products/${cat.slug}/${p.slug}`} className="hover:text-secondary transition-quick">
                        {p.name}
                      </Link>
                    </h3>
                    <ul className="mt-3 space-y-1">
                      {["Industry-grade material", "Custom sizes available", "Quality tested"].map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="w-3.5 h-3.5 text-secondary" /> {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex gap-2">
                      <Button asChild variant="hero" size="sm" className="flex-1">
                        <Link to={`/products/${cat.slug}/${p.slug}`}>View Details</Link>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <Link to="/contact" aria-label="Send inquiry">
                          <Send className="w-3.5 h-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductCategory;