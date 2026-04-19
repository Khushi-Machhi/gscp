import { CheckCircle2, Award, Factory, Users } from "lucide-react";
import aboutImg from "@/assets/about.jpg";

const points = [
  "We listen to our clients and resolve their queries.",
  "Large distribution network for easy delivery.",
  "Sound production facility with advanced machinery.",
  "Transparent business policy and ethical values.",
  "Competitive price range across all categories.",
];

const stats = [
  { icon: Factory, label: "Production Capacity", value: "Large-scale facility" },
  { icon: Award, label: "Quality Assurance", value: "ISO process underway" },
  { icon: Users, label: "Industries Served", value: "Pharma, Chemical, Food" },
];

const About = () => {
  return (
    <section id="about" className="py-20 lg:py-24 bg-background relative overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative animate-fade-up">
            <div className="relative rounded-3xl overflow-hidden shadow-elegant">
              <img
                src={aboutImg}
                alt="Quality engineer inspecting glass equipment"
                width={1280}
                height={960}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 right-2 sm:-bottom-8 sm:-right-4 lg:-right-8 bg-card rounded-2xl p-4 sm:p-6 shadow-elegant border border-border max-w-[220px] sm:max-w-[260px] animate-float">
              <div className="text-4xl sm:text-5xl font-display font-bold text-gradient">2016</div>
              <div className="mt-1 text-xs sm:text-sm text-muted-foreground">
                Established with a vision for industrial excellence in PTFE & polymer products.
              </div>
            </div>

            <div
              className="absolute -top-6 -left-6 w-32 h-32 rounded-full opacity-60 blur-3xl"
              style={{ background: "radial-gradient(circle, hsl(205 90% 60% / 0.5), transparent 70%)" }}
            />
          </div>

          {/* Content */}
          <div className="animate-fade-up" style={{ animationDelay: "150ms" }}>
            <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold tracking-wider uppercase">
              Company Profile
            </span>
            <h2 className="mt-4 font-display font-bold text-4xl lg:text-5xl text-primary leading-tight">
              A trusted name in <span className="text-gradient">PTFE & Industrial</span> manufacturing
            </h2>

            <p className="mt-5 text-muted-foreground leading-relaxed">
              Specializing in the production of various PTFE Products and related industrial hardware,
              <strong className="text-foreground"> Gujarat Scientific And Polymer</strong> has established itself as
              a well-known manufacturer and supplier. We offer a wide variety of products including PTFE Bellow,
              Double Window Sight Glass, PTFE Lined Reducing Flange, Glass Stirring Assembly, Feed Pipe, MS PTFE
              Elbow Pipe and more.
            </p>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              Established in 2016, we have been working relentlessly to produce high-quality products at competitive
              prices, serving automotive, chemical processing, food processing, medical and many other industries.
            </p>

            <ul className="mt-7 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-foreground/85">
                  <CheckCircle2 className="w-5 h-5 text-secondary mt-0.5 shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid sm:grid-cols-3 gap-4">
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="p-4 rounded-xl bg-muted/50 border border-border">
                  <Icon className="w-5 h-5 text-secondary" />
                  <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
                  <div className="text-sm font-semibold text-primary mt-0.5">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
