import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoColored from "@/assets/gscp-logo.png";
import logoWhite from "@/assets/gscp-white-logo.png";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/company", label: "Company" },
  { to: "/why-us", label: "Why Us" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const onHome = pathname === "/";
  const transparent = onHome && !scrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-smooth ${
        transparent
          ? "bg-transparent"
          : "bg-background/85 backdrop-blur-xl border-b border-border shadow-soft"
      }`}
    >
      <div className="container flex items-center justify-between h-20">
        <Link to="/" className="flex items-center group" aria-label="Home">
          <img
            src={transparent ? logoWhite : logoColored}
            alt="Gujarat Scientific and Polymer logo"
            className="h-16 w-auto object-contain transition-smooth group-hover:scale-105 drop-shadow-sm"
            width={128}
            height={64}
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium transition-quick ${
                  transparent
                    ? "text-primary-foreground/90 hover:text-primary-foreground"
                    : isActive
                      ? "text-primary"
                      : "text-foreground/80 hover:text-primary"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+91 98242 07661"
            className={`hidden xl:flex items-center gap-2 text-sm transition-quick ${
              transparent ? "text-primary-foreground/90 hover:text-primary-foreground" : "text-foreground/70 hover:text-primary"
            }`}
          >
            <Phone className="w-4 h-4" />
            <span className="font-medium">Call Us</span>
          </a>
          <Button asChild variant="hero" size="sm">
            <Link to="/contact">Get a Quote</Link>
          </Button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className={`lg:hidden p-2 ${transparent ? "text-primary-foreground" : "text-primary"}`}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border animate-fade-in max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="container py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `px-3 py-3 text-base font-medium rounded-lg ${
                    isActive ? "bg-muted text-primary" : "text-foreground/80 hover:bg-muted"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Button asChild variant="hero" className="mt-2">
              <Link to="/contact">Get a Quote</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
