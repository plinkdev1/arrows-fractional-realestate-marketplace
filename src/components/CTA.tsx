import React, { useState } from 'react';
import { ArrowRight, Clock, Shield, Star } from 'lucide-react';
import PaymentModal from './PaymentModal';

const CTA: React.FC = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-br from-brown-800 via-brown-700 to-brown-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="flex justify-center items-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-gold-400 fill-current" />
            ))}
            <span className="ml-2 text-gold-300 font-medium">200+ Happy Investors</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Start Your Portuguese Investment Journey Today
          </h2>
          
          <p className="text-xl text-brown-200 mb-8 max-w-3xl mx-auto">
            Don't let another opportunity pass by. Get your personalized investment 
            assessment and join the hundreds of successful investors who've built 
            their Portuguese property portfolio with our expert guidance.
          </p>
        </div>

        {/* Offer Highlight */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <Clock className="h-8 w-8 text-gold-400 mx-auto mb-2" />
              <div className="text-white font-semibold">24h Delivery</div>
              <div className="text-brown-300 text-sm">Fast turnaround</div>
            </div>
            <div className="text-center">
              <Shield className="h-8 w-8 text-gold-400 mx-auto mb-2" />
              <div className="text-white font-semibold">Money-Back Guarantee</div>
              <div className="text-brown-300 text-sm">14-day guarantee</div>
            </div>
            <div className="text-center">
              <Star className="h-8 w-8 text-gold-400 mx-auto mb-2" />
              <div className="text-white font-semibold">Expert Analysis</div>
              <div className="text-brown-300 text-sm">Professional insights</div>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-4 mb-6">
            <span className="text-4xl font-display font-bold text-gold-400">€150</span>
            <span className="text-2xl text-brown-300 line-through">€400</span>
            <span className="bg-gold-500 text-brown-900 px-3 py-1 rounded-full text-sm font-bold">
              Save €250
            </span>
          </div>
          
          <button
            onClick={() => setIsPaymentModalOpen(true)}
            className="bg-gold-500 hover:bg-gold-600 text-brown-900 font-bold text-lg px-12 py-4 rounded-xl transition-all duration-200 transform hover:scale-105 inline-flex items-center space-x-3 group"
          >
            <span>Get My Personalized Assessment</span>
            <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Urgency Elements */}
        <div className="text-brown-300 space-y-2">
          <p className="font-medium">⏰ Limited time offer - Regular price €400</p>
          <p className="text-sm">Join 200+ successful investors who started with our assessment</p>
        </div>

        {/* Trust Elements */}
        <div className="mt-12 pt-8 border-t border-brown-600">
          <div className="flex flex-wrap justify-center items-center gap-8 text-brown-400">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span className="text-sm">SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">💳</span>
              <span className="text-sm">Stripe Protected</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">🔒</span>
              <span className="text-sm">Privacy Guaranteed</span>
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

export default CTA;