import React, { useState } from 'react';
import { Database, Clock, Trash2, Download, Printer as Print, Shield, AlertTriangle } from 'lucide-react';

const DataRetention: React.FC = () => {
  const [showDataExport, setShowDataExport] = useState(false);
  const [showDeletionRequest, setShowDeletionRequest] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const retentionPeriods = [
    {
      category: 'Personal Identifiers',
      data: 'Name, email, phone, address',
      activeUsers: '5 years after relationship ends',
      inactiveUsers: '3 years after last activity',
      deletedAccounts: '30-day recovery period',
      exceptions: 'Legal hold, ongoing disputes'
    },
    {
      category: 'Assessment Purchase Data',
      data: 'Payment records, questionnaires, reports',
      activeUsers: '7 years (tax compliance)',
      inactiveUsers: '5 years (service improvement)',
      deletedAccounts: '2 years (quality assurance)',
      exceptions: 'Regulatory requirements'
    },
    {
      category: 'Marketing Data',
      data: 'Newsletter, cookies, form submissions',
      activeUsers: 'Until unsubscribe',
      inactiveUsers: '2 years',
      deletedAccounts: 'Immediate deletion',
      exceptions: 'Consent withdrawal'
    },
    {
      category: 'Technical Logs',
      data: 'Server logs, security logs, error logs',
      activeUsers: '90 days - 1 year',
      inactiveUsers: 'Same as active',
      deletedAccounts: 'Same as active',
      exceptions: 'Security investigations'
    },
    {
      category: 'Communication Records',
      data: 'Support emails, consultation transcripts',
      activeUsers: '3 years',
      inactiveUsers: '2 years',
      deletedAccounts: '1 year',
      exceptions: 'Dispute resolution'
    }
  ];

  return (
    <div className="min-h-screen bg-cream-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Database className="h-8 w-8 text-gold-600" />
              <h1 className="text-3xl font-display font-bold text-brown-800">
                Data Retention & Processing Policy
              </h1>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handlePrint}
                className="flex items-center space-x-2 px-4 py-2 bg-gold-100 text-gold-700 rounded-lg hover:bg-gold-200 transition-colors"
              >
                <Print className="h-4 w-4" />
                <span>Print</span>
              </button>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center space-x-2 px-4 py-2 bg-brown-600 text-white rounded-lg hover:bg-brown-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>PDF</span>
              </button>
            </div>
          </div>
          
          <div className="text-brown-600 mb-4">
            <strong>Last Updated:</strong> January 15, 2025
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800">
              This policy explains how long we keep your personal data, why we keep it, 
              and how you can request access, export, or deletion of your information 
              in compliance with GDPR and Portuguese data protection law.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Download className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-brown-800">Export Your Data</h3>
            </div>
            <p className="text-brown-600 mb-4">
              Download a complete copy of your personal data in JSON format.
            </p>
            <button
              onClick={() => setShowDataExport(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Request Data Export
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Trash2 className="h-6 w-6 text-red-600" />
              <h3 className="text-lg font-semibold text-brown-800">Delete Your Data</h3>
            </div>
            <p className="text-brown-600 mb-4">
              Request deletion of your personal data (subject to legal requirements).
            </p>
            <button
              onClick={() => setShowDeletionRequest(true)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Request Data Deletion
            </button>
          </div>
        </div>

        {/* Data Export Modal */}
        {showDataExport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold text-brown-800 mb-4">Request Data Export</h3>
              <p className="text-brown-600 mb-6">
                We'll send a complete copy of your personal data to your registered email address within 30 days.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowDataExport(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle data export request
                    setShowDataExport(false);
                    alert('Data export request submitted. You will receive an email confirmation.');
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Confirm Request
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Data Deletion Modal */}
        {showDeletionRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <h3 className="text-xl font-semibold text-brown-800">Request Data Deletion</h3>
              </div>
              <p className="text-brown-600 mb-4">
                This will permanently delete your personal data, subject to legal retention requirements. 
                This action cannot be undone.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
                <p className="text-red-700 text-sm">
                  Some data may be retained for legal compliance (tax records, payment history).
                </p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowDeletionRequest(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle data deletion request
                    setShowDeletionRequest(false);
                    alert('Data deletion request submitted. You will receive an email confirmation.');
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Confirm Deletion
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Data Retention Philosophy */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-display font-semibold text-brown-800 mb-6">
              Our Data Retention Philosophy
            </h2>
            
            <div className="space-y-4 text-brown-600">
              <p>
                We believe in balancing service quality with privacy protection. We only retain personal data 
                for as long as necessary to fulfill the purposes for which it was collected, comply with legal 
                obligations, and protect our legitimate business interests.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gold-50 rounded-lg p-4">
                  <h4 className="font-semibold text-brown-800 mb-2">Principles We Follow</h4>
                  <ul className="text-sm text-brown-600 space-y-1">
                    <li>• Minimum necessary retention periods</li>
                    <li>• Automated deletion processes</li>
                    <li>• Regular data audits and cleanup</li>
                    <li>• User control over personal data</li>
                  </ul>
                </div>
                
                <div className="bg-brown-50 rounded-lg p-4">
                  <h4 className="font-semibold text-brown-800 mb-2">Legal Requirements</h4>
                  <ul className="text-sm text-brown-600 space-y-1">
                    <li>• Portuguese tax law (7 years)</li>
                    <li>• Anti-money laundering (5 years)</li>
                    <li>• Consumer protection (2-3 years)</li>
                    <li>• GDPR compliance</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Retention Periods Table */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-display font-semibold text-brown-800 mb-6">
              Data Retention Periods
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gold-200">
                <thead>
                  <tr className="bg-gold-50">
                    <th className="border border-gold-200 px-4 py-3 text-left font-semibold text-brown-800">Data Category</th>
                    <th className="border border-gold-200 px-4 py-3 text-left font-semibold text-brown-800">Active Users</th>
                    <th className="border border-gold-200 px-4 py-3 text-left font-semibold text-brown-800">Inactive Users</th>
                    <th className="border border-gold-200 px-4 py-3 text-left font-semibold text-brown-800">Deleted Accounts</th>
                    <th className="border border-gold-200 px-4 py-3 text-left font-semibold text-brown-800">Exceptions</th>
                  </tr>
                </thead>
                <tbody>
                  {retentionPeriods.map((period, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-cream-50' : 'bg-white'}>
                      <td className="border border-gold-200 px-4 py-3">
                        <div className="font-semibold text-brown-800">{period.category}</div>
                        <div className="text-sm text-brown-600">{period.data}</div>
                      </td>
                      <td className="border border-gold-200 px-4 py-3 text-sm">{period.activeUsers}</td>
                      <td className="border border-gold-200 px-4 py-3 text-sm">{period.inactiveUsers}</td>
                      <td className="border border-gold-200 px-4 py-3 text-sm">{period.deletedAccounts}</td>
                      <td className="border border-gold-200 px-4 py-3 text-sm">{period.exceptions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Data Processing Purposes */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-display font-semibold text-brown-800 mb-6">
              Data Processing Purposes
            </h2>
            
            <div className="space-y-6">
              <div className="border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-brown-800 mb-4 flex items-center">
                  <Shield className="h-5 w-5 text-green-600 mr-2" />
                  Primary Processing (Contract Performance)
                </h3>
                <ul className="list-disc list-inside text-brown-600 space-y-1">
                  <li>Investment assessment report generation</li>
                  <li>Consultation call delivery and scheduling</li>
                  <li>Payment processing and invoicing</li>
                  <li>Customer support and service delivery</li>
                </ul>
              </div>

              <div className="border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-brown-800 mb-4 flex items-center">
                  <Database className="h-5 w-5 text-blue-600 mr-2" />
                  Secondary Processing (Legitimate Interest)
                </h3>
                <ul className="list-disc list-inside text-brown-600 space-y-1">
                  <li>Service improvement through anonymized analytics</li>
                  <li>AI model training with anonymized data</li>
                  <li>Market research using aggregated data</li>
                  <li>Fraud prevention and security monitoring</li>
                </ul>
              </div>

              <div className="border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-brown-800 mb-4 flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                  Prohibited Processing
                </h3>
                <ul className="list-disc list-inside text-brown-600 space-y-1">
                  <li>Sale of personal data to third parties</li>
                  <li>Unauthorized marketing communications</li>
                  <li>Discrimination based on protected characteristics</li>
                  <li>Processing beyond stated purposes without consent</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Automated Deletion */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-display font-semibold text-brown-800 mb-6">
              Automated Deletion Processes
            </h2>
            
            <div className="space-y-4">
              <div className="bg-gold-50 rounded-lg p-6">
                <h3 className="font-semibold text-brown-800 mb-3">Scheduled Deletion Jobs</h3>
                <p className="text-brown-600 mb-4">
                  Our systems automatically delete data when retention periods expire:
                </p>
                <ul className="list-disc list-inside text-brown-600 space-y-1">
                  <li>Daily: Expired session data and temporary files</li>
                  <li>Weekly: Old server logs and error reports</li>
                  <li>Monthly: Inactive user data cleanup</li>
                  <li>Quarterly: Comprehensive data audit and cleanup</li>
                </ul>
              </div>

              <div className="bg-brown-50 rounded-lg p-6">
                <h3 className="font-semibold text-brown-800 mb-3">User-Triggered Deletion</h3>
                <p className="text-brown-600 mb-4">
                  When you request account deletion or data removal:
                </p>
                <ul className="list-disc list-inside text-brown-600 space-y-1">
                  <li>Immediate: Personal identifiers and preferences</li>
                  <li>30 days: Recovery period for accidental deletions</li>
                  <li>Permanent: Complete removal from all systems</li>
                  <li>Exceptions: Legal compliance data retained as required</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Right to Erasure */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-display font-semibold text-brown-800 mb-6">
              Right to Erasure ("Right to be Forgotten")
            </h2>
            
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-800 mb-3">When You Can Request Deletion</h3>
                <ul className="list-disc list-inside text-green-700 space-y-1">
                  <li>Personal data is no longer necessary for original purpose</li>
                  <li>You withdraw consent and no other legal basis exists</li>
                  <li>Data has been unlawfully processed</li>
                  <li>Deletion is required for legal compliance</li>
                  <li>You object to processing and no overriding legitimate grounds exist</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="font-semibold text-red-800 mb-3">When We Cannot Delete Data</h3>
                <ul className="list-disc list-inside text-red-700 space-y-1">
                  <li>Legal obligations require retention (tax, AML laws)</li>
                  <li>Legitimate interests override your request</li>
                  <li>Data needed for legal claims or defense</li>
                  <li>Public interest or scientific research purposes</li>
                  <li>Freedom of expression and information rights</li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-brown-800 mb-3">How to Request Deletion</h3>
                <p className="text-brown-600 mb-4">
                  To request deletion of your personal data:
                </p>
                <ol className="list-decimal list-inside text-brown-600 space-y-1">
                  <li>Send an email to <a href="mailto:privacy@arrows.pt" className="text-gold-600 hover:text-gold-700">privacy@arrows.pt</a></li>
                  <li>Include your full name and registered email address</li>
                  <li>Specify which data you want deleted</li>
                  <li>Provide reason for deletion request</li>
                  <li>We will respond within 30 days</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Data Portability */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-display font-semibold text-brown-800 mb-6">
              Data Portability
            </h2>
            
            <div className="space-y-4">
              <p className="text-brown-600">
                You have the right to receive your personal data in a structured, commonly used, 
                and machine-readable format, and to transmit that data to another controller.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gold-50 rounded-lg p-4">
                  <h4 className="font-semibold text-brown-800 mb-2">What's Included</h4>
                  <ul className="text-sm text-brown-600 space-y-1">
                    <li>• Personal profile information</li>
                    <li>• Investment preferences and questionnaire responses</li>
                    <li>• Communication history</li>
                    <li>• Account settings and preferences</li>
                  </ul>
                </div>
                
                <div className="bg-brown-50 rounded-lg p-4">
                  <h4 className="font-semibold text-brown-800 mb-2">What's Excluded</h4>
                  <ul className="text-sm text-brown-600 space-y-1">
                    <li>• Proprietary analysis and recommendations</li>
                    <li>• Third-party data (market information)</li>
                    <li>• Data that affects others' rights</li>
                    <li>• Copyrighted content</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-brown-800 mb-2">Export Format</h4>
                <p className="text-brown-600 text-sm">
                  Data is provided in JSON format with clear field labels and descriptions. 
                  Large files are compressed and password-protected for security.
                </p>
              </div>
            </div>
          </section>

          {/* Security Measures */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-display font-semibold text-brown-800 mb-6">
              Data Security During Retention
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-gold-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-brown-800">Encryption at Rest and in Transit</h4>
                  <p className="text-brown-600">All personal data is encrypted using AES-256 encryption standards</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-gold-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-brown-800">Access Controls</h4>
                  <p className="text-brown-600">Role-based access with multi-factor authentication and audit logging</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Database className="h-5 w-5 text-gold-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-brown-800">Backup and Recovery</h4>
                  <p className="text-brown-600">Secure backups with same retention periods and encryption standards</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-gold-50 rounded-xl p-8">
            <h2 className="text-2xl font-display font-semibold text-brown-800 mb-6">
              Contact Us About Data Retention
            </h2>
            
            <p className="text-brown-600 mb-4">
              For questions about data retention, deletion requests, or data exports:
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Database className="h-5 w-5 text-gold-600" />
                <a href="mailto:privacy@arrows.pt" className="text-gold-600 hover:text-gold-700">
                  privacy@arrows.pt
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <span className="h-5 w-5 text-gold-600">📞</span>
                <span className="text-brown-600">+351 21 123 4567</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="h-5 w-5 text-gold-600">📍</span>
                <span className="text-brown-600">
                  Data Protection Officer<br />
                  Rua Augusta 123, 1100-048 Lisboa, Portugal
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DataRetention;