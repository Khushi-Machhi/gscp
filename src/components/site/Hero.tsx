import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [
  {
    image: hero1,
    eyebrow: "Industrial Excellence Since 2016",
    title: ["Building ", "Smarter ", "Operations"],
    subtitle:
      "Transitioning to a new admin dashboard backed by Supabase for modern product and process management.",
    cta1: "Contact Us",
    cta2: "Learn More",
    target1: "/contact",
    target2: "/company",
  },
  {
    image: hero2,
    eyebrow: "Future-Ready Systems",
    title: ["Admin ", "Dashboards ", "for Growth"],
    subtitle:
      "Secure, scalable data storage and management for your internal operations with a clear roadmap to Supabase integration.",
    cta1: "Get in Touch",
    cta2: "Read Company Info",
    target1: "/contact",
    target2: "/company",
  },
  {
    image: hero3,
    eyebrow: "Data-Driven Decisions",
    title: ["Manage ", "Everything ", "From One Place"],
    subtitle:
      "Our next step is a lightweight admin experience that moves product data off the page and into a secure backend.",
    cta1: "Contact Now",
    cta2: "Visit Company",
    target1: "/contact",
    target2: "/company",
  },
];

const Hero = () => {
  const [active, setActive] = useState(0);

  const go = useCallback((dir: number) => {
    setActive((p) => (p + dir + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const t = setInterval(() => go(1), 6500);
    return () => clearInterval(t);
  }, [go]);

  return (
    <section id="home" className="relative h-[100svh] overflow-hidden bg-primary">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 h-full transition-opacity duration-[1400ms] ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={s.image}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${
              i === active ? "scale-110" : "scale-100"
            }`}
            width={1920}
            height={1080}
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/75 to-primary/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(205 90% 55% / 0.5), transparent 70%)" }}
      />

      <div className="relative container min-h-[100svh] flex flex-col justify-center pt-28 pb-32 z-10">
        <div className="max-w-3xl text-primary-foreground">
          <div key={`eyebrow-${active}`} className="animate-slide-right">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-[10px] sm:text-xs font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              {slides[active].eyebrow}
            </span>
          </div>

          <h1
            key={`title-${active}`}
            className="mt-6 font-display font-bold text-3xl sm:text-5xl lg:text-7xl leading-[1.05] animate-fade-up"
          >
            {slides[active].title[0]}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary-glow to-accent">
              {slides[active].title[1]}
            </span>
            {slides[active].title[2]}
          </h1>

          <p
            key={`sub-${active}`}
            className="mt-5 sm:mt-6 text-base sm:text-lg lg:text-xl text-primary-foreground/85 max-w-2xl leading-relaxed animate-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            {slides[active].subtitle}
          </p>

          <div
            key={`cta-${active}`}
            className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4 animate-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            <Button asChild variant="hero" size="lg">
              <Link to={slides[active].target1}>
                {slides[active].cta1}
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg">
              <Link to={slides[active].target2}>{slides[active].cta2}</Link>
            </Button>
          </div>

          <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-6 max-w-xl">
            {[
              ["8+", "Years"],
              ["500+", "Clients"],
              ["50+", "Products"],
            ].map(([n, l]) => (
              <div key={l} className="border-l-2 border-secondary/60 pl-3 sm:pl-4">
                <div className="font-display font-bold text-xl sm:text-2xl lg:text-3xl">{n}</div>
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-primary-foreground/70">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-8 inset-x-0 z-20">
        <div className="container flex items-center justify-between gap-6">
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-smooth ${
                  i === active ? "w-12 bg-secondary" : "w-6 bg-primary-foreground/30 hover:bg-primary-foreground/50"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => go(-1)}
              aria-label="Previous slide"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full glass text-primary-foreground hover:bg-secondary hover:border-secondary transition-smooth flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next slide"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full glass text-primary-foreground hover:bg-secondary hover:border-secondary transition-smooth flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
