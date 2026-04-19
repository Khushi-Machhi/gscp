import { ShieldCheck, Truck, Cog, HeartHandshake, Beaker, BadgeCheck } from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Quality Assurance & Certification",
    desc: "Carefully made from high-quality PTFE resin per industry standards. Visual, dimensional, tensile and thermal stability tests.",
  },
  {
    icon: Cog,
    title: "Robust Infrastructure",
    desc: "Compression moulding, ram extrusion, isostatic moulding — backed by advanced machinery and a large warehousing facility.",
  },
  {
    icon: HeartHandshake,
    title: "Customer Delight",
    desc: "Knowledgeable staff and incremental improvement principles deliver consistent performance and qualitative service.",
  },
  {
    icon: Truck,
    title: "Wide Distribution",
    desc: "A large distribution network ensures fast and reliable delivery of products across India and beyond.",
  },
  {
    icon: ShieldCheck,
    title: "Ethical & Transparent",
    desc: "Seven years in the industry following fair trade principles, ethical policies and quality-focused approaches.",
  },
  {
    icon: Beaker,
    title: "Industry Versatility",
    desc: "Trusted by automotive, chemical processing, food processing, medical and many other industries.",
  },
];

const WhyUs = () => {
  return (
    <section id="why" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background details */}
      <div className="absolute inset-0 grid-pattern opacity-15" />
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(circle, hsl(205 90% 60%), transparent 70%)" }}
      />
      <div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(circle, hsl(200 95% 55%), transparent 70%)" }}
      />

      <div className="container relative">
        <div className="max-w-3xl">
          <span className="inline-block px-3 py-1 rounded-full glass text-xs font-semibold tracking-wider uppercase">
            Why Choose Us
          </span>
          <h2 className="mt-4 font-display font-bold text-4xl lg:text-5xl leading-tight">
            Consistency, sincerity and a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">
              quality-first approach
            </span>
          </h2>
          <p className="mt-5 text-primary-foreground/75 text-lg leading-relaxed">
            Guided by Mr. Naresh Kumar, our mentor with rich industry knowledge and superb business acumen, we
            strive to make every interaction a step toward customer satisfaction.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="group relative glass rounded-2xl p-7 hover:bg-white/10 transition-smooth animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-primary-glow flex items-center justify-center shadow-glow group-hover:scale-110 transition-smooth">
                <Icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="mt-5 font-display font-bold text-xl">{title}</h3>
              <p className="mt-2 text-primary-foreground/70 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
