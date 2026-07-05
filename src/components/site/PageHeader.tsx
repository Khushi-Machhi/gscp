import logo from "@/assets/gscp-logo.png";

type Props = { eyebrow: string; title: string; subtitle?: string };

const PageHeader = ({ eyebrow, title, subtitle }: Props) => (
  <section className="relative overflow-hidden bg-[linear-gradient(135deg,_#071b33_0%,_#123a63_45%,_#1a6fbe_100%)] pt-32 pb-16 text-primary-foreground lg:pt-40 lg:pb-20">
    <div className="absolute inset-0 grid-pattern opacity-15" />
    <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
    <div className="absolute bottom-[-80px] left-[-60px] h-56 w-56 rounded-full bg-blue-500/15 blur-3xl" />
    <img
      src={logo}
      alt=""
      aria-hidden
      className="pointer-events-none absolute right-[-80px] top-1/2 hidden w-[420px] -translate-y-1/2 opacity-[0.07] md:block"
    />
    <div className="container relative">
      <div className="max-w-3xl">
        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-sky-100 backdrop-blur">
          {eyebrow}
        </span>
        <h1 className="mt-4 animate-fade-up font-display text-4xl font-bold leading-[1.1] md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl animate-fade-up text-lg text-primary-foreground/80" style={{ animationDelay: "100ms" }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  </section>
);

export default PageHeader;
