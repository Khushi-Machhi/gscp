import Contact from "@/components/site/Contact";
import PageHeader from "@/components/site/PageHeader";
import { useSEO } from "@/hooks/use-seo";

const ContactPage = () => {
  useSEO(
    "Contact Us | Gujarat Scientific And Polymer",
    "Get a quotation, request a price list, or discuss your requirement. We respond within one business day.",
  );
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us your requirement"
        subtitle="Quotations, price lists or technical discussions — we're here to help."
      />
      <Contact />
    </>
  );
};

export default ContactPage;
