import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: 'What exactly do I receive with the €150 investment assessment?',
      answer: 'You receive a comprehensive 25-30 page personalized report including market analysis for your target areas, ROI calculations, legal guidance, tax implications, Golden Visa eligibility assessment, and a 30-minute consultation call to discuss your strategy.'
    },
    {
      question: 'How long does it take to receive my assessment report?',
      answer: 'Your personalized investment assessment will be delivered within 24-48 hours of payment. For urgent requests, we offer same-day delivery for an additional €50.'
    },
    {
      question: 'Do you provide ongoing support after the initial assessment?',
      answer: 'Yes! The assessment includes 3 months of email support for follow-up questions. We also offer ongoing consultation services and property sourcing assistance at competitive rates for our assessment clients.'
    },
    {
      question: 'Is the assessment suitable for first-time property investors?',
      answer: 'Absolutely! Our assessments are designed for investors at all levels, from complete beginners to experienced portfolios. We tailor the complexity and recommendations based on your experience and comfort level.'
    },
    {
      question: 'Can you help with Golden Visa requirements and applications?',
      answer: 'Yes, we provide detailed guidance on Golden Visa requirements, investment thresholds, and application processes. We work with licensed immigration lawyers to ensure compliance with all Portuguese residency regulations.'
    },
    {
      question: 'What areas of Portugal do you cover in your analysis?',
      answer: 'We cover all major Portuguese regions including Lisbon, Porto, Algarve, Central Portugal, and emerging markets. Our analysis includes urban centers, coastal areas, and countryside properties based on your investment goals.'
    },
    {
      question: 'Do you guarantee the projected returns mentioned in the assessment?',
      answer: 'While we provide realistic projections based on current market data and trends, investment returns cannot be guaranteed. Our assessments include risk analysis and multiple scenarios to help you make informed decisions.'
    },
    {
      question: 'Can I get a refund if I\'m not satisfied with the assessment?',
      answer: 'We offer a 14-day money-back guarantee if you\'re not completely satisfied with your assessment quality. However, less than 2% of our clients request refunds due to our thorough and personalized approach.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-cream-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-brown-800 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-brown-600">
            Get answers to common questions about our Portuguese real estate 
            investment assessment service.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gold-100 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-cream-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-brown-800 pr-8">
                  {faq.question}
                </h3>
                {openItems.includes(index) ? (
                  <ChevronUp className="h-5 w-5 text-gold-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gold-600 flex-shrink-0" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-8 pb-6">
                  <p className="text-brown-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-brown-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <button className="bg-gold-600 hover:bg-gold-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors">
            Contact Our Experts
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;