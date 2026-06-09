import React from 'react';
import { TrendingUp, Users, DollarSign, Award } from 'lucide-react';

const SocialProof: React.FC = () => {
  const stats = [
    {
      icon: Users,
      value: '200+',
      label: 'Investors Served',
      description: 'Successful property investments'
    },
    {
      icon: DollarSign,
      value: '€50M+',
      label: 'Investment Facilitated',
      description: 'Total portfolio value'
    },
    {
      icon: TrendingUp,
      value: '15%',
      label: 'Average ROI',
      description: 'Annual return on investment'
    },
    {
      icon: Award,
      value: '95%',
      label: 'Client Satisfaction',
      description: 'Would recommend to others'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-brown-800 mb-4">
            Trusted by Investors Worldwide
          </h2>
          <p className="text-brown-600 max-w-2xl mx-auto">
            Our proven track record speaks for itself. Join hundreds of successful 
            investors who've built their Portuguese property portfolio with our guidance.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-200"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mb-4 group-hover:bg-gold-200 transition-colors">
                  <IconComponent className="h-8 w-8 text-gold-600" />
                </div>
                <div className="text-3xl font-display font-bold text-brown-800 mb-1">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-brown-700 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-brown-600">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-12 border-t border-brown-100">
          <div className="flex flex-wrap justify-center items-center space-x-8 space-y-4 opacity-60">
            <div className="text-brown-700 font-semibold">Featured in:</div>
            <div className="text-brown-600 font-medium">Property Weekly</div>
            <div className="text-brown-600 font-medium">Investment Times</div>
            <div className="text-brown-600 font-medium">Portuguese Business Review</div>
            <div className="text-brown-600 font-medium">European Real Estate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;