import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabase';
import { Download, FileText, Calendar, AlertCircle, Printer, RefreshCw } from 'lucide-react';

interface Assessment {
  id: string;
  status: string;
  pdf_url: string | null;
  purchase_date: string;
  delivery_date: string | null;
  price: number;
  key_findings: any;
}

export const ClientAssessment: React.FC = () => {
  const { user } = useAuth();
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRefundModal, setShowRefundModal] = useState(false);

  useEffect(() => {
    if (user) {
      loadAssessment();
    }
  }, [user]);

  const loadAssessment = async () => {
    try {
      const { data, error } = await supabase
        .from('assessments')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .maybeSingle();

      if (error) throw error;
      setAssessment(data);
    } catch (error) {
      console.error('Error loading assessment:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysUntilRefundExpiry = () => {
    if (!assessment?.purchase_date) return 0;
    const purchaseDate = new Date(assessment.purchase_date);
    const expiryDate = new Date(purchaseDate);
    expiryDate.setDate(expiryDate.getDate() + 14);
    const today = new Date();
    const daysLeft = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, daysLeft);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (assessment?.pdf_url) {
      window.open(assessment.pdf_url, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brown">Loading assessment...</p>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 text-brown/30 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-brown mb-2">No Assessment Found</h2>
        <p className="text-brown/60 mb-6">
          You haven't purchased an assessment yet. Get started with your investment journey today!
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors"
        >
          Get Your Assessment
        </a>
      </div>
    );
  }

  const daysLeft = getDaysUntilRefundExpiry();
  const canRequestRefund = daysLeft > 0 && assessment.status === 'delivered';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-brown">My Assessment</h1>
          <p className="text-brown/60 mt-1">View and manage your investment assessment</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 border border-gold text-gold rounded-lg hover:bg-gold/10 transition-colors inline-flex items-center space-x-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>
          <button
            onClick={handleDownload}
            disabled={!assessment.pdf_url}
            className="px-4 py-2 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors inline-flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg p-6 border border-gold/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-brown">Assessment Status</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                assessment.status === 'delivered' ? 'bg-green-100 text-green-800' :
                assessment.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                assessment.status === 'revision_requested' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {assessment.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gold/10">
                <span className="text-brown/70">Purchase Date</span>
                <span className="font-medium text-brown">
                  {new Date(assessment.purchase_date).toLocaleDateString()}
                </span>
              </div>
              {assessment.delivery_date && (
                <div className="flex items-center justify-between py-2 border-b border-gold/10">
                  <span className="text-brown/70">Delivery Date</span>
                  <span className="font-medium text-brown">
                    {new Date(assessment.delivery_date).toLocaleDateString()}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between py-2 border-b border-gold/10">
                <span className="text-brown/70">Price Paid</span>
                <span className="font-medium text-brown">€{assessment.price.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {assessment.pdf_url && (
            <div className="bg-white rounded-lg p-6 border border-gold/20">
              <h2 className="text-xl font-semibold text-brown mb-4">Assessment Report</h2>
              <div className="aspect-[8.5/11] bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-brown/30 mx-auto mb-4" />
                  <p className="text-brown/60 mb-4">PDF Viewer</p>
                  <button
                    onClick={handleDownload}
                    className="px-4 py-2 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors"
                  >
                    Open PDF
                  </button>
                </div>
              </div>
            </div>
          )}

          {assessment.key_findings && (
            <div className="bg-white rounded-lg p-6 border border-gold/20">
              <h2 className="text-xl font-semibold text-brown mb-4">Key Findings Summary</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-brown mb-2">Recommended Budget</h4>
                  <p className="text-2xl font-bold text-blue-600">€350,000 - €500,000</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-brown mb-2">Expected ROI</h4>
                  <p className="text-2xl font-bold text-green-600">6-8% Annual</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-brown mb-2">Risk Level</h4>
                  <p className="text-2xl font-bold text-purple-600">Medium</p>
                </div>
                <div className="p-4 bg-gold/10 rounded-lg">
                  <h4 className="font-semibold text-brown mb-2">Timeframe</h4>
                  <p className="text-2xl font-bold text-gold">5-7 Years</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {canRequestRefund && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <div className="flex items-start space-x-3 mb-4">
                <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-orange-800 mb-1">Refund Eligible</h3>
                  <p className="text-sm text-orange-700">
                    You have {daysLeft} day{daysLeft !== 1 ? 's' : ''} left to request a refund
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowRefundModal(true)}
                className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Request Refund
              </button>
            </div>
          )}

          <div className="bg-white rounded-lg p-6 border border-gold/20">
            <h3 className="font-semibold text-brown mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <a
                href="/dashboard/client/consultation"
                className="block w-full px-4 py-2 bg-gold text-white text-center rounded-lg hover:bg-gold/90 transition-colors"
              >
                Schedule Consultation
              </a>
              <a
                href="/dashboard/client/properties"
                className="block w-full px-4 py-2 border border-gold text-gold text-center rounded-lg hover:bg-gold/10 transition-colors"
              >
                Browse Properties
              </a>
              <a
                href="/dashboard/client/messages"
                className="block w-full px-4 py-2 border border-gold text-gold text-center rounded-lg hover:bg-gold/10 transition-colors"
              >
                Ask a Question
              </a>
            </div>
          </div>

          {assessment.status !== 'delivered' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-800 mb-1">Assessment in Progress</h3>
                  <p className="text-sm text-blue-700">
                    Your assessment is being prepared by our team. You'll receive an email when it's ready.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg p-6 border border-gold/20">
            <h3 className="font-semibold text-brown mb-3">Need Help?</h3>
            <p className="text-sm text-brown/70 mb-4">
              If you have questions about your assessment, our support team is here to help.
            </p>
            <a
              href="/dashboard/client/messages"
              className="block w-full px-4 py-2 border border-gold text-gold text-center rounded-lg hover:bg-gold/10 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>

      {showRefundModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-brown mb-4">Request Refund</h3>
            <p className="text-brown/70 mb-6">
              Are you sure you want to request a refund? Please note that after the consultation call,
              refunds are no longer available.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  alert('Refund request submitted. Our team will contact you shortly.');
                  setShowRefundModal(false);
                }}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Submit Refund Request
              </button>
              <button
                onClick={() => setShowRefundModal(false)}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
