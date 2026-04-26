import { Link, useParams } from "react-router-dom";
import { ChevronRight, Send, Phone, CheckCircle2, ShieldCheck, Truck, Award, Factory } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { findProduct, categories } from "@/data/catalog";
import { useSEO } from "@/hooks/use-seo";
import NotFound from "@/pages/NotFound";

const ProductDetail = () => {
  const { slug = "", productSlug = "" } = useParams();
  const found = findProduct(slug, productSlug);

  useSEO(
    found
      ? `${found.product.name} | Gujarat Scientific And Polymer`
      : "Product not found",
    found?.product.shortDescription ?? "",
  );

  if (!found) return <NotFound />;
  const { category, product } = found;

  const related = category.products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <>
      {/* Breadcrumb / hero strip */}
      <section className="pt-28 lg:pt-32 pb-6 bg-gradient-soft border-b border-border">
        <div className="container">
          <nav className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-quick">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/products" className="hover:text-primary transition-quick">Products</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to={`/products/${category.slug}`} className="hover:text-primary transition-quick">
              {category.name}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-primary font-semibold line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Top: image + summary */}
      <section className="py-10 lg:py-14 bg-background">
        <div className="container grid lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Image */}
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-border shadow-elegant bg-gradient-to-br from-muted to-background aspect-square">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur text-[10px] font-bold tracking-wider uppercase text-primary">
                {product.tag}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[product.img, category.image, product.img].map((src, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl overflow-hidden border border-border bg-muted"
                >
                  <img src={src} alt="" className="w-full h-full object-cover opacity-90" />
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div>
            <span className="text-xs font-bold tracking-wider uppercase text-secondary">
              {category.name}
            </span>
            <h1 className="mt-2 font-display font-bold text-3xl md:text-4xl lg:text-5xl text-primary leading-tight">
              {product.name}
            </h1>

            {product.price && (
              <div className="mt-5 inline-flex items-baseline gap-2 px-5 py-3 rounded-xl bg-gradient-brand text-primary-foreground shadow-elegant">
                <span className="text-xs uppercase tracking-wider opacity-80">Price</span>
                <span className="font-display font-bold text-2xl">{product.price}</span>
              </div>
            )}

            <p className="mt-5 text-base text-muted-foreground leading-relaxed">
              {product.shortDescription}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="px-4 py-3 rounded-xl bg-muted">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  MOQ
                </div>
                <div className="font-semibold text-primary">{product.moq}</div>
              </div>
              <div className="px-4 py-3 rounded-xl bg-muted">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Delivery
                </div>
                <div className="font-semibold text-primary">7 Days</div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">
                  <Send className="w-4 h-4" /> Send Inquiry
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:+91 9824202661">
                  <Phone className="w-4 h-4" /> Request Callback
                </a>
              </Button>
            </div>

            {/* Trust strip */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: ShieldCheck, label: "Quality Tested" },
                { icon: Award, label: "ISO Standards" },
                { icon: Factory, label: "Made in India" },
                { icon: Truck, label: "Worldwide Shipping" },
              ].map((b) => (
                <div
                  key={b.label}
                  className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl border border-border bg-card"
                >
                  <b.icon className="w-5 h-5 text-secondary" />
                  <span className="text-[11px] font-semibold text-primary">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-12 lg:py-16 bg-gradient-soft">
        <div className="container">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold tracking-wider uppercase text-secondary">
              Technical
            </span>
            <h2 className="mt-2 font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-primary">
              {product.name} Specifications
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {product.specs.map((s, i) => (
                    <tr
                      key={s.label}
                      className={i % 2 === 0 ? "bg-muted/40" : "bg-card"}
                    >
                      <td className="px-5 py-3.5 font-semibold text-primary w-1/2 sm:w-2/5 align-top">
                        {s.label}
                      </td>
                      <td className="px-5 py-3.5 text-foreground/80">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <aside className="bg-gradient-brand text-primary-foreground rounded-2xl p-6 shadow-elegant self-start">
              <div className="font-display font-bold text-xl">
                Need a custom spec?
              </div>
              <p className="mt-2 text-sm text-primary-foreground/80">
                Share your operating pressure, temperature and media — our team will recommend
                the right size and material.
              </p>
              <Button asChild variant="glass" size="sm" className="mt-5">
                <Link to="/contact">Talk to an expert</Link>
              </Button>
              <div className="mt-6 pt-6 border-t border-primary-foreground/20 space-y-1.5 text-sm">
                <div className="font-semibold">Vadodara, Gujarat — India</div>
                <a href="tel:+919998447474" className="block opacity-80 hover:opacity-100">
                  +91 99984 47474
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Long description + highlights */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <span className="text-xs font-bold tracking-wider uppercase text-secondary">
              About this product
            </span>
            <h2 className="mt-2 font-display font-bold text-2xl sm:text-3xl text-primary">
              About {product.name}
            </h2>
            <p className="mt-5 text-foreground/80 leading-relaxed">
              {product.longDescription}
            </p>

            <div className="mt-8 space-y-5">
              {product.highlights.map((h) => (
                <div
                  key={h.title}
                  className="p-5 rounded-2xl border border-border bg-card shadow-soft"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 w-9 h-9 rounded-lg bg-gradient-brand flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-primary">{h.title}</h3>
                      <p className="mt-1 text-sm text-foreground/70 leading-relaxed">{h.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28 self-start">
            <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
              <div className="px-5 py-4 bg-primary text-primary-foreground font-display font-bold">
                Trade Information
              </div>
              <ul className="divide-y divide-border">
                {product.trade.map((t) => (
                  <li key={t.label} className="px-5 py-3 text-sm">
                    <div className="font-semibold text-primary">{t.label}</div>
                    <div className="text-foreground/70 mt-0.5">{t.value}</div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 lg:py-16 bg-gradient-soft">
        <div className="container max-w-4xl">
          <span className="text-xs font-bold tracking-wider uppercase text-secondary">
            FAQs
          </span>
          <h2 className="mt-2 font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-primary">
            Frequently asked questions
          </h2>
          <Accordion type="single" collapsible className="mt-8 space-y-3">
            {product.faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-card border border-border rounded-xl px-5 shadow-soft"
              >
                <AccordionTrigger className="text-left font-semibold text-primary hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/75 leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="py-12 lg:py-16 bg-background border-t border-border">
          <div className="container">
            <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
              <div>
                <span className="text-xs font-bold tracking-wider uppercase text-secondary">
                  Explore more
                </span>
                <h2 className="mt-2 font-display font-bold text-2xl sm:text-3xl text-primary">
                  More from {category.name}
                </h2>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to={`/products/${category.slug}`}>View all</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/products/${category.slug}/${r.slug}`}
                  className="group bg-card rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-hover transition-smooth hover:-translate-y-1.5"
                >
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={r.img}
                      alt={r.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-semibold text-sm text-primary leading-snug line-clamp-2 min-h-[2.5rem]">
                      {r.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom: also browse other categories */}
      <section className="py-10 bg-primary text-primary-foreground">
        <div className="container">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-semibold opacity-80 mr-2">Browse categories:</span>
            {categories.map((c) => (
              <Link
                key={c.slug}
                to={`/products/${c.slug}`}
                className={`text-xs px-3 py-1.5 rounded-full transition-quick ${
                  c.slug === category.slug
                    ? "bg-primary-foreground text-primary font-semibold"
                    : "bg-primary-foreground/10 hover:bg-primary-foreground/20"
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;