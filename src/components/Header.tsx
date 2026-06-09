import React, { useState } from 'react';
import { Building, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gold-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Building className="h-8 w-8 text-gold-600" />
            <span className="text-2xl font-display font-semibold text-brown-800">
              PropertyVest
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-brown-700 hover:text-gold-600 font-medium transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-brown-700 hover:text-gold-600 font-medium transition-colors">
              Success Stories
            </a>
            <a href="#faq" className="text-brown-700 hover:text-gold-600 font-medium transition-colors">
              FAQ
            </a>
            <button className="bg-gold-600 hover:bg-gold-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
              Get Assessment
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-brown-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-gold-200 pt-4">
            <div className="flex flex-col space-y-4">
              <a
                href="#features"
                className="text-brown-700 hover:text-gold-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#testimonials"
                className="text-brown-700 hover:text-gold-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Success Stories
              </a>
              <a
                href="#faq"
                className="text-brown-700 hover:text-gold-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </a>
              <button className="bg-gold-600 hover:bg-gold-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors w-full">
                Get Assessment
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;