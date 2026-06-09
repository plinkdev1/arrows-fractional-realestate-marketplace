import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';
import PaymentModal from './PaymentModal';

const Hero: React.FC = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  return (
    <section className="relative bg-gradient-to-br from-cream-100 via-cream-200 to-gold-50 pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-slide-up">
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex text-gold-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <span className="text-brown-700 font-medium">200+ Successful Investments</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brown-800 leading-tight mb-6">
              Are You Ready for{' '}
              <span className="text-gold-600">Portuguese Real Estate</span>{' '}
              Investment?
            </h1>
            
            <p className="text-xl text-brown-600 mb-8 leading-relaxed">
              Discover your perfect Portuguese property investment strategy with our 
              professional analysis. Get personalized recommendations based on your 
              goals, budget, and risk tolerance.
            </p>

            {/* Benefits List */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                'Professional Market Analysis',
                'Personalized Investment Strategy',
                'ROI Calculations & Projections',
                'Legal & Tax Guidance'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-gold-600 flex-shrink-0" />
                  <span className="text-brown-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gold-200">
              <div className="flex items-baseline space-x-3 mb-4">
                <span className="text-3xl font-display font-bold text-gold-600">€150</span>
                <span className="text-lg text-brown-600 line-through">€400</span>
                <span className="bg-gold-100 text-gold-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Limited Time
                </span>
              </div>
              <p className="text-brown-700 mb-6">
                Professional Portuguese Investment Analysis - Complete assessment 
                with personalized recommendations and ROI projections.
              </p>
              <button
                onClick={() => setIsPaymentModalOpen(true)}
                className="w-full bg-gold-600 hover:bg-gold-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 group"
              >
                <span>Get My Investment Assessment</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="animate-fade-in">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1642125/pexels-photo-1642125.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Portuguese coastal property"
                className="rounded-2xl shadow-2xl w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
              
              {/* Floating Stats */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                <div className="text-2xl font-bold text-gold-600">€50M+</div>
                <div className="text-brown-700 font-medium">Investment Facilitated</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
      />
    </section>
  );
};

export default Hero;