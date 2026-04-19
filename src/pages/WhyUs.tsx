import WhyUs from "@/components/site/WhyUs";
import Testimonials from "@/components/site/Testimonials";
import PageHeader from "@/components/site/PageHeader";
import { useSEO } from "@/hooks/use-seo";

const WhyUsPage = () => {
  useSEO(
    "Why Choose Us | Gujarat Scientific And Polymer",
    "Consistency, sincerity and quality-first approach. Discover why B2B clients trust Gujarat Scientific And Polymer.",
  );
  return (
    <>
      <PageHeader
        eyebrow="Why Choose Us"
        title="Built on quality, trust and consistency"
        subtitle="Seven years of fair trade, ethical practices and a customer-first mindset."
      />
      <WhyUs />
      <Testimonials />
    </>
  );
};

export default WhyUsPage;
