import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import {
  FileText,
  Phone,
  Building,
  Download,
  Calendar,
  MessageSquare,
  TrendingUp,
  Star,
} from 'lucide-react';

export const ClientOverview: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-gold to-amber-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.profile.full_name}!</h1>
        <p className="opacity-90">Last login: {new Date().toLocaleDateString()}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to="/dashboard/client/assessment"
            className="px-4 py-2 bg-white text-gold rounded-lg hover:bg-cream transition-colors inline-flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Assessment</span>
          </Link>
          <Link
            to="/dashboard/client/consultation"
            className="px-4 py-2 bg-white/20 backdrop-blur text-white rounded-lg hover:bg-white/30 transition-colors inline-flex items-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule Call</span>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gold/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-brown">24</p>
          <p className="text-sm text-brown/60">Properties Viewed</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gold/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-brown">8</p>
          <p className="text-sm text-brown/60">Properties Saved</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gold/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-brown">3</p>
          <p className="text-sm text-brown/60">Unread Messages</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gold/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-gold" />
            </div>
          </div>
          <p className="text-2xl font-bold text-brown">1</p>
          <p className="text-sm text-brown/60">Assessment Reports</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gold/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-brown flex items-center space-x-2">
              <FileText className="w-5 h-5 text-gold" />
              <span>Assessment Status</span>
            </h2>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Delivered
            </span>
          </div>
          <p className="text-brown/70 mb-4">
            Your personalized investment assessment was delivered on January 15, 2025
          </p>
          <div className="space-y-3">
            <Link
              to="/dashboard/client/assessment"
              className="block w-full px-4 py-2 bg-gold text-white text-center rounded-lg hover:bg-gold/90 transition-colors"
            >
              View Assessment
            </Link>
            <button className="block w-full px-4 py-2 border border-gold text-gold text-center rounded-lg hover:bg-gold/10 transition-colors">
              Request Revision (13 days left)
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gold/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-brown flex items-center space-x-2">
              <Phone className="w-5 h-5 text-gold" />
              <span>Consultation Call</span>
            </h2>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              Not Scheduled
            </span>
          </div>
          <p className="text-brown/70 mb-4">
            Schedule your free 30-minute consultation to discuss your investment strategy
          </p>
          <Link
            to="/dashboard/client/consultation"
            className="block w-full px-4 py-2 bg-gold text-white text-center rounded-lg hover:bg-gold/90 transition-colors"
          >
            Schedule Consultation
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gold/20">
        <h2 className="text-xl font-semibold text-brown mb-4">Saved Properties</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gold/20 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-gold/20 to-brown/20"></div>
              <div className="p-4">
                <h3 className="font-semibold text-brown mb-2">Modern Apartment in Lisbon</h3>
                <p className="text-2xl font-bold text-gold mb-2">€350,000</p>
                <p className="text-sm text-brown/60">2 beds • 2 baths • 85m²</p>
                <Link
                  to="/dashboard/client/properties"
                  className="mt-3 block text-center px-4 py-2 bg-gold/10 text-gold rounded-lg hover:bg-gold/20 transition-colors text-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        <Link
          to="/dashboard/client/properties"
          className="mt-4 block text-center text-gold hover:underline"
        >
          View All Saved Properties →
        </Link>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gold/20">
        <h2 className="text-xl font-semibold text-brown mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-brown">Assessment Delivered</p>
              <p className="text-sm text-brown/60">Your investment assessment is ready to view</p>
              <p className="text-xs text-brown/40 mt-1">2 days ago</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Building className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-brown">Property Saved</p>
              <p className="text-sm text-brown/60">You saved "Modern Apartment in Lisbon"</p>
              <p className="text-xs text-brown/40 mt-1">3 days ago</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-brown">New Message</p>
              <p className="text-sm text-brown/60">Support team responded to your inquiry</p>
              <p className="text-xs text-brown/40 mt-1">5 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
