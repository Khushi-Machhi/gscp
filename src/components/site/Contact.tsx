import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    city: "",
    requirement: "",
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.requirement) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      // Formspree form ID for info@gujaratscientificandpolymer.com
      const formspreeId = 'mqenedqz';

      // Create a formatted message for the email
      const formattedMessage = `
NEW INQUIRY FROM CONTACT FORM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PERSONAL DETAILS
Name: ${form.name}
Email: ${form.email}
${form.phone ? `Phone: ${form.phone}` : ''}

COMPANY DETAILS
${form.company ? `Company: ${form.company}` : 'Company: Not provided'}
${form.city ? `City/State: ${form.city}` : 'City/State: Not provided'}

REQUIREMENT
${form.requirement}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This inquiry was submitted from: gujaratscientificandpolymer.com
Please reply to: ${form.email}
      `.trim();

      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: `New Inquiry from ${form.name} - ${form.company || 'Individual'}`,
          name: form.name,
          email: form.email,
          message: formattedMessage,
        }),
      });

      if (response.ok) {
        toast.success("Inquiry sent! We'll reply shortly with the best price.");
        setForm({ name: "", company: "", phone: "", email: "", city: "", requirement: "" });
      } else {
        toast.error("Failed to send inquiry. Please try again or contact us directly.");
      }
    } catch (error) {
      console.error('Form submission failed:', error);
      toast.error("Failed to send inquiry. Please try again or contact us directly.");
    }
  };

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <section id="contact" className="py-16 lg:py-24 bg-gradient-soft relative overflow-hidden">
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-3xl opacity-40"
        style={{ background: "radial-gradient(circle, hsl(205 90% 70% / 0.4), transparent 70%)" }}
      />

      <div className="container relative">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Info */}
          <div className="lg:col-span-2 animate-fade-up">
            <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold tracking-wider uppercase">
              Contact Us
            </span>
            <h2 className="mt-4 font-display font-bold text-4xl lg:text-5xl text-primary leading-tight">
              Tell us your <span className="text-gradient">requirement</span>
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Get a quotation, discuss a requirement, or request a price list. Our team typically responds within
              one business day with the best possible price.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { icon: MapPin, title: "Our Location", text: "C-7/2, Road No. 2, Ajwa Road, Sardar Estate, Vadodara, Gujarat 390019" },
                { icon: Phone, title: "Phone", text: "+91 9824202661" },
                { icon: Mail, title: "Email", text: "info@gujaratscientificandpolymer.com" },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border shadow-soft">
                  <div className="w-11 h-11 rounded-xl bg-gradient-brand text-primary-foreground flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{title}</div>
                    <div className="text-foreground font-medium mt-0.5">{text}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 inline-flex p-1 bg-card rounded-full border border-border shadow-soft">
              {["Get Quotation", "Get Price List", "Discuss Requirement"].map((b, i) => (
                <span
                  key={b}
                  className={`px-4 py-2 text-xs font-semibold rounded-full ${
                    i === 0 ? "bg-gradient-brand text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={submit}
            className="lg:col-span-3 bg-card rounded-3xl p-8 lg:p-10 shadow-elegant border border-border animate-fade-up"
            style={{ animationDelay: "150ms" }}
          >
            <h3 className="font-display font-bold text-2xl text-primary">Send us your inquiry</h3>
            <p className="text-sm text-muted-foreground mt-1">We'll respond shortly with the best price.</p>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <Field label="Name *" value={form.name} onChange={update("name")} placeholder="Full name" />
              <Field label="Company Name" value={form.company} onChange={update("company")} placeholder="Your company" />
              <Field label="Phone Number" value={form.phone} onChange={update("phone")} placeholder="+91 …" type="tel" />
              <Field label="Email Id *" value={form.email} onChange={update("email")} placeholder="you@email.com" type="email" />
              <div className="sm:col-span-2">
                <Field label="City / State" value={form.city} onChange={update("city")} placeholder="Ahmedabad, Gujarat" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-semibold text-primary">Confirm Your Requirement *</label>
                <textarea
                  value={form.requirement}
                  onChange={update("requirement")}
                  rows={4}
                  placeholder="Briefly describe what you need: product, size, quantity…"
                  className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition-quick resize-none"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <Button type="submit" variant="hero" size="lg" className="w-full sm:w-auto">
                <Send className="w-4 h-4" /> Send Inquiry
              </Button>
              <p className="text-xs text-muted-foreground">
                By submitting, you agree to be contacted regarding your requirement.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const Field = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}) => (
  <div>
    <label className="text-sm font-semibold text-primary">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition-quick"
    />
  </div>
);

export default Contact;
