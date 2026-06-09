import React from 'react';
import { BarChart3, MapPin, Calculator, FileText, Users, Shield } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Market Analysis',
      description: 'Comprehensive analysis of Portuguese real estate markets, trends, and opportunities tailored to your investment goals.',
      benefits: ['Price trend analysis', 'Market forecasting', 'Area comparisons']
    },
    {
      icon: MapPin,
      title: 'Location Intelligence',
      description: 'Strategic location recommendations based on growth potential, rental yields, and infrastructure development.',
      benefits: ['Growth hotspots', 'Rental demand analysis', 'Infrastructure projects']
    },
    {
      icon: Calculator,
      title: 'ROI Calculations',
      description: 'Detailed financial projections including purchase costs, ongoing expenses, and potential returns.',
      benefits: ['Cash flow projections', 'Tax implications', 'Break-even analysis']
    },
    {
      icon: FileText,
      title: 'Legal Guidance',
      description: 'Navigate Portuguese property law, residency programs, and tax optimization strategies.',
      benefits: ['Golden Visa guidance', 'Tax optimization', 'Legal compliance']
    },
    {
      icon: Users,
      title: 'Personal Consultation',
      description: '30-minute one-on-one consultation to discuss your personalized investment strategy.',
      benefits: ['Expert advice', 'Q&A session', 'Strategy refinement']
    },
    {
      icon: Shield,
      title: 'Risk Assessment',
      description: 'Comprehensive risk analysis and mitigation strategies for your property investment portfolio.',
      benefits: ['Risk profiling', 'Mitigation strategies', 'Portfolio diversification']
    }
  ];

  return (
    <section id="features" className="py-20 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-brown-800 mb-6">
            Everything You Need for Smart Investment
          </h2>
          <p className="text-xl text-brown-600 max-w-3xl mx-auto">
            Our comprehensive assessment covers all aspects of Portuguese real estate 
            investment, giving you the insights needed to make informed decisions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 border border-gold-100"
              >
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-gold-100 rounded-lg mr-4">
                    <IconComponent className="h-6 w-6 text-gold-600" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-brown-800">
                    {feature.title}
                  </h3>
                </div>
                
                <p className="text-brown-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center text-sm text-brown-700">
                      <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-3 flex-shrink-0"></div>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gold-600 to-gold-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-display font-semibold mb-4">
              Ready to Start Your Investment Journey?
            </h3>
            <p className="text-gold-100 mb-6 max-w-2xl mx-auto">
              Get your personalized Portuguese real estate investment assessment 
              and take the first step towards building your property portfolio.
            </p>
            <button className="bg-white text-gold-700 font-semibold px-8 py-3 rounded-lg hover:bg-cream-50 transition-colors">
              Get My Assessment Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;