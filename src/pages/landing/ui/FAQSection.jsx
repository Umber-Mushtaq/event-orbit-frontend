import { useState } from "react";
import { ChevronDown } from "lucide-react";
import CustomHeader from "../../../shared_components/CustomHeader";

const faqs = [
  {
    question: "How are vendors vetted?",
    answer:
      "We carefully review each vendor’s portfolio, references, and client feedback before approving them to join our marketplace.",
  },
  {
    question: "Is there a booking fee?",
    answer:
      "No, there is no booking fee. You pay vendors directly for their services, with no hidden charges from us.",
  },
  {
    question: "Can I book outside my home city?",
    answer:
      "Yes, you can book vendors in multiple cities. Our concierge team will help you find trusted options wherever your event is located.",
  },
  {
    question: "What if a vendor cancels?",
    answer:
      "In the rare case of a cancellation, our concierge team will immediately provide alternative vendors to ensure your event runs smoothly.",
  },
  {
    question: "Do you handle the planning itself?",
    answer:
      "We connect you with vetted vendors and provide guidance, but full event planning services are available through select partners.",
  },
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 3–6 months in advance to secure the best vendors, especially during peak wedding and holiday seasons.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className='w-full bg-white px-5 py-20 text-slate-950 dark:bg-neutral-950 dark:text-white'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start'>
        <div>
          <CustomHeader
            badge='Frequently Asked'
            title='Answers, before you ask.'
          />
          <p className='mb-8 mt-5 max-w-md text-2xl text-slate-500 dark:text-stone-400'>
            Six things we hear most often.
          </p>
        </div>
        <div className='space-y-4'>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className='rounded-lg border border-slate-200 bg-slate-50 shadow-[0_10px_28px_rgba(15,23,42,0.08)] dark:border-transparent dark:bg-neutral-900/50 dark:shadow-gold-glow'
            >
              <button
                onClick={() => toggleFAQ(index)}
                className='flex w-full items-center justify-between px-6 py-4 text-left text-slate-800 transition hover:text-amber-500 dark:text-white dark:hover:text-amber-400'
              >
                {faq.question}
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    openIndex === index ? "rotate-180 text-amber-400" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className='px-6 pb-4 text-sm leading-relaxed text-slate-600 dark:text-stone-300'>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
