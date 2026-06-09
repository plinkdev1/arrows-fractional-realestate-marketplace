import React from 'react';
import { Building, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brown-900 text-brown-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Building className="h-8 w-8 text-gold-400" />
              <span className="text-2xl font-display font-semibold text-white">
                PropertyVest
              </span>
            </div>
            <p className="text-brown-300 mb-6 max-w-md">
              Your trusted partner for Portuguese real estate investment. 
              We provide expert analysis and personalized strategies to help 
              you build a successful property portfolio in Portugal.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gold-400" />
                <span>info@propertyvest.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gold-400" />
                <span>+351 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gold-400" />
                <span>Lisbon, Portugal</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-6">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-gold-400 transition-colors">Investment Analysis</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Market Research</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Golden Visa Guidance</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Property Sourcing</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Legal Support</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-6">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-gold-400 transition-colors">Investment Guide</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Market Reports</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Tax Calculator</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brown-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-brown-400 mb-4 md:mb-0">
            © 2024 PropertyVest. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="/privacy-policy" className="hover:text-gold-400 transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-gold-400 transition-colors">Terms of Service</a>
            <a href="/cookie-policy" className="hover:text-gold-400 transition-colors">Cookie Policy</a>
            <a href="/data-retention" className="hover:text-gold-400 transition-colors">Data Retention</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;