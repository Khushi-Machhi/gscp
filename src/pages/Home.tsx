import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Categories from "@/components/site/Categories";
import ProductsShowcase from "@/components/site/ProductsShowcase";
import WhyUs from "@/components/site/WhyUs";
import Testimonials from "@/components/site/Testimonials";
import ContactCTA from "@/components/site/ContactCTA";
import { useSEO } from "@/hooks/use-seo";

const Home = () => {
  useSEO(
    "Gujarat Scientific And Polymer | PTFE Products & Industrial Glassware",
    "Manufacturer of PTFE bellows, lined valves, glass heat exchangers, sight glass and laboratory glassware for chemical, pharma & industrial use.",
  );
  return (
    <>
      <Hero />
      <About />
      <Categories />
      <ProductsShowcase />
      <WhyUs />
      <Testimonials />
      <ContactCTA />
    </>
  );
};

export default Home;
