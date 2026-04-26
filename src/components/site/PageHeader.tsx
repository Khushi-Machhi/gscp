import logo from "@/assets/gscp-logo.png";

type Props = { eyebrow: string; title: string; subtitle?: string };

const PageHeader = ({ eyebrow, title, subtitle }: Props) => (
  <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-primary text-primary-foreground overflow-hidden">
    <div className="absolute inset-0 grid-pattern opacity-15" />
    <div
      className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-30"
      style={{ background: "radial-gradient(circle, hsl(205 90% 60%), transparent 70%)" }}
    />
    <img
      src={logo}
      alt=""
      aria-hidden
      className="absolute right-[-80px] top-1/2 -translate-y-1/2 w-[420px] opacity-[0.07] hidden md:block pointer-events-none"
    />
    <div className="container relative">
      <div className="max-w-3xl">
        <span className="inline-block px-3 py-1 rounded-full glass text-xs font-semibold tracking-wider uppercase">
          {eyebrow}
        </span>
        <h1 className="mt-4 font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.1] animate-fade-up">
          {title}
        </h1>
        {subtitle && (
          <p
            className="mt-5 text-lg text-primary-foreground/80 max-w-2xl animate-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  </section>
);

export default PageHeader;
