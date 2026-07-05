import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import WhyUs from "@/components/site/WhyUs";
import Testimonials from "@/components/site/Testimonials";
import ContactCTA from "@/components/site/ContactCTA";
import { useSEO } from "@/hooks/use-seo";

const Home = () => {
  useSEO(
    "Gujarat Scientific And Polymer",
    "Building an admin dashboard and migrating product data to Supabase for future management.",
  );
  return (
    <>
      <Hero />
      <About />
      <WhyUs />
      <Testimonials />
      <ContactCTA />
    </>
  );
};

export default Home;
