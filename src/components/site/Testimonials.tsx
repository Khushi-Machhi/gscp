import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Procurement Head",
    role: "Chemical Processing Industry",
    quote:
      "Reliable engineering support and fast turnaround. Their team helps us keep operations moving with minimal downtime.",
  },
  {
    name: "Plant Manager",
    role: "Pharmaceutical Manufacturing",
    quote:
      "Their systems are robust and the service team is responsive. We trust them for every technical challenge.",
  },
  {
    name: "Operations Lead",
    role: "Food Processing Unit",
    quote:
      "Strong delivery performance, clear communication and excellent quality controls across every project.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold tracking-wider uppercase">
            Client Trust
          </span>
          <h2 className="mt-4 font-display font-bold text-4xl lg:text-5xl text-primary">
            Trusted by industries that <span className="text-gradient">cannot compromise</span>
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              className="relative bg-gradient-card rounded-2xl p-7 border border-border shadow-soft hover:shadow-hover transition-smooth animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-secondary/15" />
              <div className="flex gap-1 text-secondary">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-foreground/85 leading-relaxed">"{t.quote}"</blockquote>
              <figcaption className="mt-6 pt-5 border-t border-border">
                <div className="font-display font-semibold text-primary">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Trust strip */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 lg:p-8 rounded-2xl bg-gradient-soft border border-border">
          {[
            ["8+", "Years of trust"],
            ["500+", "B2B clients"],
            ["50+", "Custom solutions"],
            ["100%", "Quality focus"],
          ].map(([n, l]) => (
            <div key={l} className="text-center">
              <div className="font-display font-bold text-3xl lg:text-4xl text-gradient">{n}</div>
              <div className="mt-1 text-sm text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
