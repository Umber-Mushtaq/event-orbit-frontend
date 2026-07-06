import { Mail, Phone, MapPin, Send } from "lucide-react";
import CustomHeader from "../../shared_components/CustomHeader";
import emailjs from "emailjs-com";
import { useState } from "react";

function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
          setLoading(false);
          e.target.reset();
        },
        (error) => {
          console.error(error);
          setStatus("Failed to send message. Please try again.");
          setLoading(false);
        },
      );
  };

  return (
    <section className='w-full bg-neutral-950 text-white py-16 px-6 md:px-12 lg:px-20'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-start'>
        {/* Left Column */}
        <div className='space-y-6'>
          <CustomHeader badge='Contact Section' title='Contact Us' />
          <p className='text-stone-400 text-sm leading-relaxed max-w-md'>
            Our team is here to help with inquiries, collaborations, or event
            planning. Reach out and we’ll respond promptly.
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
              name='user_name'
              placeholder='Enter your full name'
              className='w-full bg-neutral-900/50 border border-stone-400 rounded-lg py-3 px-4 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-border-gold transition'
              required
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-xs font-medium text-stone-400 uppercase tracking-wider'>
              Email
            </label>
            <input
              type='email'
              name='user_email'
              placeholder='Enter your email'
              className='w-full bg-neutral-900/50 border border-stone-400 rounded-lg py-3 px-4 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-border-gold transition'
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
              className='w-full bg-neutral-900/50 border border-stone-400 rounded-lg py-3 px-4 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-border-gold transition resize-none'
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
            <p className='text-sm mt-2 text-center text-amber-400'>{status}</p>
          )}
        </form>
      </div>
    </section>
  );
}

export default ContactPage;
