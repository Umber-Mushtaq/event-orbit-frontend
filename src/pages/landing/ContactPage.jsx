import { Mail, Phone, MapPin, Send } from "lucide-react";
import CustomHeader from "../../shared_components/CustomHeader";
import { useState } from "react";
import SEO from "../../seo/SEO";
import { breadcrumbSchema, localBusinessSchema } from "../../seo/schema";
import { apiUrl } from "../../config/api";

function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const response = await fetch(apiUrl("/api/contact"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to send message.");
      }

      setStatus("Message sent successfully!");
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus(error.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='w-full bg-neutral-950 text-white py-16 px-6 md:px-12 lg:px-20'>
      <SEO
        title='Contact Us'
        description='Contact Event Orbit for marketplace support, vendor inquiries, collaborations, and event planning questions.'
        keywords={[
          "contact Event Orbit",
          "event planning support",
          "vendor support",
          "marketplace support",
        ]}
        canonical='/contact'
        type='website'
        schema={[
          localBusinessSchema({
            name: "Event Orbit",
            description:
              "Event Orbit helps customers discover trusted event vendors and services.",
            url: "/contact",
            telephone: "+92 300 1234567",
            address: "123 Luxury Avenue, Lahore, Pakistan",
          }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Contact", url: "/contact" },
          ]),
        ]}
      />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-start'>
        {/* Left Column */}
        <div className='space-y-6'>
          <CustomHeader badge='Contact Section' title='Contact Us' />
          <p className='text-stone-400 text-sm leading-relaxed max-w-md'>
            Our team is here to help with inquiries, collaborations, or event
            planning. Reach out and we'll respond promptly.
          </p>

          <div className='space-y-4 text-stone-300 text-sm'>
            <div className='flex items-center gap-3'>
              <Mail className='w-5 h-5 text-amber-400' />
              <span>support@yourbrand.com</span>
            </div>
            <div className='flex items-center gap-3'>
              <Phone className='w-5 h-5 text-amber-400' />
              <span>+92 300 1234567</span>
            </div>
            <div className='flex items-center gap-3'>
              <MapPin className='w-5 h-5 text-amber-400' />
              <span>123 Luxury Avenue, Lahore, Pakistan</span>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <form
          onSubmit={handleSubmit}
          className='bg-neutral-900 backdrop-blur-md border border-border-gold rounded-2xl shadow-gold-glow p-8 space-y-6'
        >
          <div className='flex flex-col gap-2'>
            <label className='text-xs font-medium text-stone-400 uppercase tracking-wider'>
              Your Name
            </label>
            <input
              type='text'
              name='name'
              placeholder='Enter your full name'
              className='w-full rounded-lg border border-stone-400 bg-white py-3 px-4 text-sm text-slate-950 placeholder-slate-400 transition focus:border-border-gold focus:outline-none dark:bg-neutral-950/80 dark:text-white dark:placeholder-stone-500'
              required
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-xs font-medium text-stone-400 uppercase tracking-wider'>
              Email
            </label>
            <input
              type='email'
              name='email'
              placeholder='Enter your email'
              className='w-full rounded-lg border border-stone-400 bg-white py-3 px-4 text-sm text-slate-950 placeholder-slate-400 transition focus:border-border-gold focus:outline-none dark:bg-neutral-950/80 dark:text-white dark:placeholder-stone-500'
              required
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-xs font-medium text-stone-400 uppercase tracking-wider'>
              Message
            </label>
            <textarea
              rows={4}
              name='message'
              placeholder='Tell us about your inquiry...'
              className='w-full resize-none rounded-lg border border-stone-400 bg-white py-3 px-4 text-sm text-slate-950 placeholder-slate-400 transition focus:border-border-gold focus:outline-none dark:bg-neutral-950/80 dark:text-white dark:placeholder-stone-500'
              required
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-glass-gold text-white border border-border-gold shadow-gold-glow font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-glass-gold-hover hover:border-border-gold-hover active:scale-[0.98] transition disabled:opacity-50'
          >
            <Send className='w-4 h-4' />
            {loading ? "Sending..." : "Send Message"}
          </button>

          {status && (
            <p
              className={`text-sm mt-2 text-center ${
                status.toLowerCase().includes("success")
                  ? "text-emerald-400"
                  : "text-amber-400"
              }`}
              aria-live='polite'
            >
              {status}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default ContactPage;
