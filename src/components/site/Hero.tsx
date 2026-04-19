import { useEffect, useState, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [
  {
    image: hero1,
    eyebrow: "Industrial Excellence Since 2016",
    title: ["Engineering ", "Reliability ", "in Polymer & PTFE"],
    subtitle:
      "Premium PTFE Bellows, Lined Valves & Glass Equipment trusted by chemical, pharma and process industries across India.",
    cta1: "View Products",
    cta2: "Talk to an Expert",
    target1: "products",
    target2: "contact",
  },
  {
    image: hero2,
    eyebrow: "Laboratory & Industrial Glassware",
    title: ["Precision Glass.", " Built for ", "Demanding Processes."],
    subtitle:
      "Glass reactors, heat exchangers, sight glasses and stirring assemblies — engineered to industry standards with rigorous quality control.",
    cta1: "Explore Glassware",
    cta2: "Request a Quote",
    target1: "products",
    target2: "contact",
  },
  {
    image: hero3,
    eyebrow: "PTFE Lined Components",
    title: ["Corrosion-proof. ", "Built ", "to Last."],
    subtitle:
      "From bellows to lined flanges and fittings — our PTFE products withstand the harshest chemical environments without compromise.",
    cta1: "See PTFE Range",
    cta2: "Get in Touch",
    target1: "products",
    target2: "contact",
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

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-primary">
      {/* Background slides — fade transition */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={s.image}
            alt=""
            className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-out ${
              i === active ? "scale-110" : "scale-100"
            }`}
            width={1920}
            height={1080}
            loading={i === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* Overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/75 to-primary/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, hsl(205 90% 55% / 0.5), transparent 70%)" }}
      />

      {/* Content */}
      <div className="relative container min-h-screen flex flex-col justify-center pt-28 pb-32 z-10">
        <div className="max-w-3xl text-primary-foreground">
          <div key={`eyebrow-${active}`} className="animate-slide-right">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              {slides[active].eyebrow}
            </span>
          </div>

          <h1
            key={`title-${active}`}
            className="mt-6 font-display font-bold text-4xl sm:text-5xl lg:text-7xl leading-[1.05] animate-fade-up"
          >
            {slides[active].title[0]}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary-glow to-accent">
              {slides[active].title[1]}
            </span>
            {slides[active].title[2]}
          </h1>

          <p
            key={`sub-${active}`}
            className="mt-6 text-lg lg:text-xl text-primary-foreground/85 max-w-2xl leading-relaxed animate-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            {slides[active].subtitle}
          </p>

          <div
            key={`cta-${active}`}
            className="mt-10 flex flex-wrap gap-4 animate-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            <Button variant="hero" size="lg" onClick={() => scrollTo(slides[active].target1)}>
              {slides[active].cta1}
              <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
            <Button variant="glass" size="lg" onClick={() => scrollTo(slides[active].target2)}>
              {slides[active].cta2}
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-xl">
            {[
              ["8+", "Years"],
              ["500+", "Clients"],
              ["50+", "Products"],
            ].map(([n, l]) => (
              <div key={l} className="border-l-2 border-secondary/60 pl-4">
                <div className="font-display font-bold text-2xl lg:text-3xl">{n}</div>
                <div className="text-xs uppercase tracking-wider text-primary-foreground/70">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 inset-x-0 z-20">
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
              aria-label="Previous"
              className="w-11 h-11 rounded-full glass text-primary-foreground hover:bg-secondary hover:border-secondary transition-smooth flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next"
              className="w-11 h-11 rounded-full glass text-primary-foreground hover:bg-secondary hover:border-secondary transition-smooth flex items-center justify-center"
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
