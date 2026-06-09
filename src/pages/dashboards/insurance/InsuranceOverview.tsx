import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabase';
import { FileText, DollarSign, CheckCircle, Clock } from 'lucide-react';

interface InsuranceQuote {
  id: string;
  user_id: string;
  property_id: string;
  coverage_type: string;
  premium_amount: number | null;
  status: string;
  created_at: string;
  user_profiles?: { full_name: string };
  properties?: { title: string; location: string };
}

export const InsuranceOverview: React.FC = () => {
  const { user } = useAuth();
  const [quotes, setQuotes] = useState<InsuranceQuote[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<InsuranceQuote | null>(null);
  const [premiumAmount, setPremiumAmount] = useState('');

  useEffect(() => {
    if (user) {
      loadQuotes();
    }
  }, [user]);

  const loadQuotes = async () => {
    try {
      const { data, error } = await supabase
        .from('insurance_quotes')
        .select(`
          *,
          user_profiles:user_id (full_name),
          properties:property_id (title, location)
        `)
        .eq('insurance_company_id', user?.profile.organization_id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQuotes(data || []);
    } catch (error) {
      console.error('Error loading quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuoteStatus = async (quoteId: string, newStatus: string, amount?: number) => {
    try {
      const updateData: any = { status: newStatus };
      if (amount) {
        updateData.premium_amount = amount;
      }

      const { error } = await supabase
        .from('insurance_quotes')
        .update(updateData)
        .eq('id', quoteId);

      if (error) throw error;
      await loadQuotes();
      setSelectedQuote(null);
      setPremiumAmount('');
    } catch (error) {
      console.error('Error updating quote:', error);
    }
  };

  const getStatusCounts = () => {
    return {
      requested: quotes.filter(q => q.status === 'requested').length,
      quoted: quotes.filter(q => q.status === 'quoted').length,
      accepted: quotes.filter(q => q.status === 'accepted').length,
      issued: quotes.filter(q => q.status === 'issued').length,
    };
  };

  const statusCounts = getStatusCounts();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brown">Loading quotes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brown">Insurance Quotes</h1>
        <p className="text-brown/60 mt-1">Manage property insurance quotes and policies</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gold/20">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-brown">{statusCounts.requested}</p>
          <p className="text-sm text-brown/60">Pending Quotes</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gold/20">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-brown">{statusCounts.quoted}</p>
          <p className="text-sm text-brown/60">Quotes Sent</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gold/20">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-brown">{statusCounts.accepted}</p>
          <p className="text-sm text-brown/60">Accepted</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gold/20">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <DollarSign className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-brown">{statusCounts.issued}</p>
          <p className="text-sm text-brown/60">Policies Issued</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gold/20 overflow-hidden">
        <table className="w-full">
          <thead className="bg-cream">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-semibold text-brown">Client</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-brown">Property</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-brown">Coverage</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-brown">Premium</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-brown">Status</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-brown">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/20">
            {quotes.map(quote => (
              <tr key={quote.id} className="hover:bg-cream/50 transition-colors">
                <td className="px-6 py-4 text-brown">{quote.user_profiles?.full_name}</td>
                <td className="px-6 py-4 text-brown/70 text-sm">{quote.properties?.title}</td>
                <td className="px-6 py-4 text-brown/70 text-sm capitalize">{quote.coverage_type}</td>
                <td className="px-6 py-4 text-brown">
                  {quote.premium_amount ? `€${quote.premium_amount.toLocaleString()}` : '-'}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    quote.status === 'requested' ? 'bg-blue-100 text-blue-800' :
                    quote.status === 'quoted' ? 'bg-yellow-100 text-yellow-800' :
                    quote.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    quote.status === 'issued' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {quote.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedQuote(quote)}
                    className="text-gold hover:underline text-sm"
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {quotes.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-brown/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-brown mb-2">No Quotes</h3>
            <p className="text-brown/60">No insurance quotes found</p>
          </div>
        )}
      </div>

      {selectedQuote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-brown">Quote Details</h2>
              <button
                onClick={() => {
                  setSelectedQuote(null);
                  setPremiumAmount('');
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-brown/60">Client</label>
                <p className="font-medium text-brown">{selectedQuote.user_profiles?.full_name}</p>
              </div>
              <div>
                <label className="text-sm text-brown/60">Property</label>
                <p className="font-medium text-brown">{selectedQuote.properties?.title}</p>
              </div>
              <div>
                <label className="text-sm text-brown/60">Coverage Type</label>
                <p className="font-medium text-brown capitalize">{selectedQuote.coverage_type}</p>
              </div>
              <div>
                <label className="text-sm text-brown/60">Current Status</label>
                <p className="font-medium text-brown capitalize">{selectedQuote.status}</p>
              </div>

              {selectedQuote.status === 'requested' && (
                <div>
                  <label className="block text-sm font-medium text-brown mb-2">Premium Amount (€)</label>
                  <input
                    type="number"
                    value={premiumAmount}
                    onChange={(e) => setPremiumAmount(e.target.value)}
                    className="w-full px-4 py-2 border border-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="Enter premium amount"
                  />
                </div>
              )}

              <div className="pt-4 border-t border-gold/20 space-y-3">
                {selectedQuote.status === 'requested' && (
                  <button
                    onClick={() => updateQuoteStatus(selectedQuote.id, 'quoted', parseFloat(premiumAmount))}
                    disabled={!premiumAmount}
                    className="w-full px-4 py-2 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors disabled:opacity-50"
                  >
                    Send Quote
                  </button>
                )}
                {selectedQuote.status === 'quoted' && (
                  <button
                    onClick={() => updateQuoteStatus(selectedQuote.id, 'accepted')}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Mark as Accepted
                  </button>
                )}
                {selectedQuote.status === 'accepted' && (
                  <button
                    onClick={() => updateQuoteStatus(selectedQuote.id, 'issued')}
                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Issue Policy
                  </button>
                )}
                <button
                  onClick={() => {
                    setSelectedQuote(null);
                    setPremiumAmount('');
                  }}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
