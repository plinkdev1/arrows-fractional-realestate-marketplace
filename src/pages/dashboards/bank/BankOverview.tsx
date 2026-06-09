import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabase';
import { FileText, TrendingUp, Clock, CheckCircle, XCircle, DollarSign } from 'lucide-react';

interface LoanApplication {
  id: string;
  user_id: string;
  property_id: string;
  amount: number;
  status: string;
  application_data: any;
  created_at: string;
  user_profiles?: { full_name: string };
  properties?: { title: string; location: string };
}

export const BankOverview: React.FC = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<LoanApplication | null>(null);

  useEffect(() => {
    if (user) {
      loadApplications();
    }
  }, [user]);

  const loadApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('loan_applications')
        .select(`
          *,
          user_profiles:user_id (full_name),
          properties:property_id (title, location)
        `)
        .eq('bank_id', user?.profile.organization_id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('loan_applications')
        .update({ status: newStatus, assigned_to: user?.id })
        .eq('id', applicationId);

      if (error) throw error;
      await loadApplications();
      setSelectedApplication(null);
    } catch (error) {
      console.error('Error updating application:', error);
    }
  };

  const getStatusCounts = () => {
    return {
      new: applications.filter(a => a.status === 'new').length,
      under_review: applications.filter(a => a.status === 'under_review').length,
      approved: applications.filter(a => a.status === 'approved').length,
      rejected: applications.filter(a => a.status === 'rejected').length,
      funded: applications.filter(a => a.status === 'funded').length,
    };
  };

  const getTotalAmount = () => {
    return applications
      .filter(a => a.status === 'approved' || a.status === 'funded')
      .reduce((sum, a) => sum + a.amount, 0);
  };

  const statusCounts = getStatusCounts();
  const totalAmount = getTotalAmount();

  const ApplicationCard = ({ application, onClick }: { application: LoanApplication; onClick: () => void }) => {
    const statusColors = {
      new: 'bg-blue-100 text-blue-800',
      under_review: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      funded: 'bg-purple-100 text-purple-800',
    };

    return (
      <div
        onClick={onClick}
        className="bg-white p-4 rounded-lg border border-gold/20 hover:shadow-md transition-shadow cursor-pointer"
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-brown">{application.user_profiles?.full_name}</h3>
            <p className="text-sm text-brown/60">{application.properties?.title}</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[application.status as keyof typeof statusColors]}`}>
            {application.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-brown/60">Amount</span>
            <span className="font-semibold text-brown">€{application.amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-brown/60">Submitted</span>
            <span className="text-brown/70">{new Date(application.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brown">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brown">Loan Applications</h1>
        <p className="text-brown/60 mt-1">Manage and process loan applications</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gold/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-brown">{statusCounts.new}</p>
          <p className="text-sm text-brown/60">New Applications</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gold/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-brown">{statusCounts.under_review}</p>
          <p className="text-sm text-brown/60">Under Review</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gold/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-brown">{statusCounts.approved}</p>
          <p className="text-sm text-brown/60">Approved</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gold/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-brown">€{totalAmount.toLocaleString()}</p>
          <p className="text-sm text-brown/60">Total Approved</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-1 space-y-3">
          <button className="w-full px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors text-left font-medium">
            New ({statusCounts.new})
          </button>
          <button className="w-full px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors text-left font-medium">
            Under Review ({statusCounts.under_review})
          </button>
          <button className="w-full px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors text-left font-medium">
            Approved ({statusCounts.approved})
          </button>
          <button className="w-full px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors text-left font-medium">
            Rejected ({statusCounts.rejected})
          </button>
          <button className="w-full px-4 py-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition-colors text-left font-medium">
            Funded ({statusCounts.funded})
          </button>
        </div>

        <div className="lg:col-span-4 space-y-4">
          {applications.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gold/20">
              <FileText className="w-16 h-16 text-brown/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-brown mb-2">No Applications</h3>
              <p className="text-brown/60">No loan applications found</p>
            </div>
          ) : (
            applications.map(application => (
              <ApplicationCard
                key={application.id}
                application={application}
                onClick={() => setSelectedApplication(application)}
              />
            ))
          )}
        </div>
      </div>

      {selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full my-8 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-brown">Application Details</h2>
              <button
                onClick={() => setSelectedApplication(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-brown/60">Applicant</label>
                  <p className="font-medium text-brown">{selectedApplication.user_profiles?.full_name}</p>
                </div>
                <div>
                  <label className="text-sm text-brown/60">Property</label>
                  <p className="font-medium text-brown">{selectedApplication.properties?.title}</p>
                </div>
                <div>
                  <label className="text-sm text-brown/60">Loan Amount</label>
                  <p className="font-medium text-brown">€{selectedApplication.amount.toLocaleString()}</p>
                </div>
                <div>
                  <label className="text-sm text-brown/60">Status</label>
                  <p className="font-medium text-brown capitalize">{selectedApplication.status.replace('_', ' ')}</p>
                </div>
                <div>
                  <label className="text-sm text-brown/60">Submitted</label>
                  <p className="font-medium text-brown">
                    {new Date(selectedApplication.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-gold/20">
                <h3 className="font-semibold text-brown mb-4">Update Status</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedApplication.status === 'new' && (
                    <button
                      onClick={() => updateApplicationStatus(selectedApplication.id, 'under_review')}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                      Start Review
                    </button>
                  )}
                  {selectedApplication.status === 'under_review' && (
                    <>
                      <button
                        onClick={() => updateApplicationStatus(selectedApplication.id, 'approved')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(selectedApplication.id, 'rejected')}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {selectedApplication.status === 'approved' && (
                    <button
                      onClick={() => updateApplicationStatus(selectedApplication.id, 'funded')}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Mark as Funded
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
