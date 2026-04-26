import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/gscp-logo.png";
import { categories } from "@/data/catalog";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/company", label: "Company" },
  { to: "/products", label: "Products", hasMenu: true },
  { to: "/why-us", label: "Why Us" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setProductsOpen(false);
    setMobileProductsOpen(false);
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
            src={logo}
            alt="Gujarat Scientific and Polymer logo"
            className="h-16 w-16 sm:h-20 sm:w-20 object-contain transition-smooth group-hover:scale-105 drop-shadow-sm"
            width={80}
            height={80}
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) =>
            item.hasMenu ? (
              <div
                key={item.to}
                className="relative"
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium transition-quick flex items-center gap-1 ${
                      transparent
                        ? "text-primary-foreground/90 hover:text-primary-foreground"
                        : isActive
                          ? "text-primary"
                          : "text-foreground/80 hover:text-primary"
                    }`
                  }
                >
                  {item.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-smooth ${productsOpen ? "rotate-180" : ""}`} />
                </NavLink>
                {productsOpen && (
                  <div className="absolute top-full left-0 pt-2 w-72 animate-fade-in">
                    <div className="bg-card rounded-xl shadow-elegant border border-border p-2 grid">
                      <Link
                        to="/products"
                        className="text-sm px-3 py-2 rounded-lg hover:bg-muted font-semibold text-primary"
                      >
                        All Products →
                      </Link>
                      <div className="h-px bg-border my-1" />
                      {categories.map((c) => (
                        <Link
                          key={c.slug}
                          to={`/products/${c.slug}`}
                          className="text-sm px-3 py-2 rounded-lg hover:bg-muted text-foreground/80 hover:text-primary transition-quick"
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
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
            ),
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+91"
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
            {navItems.map((item) =>
              item.hasMenu ? (
                <div key={item.to}>
                  <button
                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    className="w-full flex items-center justify-between px-3 py-3 text-base font-medium text-foreground/80 hover:bg-muted rounded-lg"
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-smooth ${mobileProductsOpen ? "rotate-180" : ""}`} />
                  </button>
                  {mobileProductsOpen && (
                    <div className="ml-3 pl-3 border-l-2 border-border space-y-1 mt-1">
                      <Link
                        to="/products"
                        className="block px-3 py-2 text-sm font-semibold text-primary hover:bg-muted rounded-lg"
                      >
                        All Products
                      </Link>
                      {categories.map((c) => (
                        <Link
                          key={c.slug}
                          to={`/products/${c.slug}`}
                          className="block px-3 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-primary rounded-lg"
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
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
              ),
            )}
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
