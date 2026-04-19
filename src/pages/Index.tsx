import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Categories from "@/components/site/Categories";
import Products from "@/components/site/Products";
import WhyUs from "@/components/site/WhyUs";
import Testimonials from "@/components/site/Testimonials";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Gujarat Scientific And Polymer | PTFE Products & Industrial Glassware";
    const meta = document.querySelector('meta[name="description"]') || document.createElement("meta");
    meta.setAttribute("name", "description");
    meta.setAttribute(
      "content",
      "Manufacturer of PTFE bellows, lined valves, glass heat exchangers, sight glass, stirring assemblies and laboratory glassware for chemical, pharma & industrial use.",
    );
    document.head.appendChild(meta);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Categories />
      <Products />
      <WhyUs />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
