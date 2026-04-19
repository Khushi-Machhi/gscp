import About from "@/components/site/About";
import WhyUs from "@/components/site/WhyUs";
import PageHeader from "@/components/site/PageHeader";
import { useSEO } from "@/hooks/use-seo";

const Company = () => {
  useSEO(
    "Company Profile | Gujarat Scientific And Polymer",
    "Established 2016 — manufacturer of PTFE products and industrial glassware. Learn about our infrastructure, quality assurance and ethical business approach.",
  );
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Company Profile"
        subtitle="A trusted manufacturer of PTFE products and industrial glassware since 2016."
      />
      <About />
      <WhyUs />
    </>
  );
};

export default Company;
