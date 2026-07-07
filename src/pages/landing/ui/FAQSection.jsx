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
    <section className='w-full bg-neutral-950 text-white py-20 px-6 md:px-12 lg:px-20'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start'>
        <div>
          <CustomHeader
            badge='Frequently Asked'
            title='Answers, before you ask.'
          />
          <p className='text-stone-400 text-2xl mt-5 mb-8 max-w-md'>
            Six things we hear most often.
          </p>
        </div>
        <div className='space-y-4'>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className='rounded-lg bg-neutral-900/50 shadow-gold-glow'
            >
              <button
                onClick={() => toggleFAQ(index)}
                className='w-full flex justify-between items-center px-6 py-4 text-left text-white hover:text-amber-400 transition'
              >
                {faq.question}
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    openIndex === index ? "rotate-180 text-amber-400" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className='px-6 pb-4 text-stone-300 text-sm leading-relaxed'>
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
