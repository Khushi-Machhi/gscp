import { ShieldCheck, Truck, Cog, HeartHandshake, Beaker, BadgeCheck } from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Quality Assurance & Certification",
    desc: "Carefully made from high-quality PTFE resin per industry standards with visual, dimensional, tensile and thermal checks.",
  },
  {
    icon: Cog,
    title: "Robust Infrastructure",
    desc: "Compression moulding, ram extrusion and isostatic moulding backed by advanced machinery and large warehousing capacity.",
  },
  {
    icon: HeartHandshake,
    title: "Customer Delight",
    desc: "Knowledgeable teams and continuous improvement principles help us deliver consistent performance and dependable service.",
  },
  {
    icon: Truck,
    title: "Wide Distribution",
    desc: "A strong distribution network ensures fast, reliable delivery across India and for our export clients.",
  },
  {
    icon: ShieldCheck,
    title: "Ethical & Transparent",
    desc: "Years of fair trade practices, ethical policies and quality-led decisions keep every partnership grounded in trust.",
  },
  {
    icon: Beaker,
    title: "Industry Versatility",
    desc: "Trusted across automotive, chemical processing, food processing, medical and many other demanding sectors.",
  },
];

const WhyUs = () => {
  return (
    <section id="why" className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_35%),linear-gradient(135deg,_#f8fcff_0%,_#eef7ff_45%,_#f8fbff_100%)] py-24 text-slate-900">
      <div className="absolute inset-0 grid-pattern opacity-[0.07]" />
      <div className="absolute -top-24 left-0 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
      <div className="absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-blue-600/15 blur-3xl" />

      <div className="container relative">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-sky-200 bg-white/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-sky-700 shadow-sm">
              Why Choose Us
            </span>
            <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-slate-900 lg:text-5xl">
              Consistency, sincerity and a{" "}
              <span className="bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">
                quality-first approach
              </span>
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
              Guided by Mr. Naresh Kumar, our mentor with rich industry knowledge and sharp business acumen, we
              strive to make every interaction a step toward lasting customer satisfaction.
            </p>
          </div>

          <div className="rounded-3xl border border-sky-100 bg-white/80 p-6 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.25)] backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 text-white shadow-lg">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">Trusted by B2B buyers</p>
                <p className="text-sm text-slate-600">From industrial processing to specialized manufacturing, every partnership matters.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-hover animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="absolute right-6 top-6 h-2.5 w-2.5 rounded-full bg-sky-300/80" />
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
