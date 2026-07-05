// import { Link } from "react-router-dom";
// import { Send, ArrowRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import { allProducts } from "@/data/catalog";

// const ProductsShowcase = () => {
//   const [tab, setTab] = useState<"new" | "featured">("new");
//   const list = tab === "new" ? allProducts.slice(0, 8) : allProducts.slice(8, 16);

//   return (
//     <section id="products" className="py-20 lg:py-24 bg-gradient-soft relative overflow-hidden">
//       <div
//         className="absolute inset-0 opacity-30 pointer-events-none"
//         style={{ background: "radial-gradient(ellipse at top, hsl(205 90% 90%), transparent 60%)" }}
//       />
//       <div className="container relative">
//         <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
//           <div className="max-w-2xl">
//             <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold tracking-wider uppercase">
//               Our Catalogue
//             </span>
//             <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary leading-tight">
//               Built for the world's most <span className="text-gradient">demanding processes</span>
//             </h2>
//             <p className="mt-4 text-muted-foreground text-base sm:text-lg">
//               Delivering PTFE Bellow, Double Window Sight Glass, PTFE Lined Reducing Flange, Glass Stirring
//               Assembly and many other precision-engineered products.
//             </p>
//           </div>

//           <div className="inline-flex p-1.5 bg-card border border-border rounded-full shadow-soft self-start">
//             {(["new", "featured"] as const).map((t) => (
//               <button
//                 key={t}
//                 onClick={() => setTab(t)}
//                 className={`px-5 py-2 rounded-full text-sm font-semibold transition-smooth ${
//                   tab === t
//                     ? "bg-gradient-brand text-primary-foreground shadow-soft"
//                     : "text-muted-foreground hover:text-primary"
//                 }`}
//               >
//                 {t === "new" ? "New Arrivals" : "Featured"}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
//           {list.map((p, i) => (
//             <article
//               key={`${tab}-${p.name}-${i}`}
//               className="group bg-card rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-hover transition-smooth hover:-translate-y-1.5 animate-fade-up"
//               style={{ animationDelay: `${i * 60}ms` }}
//             >
//               <Link to={`/products/${p.categorySlug}`} className="relative block aspect-square bg-gradient-to-br from-muted to-background overflow-hidden">
//                 <img
//                   src={p.img}
//                   alt={p.name}
//                   loading="lazy"
//                   width={800}
//                   height={800}
//                   className="w-full h-full object-cover transition-smooth group-hover:scale-110"
//                 />
//                 <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-background/85 backdrop-blur text-[10px] font-bold tracking-wider uppercase text-primary">
//                   {p.tag}
//                 </span>
//               </Link>
//               <div className="p-5">
//                 <h3 className="font-display font-semibold text-base text-primary leading-snug min-h-[3rem]">
//                   <Link to={`/products/${p.categorySlug}`} className="hover:text-secondary transition-quick">
//                     {p.name}
//                   </Link>
//                 </h3>
//                 <Link
//                   to="/contact"
//                   className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:text-primary transition-quick"
//                 >
//                   <Send className="w-3.5 h-3.5" />
//                   Send Inquiry
//                 </Link>
//               </div>
//             </article>
//           ))}
//         </div>

//         <div className="mt-12 text-center">
//           <Button asChild variant="hero" size="lg">
//             <Link to="/products">
//               View All Products <ArrowRight className="w-4 h-4" />
//             </Link>
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductsShowcase;


import { Link } from "react-router-dom";
import { Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const ProductsShowcase = () => {
  const [tab, setTab] = useState<"new" | "featured">("new");

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("name,slug,category,image,img,tag").order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  };

  const { data: products = [], isLoading } = useQuery({ queryKey: ["products"], queryFn: fetchProducts, retry: false });

  const list = (products || []).slice(0, 16);

  return (
    <section id="products" className="py-20 lg:py-24 bg-gradient-soft relative overflow-hidden">
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
            <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-primary leading-tight">
              Built for the world's most <span className="text-gradient">demanding processes</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-base sm:text-lg">
              Delivering PTFE Bellow, Double Window Sight Glass, PTFE Lined Reducing Flange, Glass Stirring
              Assembly and many other precision-engineered products.
            </p>
          </div>

          <div className="inline-flex p-1.5 bg-card border border-border rounded-full shadow-soft self-start">
            {(["new", "featured"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-smooth ${
                  tab === t
                    ? "bg-gradient-brand text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {t === "new" ? "New Arrivals" : "Featured"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {list.map((p, i) => (
            <article
              key={`${tab}-${p.name}-${i}`}
              className="group bg-card rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-hover transition-smooth hover:-translate-y-1.5 animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <Link to={`/products/${p.categorySlug}/${p.slug}`} className="relative block aspect-square bg-gradient-to-br from-muted to-background overflow-hidden">
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
              </Link>
              <div className="p-5">
                <h3 className="font-display font-semibold text-base text-primary leading-snug min-h-[3rem]">
                  <Link to={`/products/${p.categorySlug}/${p.slug}`} className="hover:text-secondary transition-quick">
                    {p.name}
                  </Link>
                </h3>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <Link
                    to={`/products/${p.categorySlug}/${p.slug}`}
                    className="text-sm font-semibold text-secondary hover:text-primary transition-quick"
                  >
                    View details →
                  </Link>
                  <Link
                    to="/contact"
                    aria-label="Send inquiry"
                    className="text-secondary hover:text-primary transition-quick"
                  >
                    <Send className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="hero" size="lg">
            <Link to="/products">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsShowcase;