import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'London, UK',
      investment: '€280k Portfolio',
      rating: 5,
      text: "The investment analysis was incredibly detailed and helped me identify the perfect property in Porto. I'm now earning 12% annual returns and couldn't be happier with the Golden Visa process guidance.",
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Michael Chen',
      location: 'Singapore',
      investment: '€450k Portfolio', 
      rating: 5,
      text: "PropertyVest's market insights were spot-on. They identified emerging areas in Lisbon before they became popular. My properties have appreciated 25% in just 18 months.",
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Emma Rodriguez',
      location: 'Madrid, Spain',
      investment: '€320k Portfolio',
      rating: 5,
      text: "The ROI calculations were precise and the legal guidance invaluable. I successfully navigated the Portuguese property market and now have a diversified portfolio generating steady income.",
      image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'David Thompson',
      location: 'Toronto, Canada',
      investment: '€380k Portfolio',
      rating: 5,
      text: "From market analysis to final purchase, PropertyVest guided me through every step. Their personalized approach and deep market knowledge made all the difference in my investment success.",
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-brown-800 mb-6">
            Success Stories from Our Investors
          </h2>
          <p className="text-xl text-brown-600 max-w-3xl mx-auto">
            See how our personalized investment assessments have helped investors 
            from around the world build successful Portuguese property portfolios.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-cream-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border border-gold-100 relative"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 h-8 w-8 text-gold-300" />
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-gold-500 fill-current" />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <p className="text-brown-700 mb-6 italic leading-relaxed">
                "{testimonial.text}"
              </p>
              
              {/* Customer Info */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-brown-800">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-brown-600">
                    {testimonial.location}
                  </div>
                  <div className="text-sm font-medium text-gold-600">
                    {testimonial.investment}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Banner */}
        <div className="mt-16 bg-gradient-to-r from-brown-800 to-brown-700 rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-display font-bold text-gold-300 mb-2">
                95%
              </div>
              <div className="text-brown-200">
                Client Satisfaction Rate
              </div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-gold-300 mb-2">
                15%
              </div>
              <div className="text-brown-200">
                Average Annual ROI
              </div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-gold-300 mb-2">
                €50M+
              </div>
              <div className="text-brown-200">
                Total Investment Facilitated
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;