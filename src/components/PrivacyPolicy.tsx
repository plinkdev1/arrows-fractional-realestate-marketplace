import React, { useState } from 'react';
import { ArrowLeft, Download, Search, Eye, Shield, Users, Database, Globe, Clock, FileText } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('');

  const handlePrint = () => {
    window.print();
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const sections = [
    { id: 'data-controller', title: 'Data Controller Information', icon: Shield },
    { id: 'data-collection', title: 'Data We Collect', icon: Database },
    { id: 'data-usage', title: 'How We Use Your Data', icon: Users },
    { id: 'legal-basis', title: 'Legal Basis for Processing', icon: FileText },
    { id: 'data-sharing', title: 'Data Sharing & Third Parties', icon: Globe },
    { id: 'international-transfers', title: 'International Data Transfers', icon: Globe },
    { id: 'data-retention', title: 'Data Retention', icon: Clock },
    { id: 'user-rights', title: 'Your Rights (GDPR)', icon: Shield },
    { id: 'cookies', title: 'Cookies & Tracking', icon: Eye },
    { id: 'security', title: 'Security Measures', icon: Shield },
    { id: 'children', title: 'Children\'s Privacy', icon: Users },
    { id: 'updates', title: 'Updates to Policy', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gold/20">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="flex items-center text-brown hover:text-gold transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>
              <h1 className="text-3xl font-bold text-brown font-playfair">Privacy Policy</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-brown/60" />
                <input
                  type="text"
                  placeholder="Search policy..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gold/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
              </div>
              <button
                onClick={handlePrint}
                className="flex items-center px-4 py-2 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Print/PDF
              </button>
            </div>
          </div>
          <p className="text-brown/70 mt-2">Last Updated: January 15, 2025</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 flex gap-8">
        {/* Table of Contents */}
        <div className="w-80 flex-shrink-0">
          <div className="sticky top-8 bg-white rounded-lg shadow-sm border border-gold/20 p-6">
            <h3 className="font-semibold text-brown mb-4">Table of Contents</h3>
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? 'bg-gold/10 text-gold'
                        : 'text-brown/70 hover:bg-gold/5 hover:text-brown'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{section.title}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gold/20 p-8">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <div className="mb-8 p-6 bg-gold/5 rounded-lg border border-gold/20">
              <h2 className="text-xl font-semibold text-brown mb-3">Welcome to Arrows Privacy Policy</h2>
              <p className="text-brown/80">
                At Arrows, we are committed to protecting your privacy and ensuring transparency about how we collect, 
                use, and protect your personal information. This Privacy Policy explains our practices regarding your 
                personal data when you use our real estate investment assessment services and platform.
              </p>
            </div>

            {/* Data Controller Information */}
            <section id="data-controller" className="mb-8">
              <h2 className="text-2xl font-bold text-brown mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-gold" />
                1. Data Controller Information
              </h2>
              <div className="bg-brown/5 p-6 rounded-lg">
                <p><strong>Company:</strong> Arrows - The Platform for Fractional & Non-Fractional Real Estate Deals</p>
                <p><strong>Registered Address:</strong> [To be provided - Portuguese address]</p>
                <p><strong>Contact Email:</strong> privacy@arrows.com</p>
                <p><strong>Data Protection Officer:</strong> dpo@arrows.com</p>
                <p><strong>Portuguese Registration:</strong> [To be provided]</p>
              </div>
            </section>

            {/* Data We Collect */}
            <section id="data-collection" className="mb-8">
              <h2 className="text-2xl font-bold text-brown mb-4 flex items-center">
                <Database className="w-6 h-6 mr-3 text-gold" />
                2. Data We Collect
              </h2>
              
              <h3 className="text-xl font-semibold text-brown mb-3">Personal Identifiers</h3>
              <ul className="list-disc pl-6 mb-4 text-brown/80">
                <li>Full name and contact information</li>
                <li>Email address and phone number</li>
                <li>Country of residence and preferred language</li>
                <li>IP address and device information</li>
              </ul>

              <h3 className="text-xl font-semibold text-brown mb-3">Financial Information</h3>
              <ul className="list-disc pl-6 mb-4 text-brown/80">
                <li>Investment budget and down payment capability</li>
                <li>Risk tolerance and investment timeline</li>
                <li>Current tax residency status</li>
                <li>Payment information (processed by Stripe)</li>
              </ul>

              <h3 className="text-xl font-semibold text-brown mb-3">Investment Preferences</h3>
              <ul className="list-disc pl-6 mb-4 text-brown/80">
                <li>Property types and location preferences</li>
                <li>Investment goals and strategies</li>
                <li>Experience level and market knowledge</li>
                <li>Consultation preferences and availability</li>
              </ul>

              <h3 className="text-xl font-semibold text-brown mb-3">Technical Data</h3>
              <ul className="list-disc pl-6 mb-4 text-brown/80">
                <li>Browser type and version</li>
                <li>Operating system and device type</li>
                <li>Cookies and similar tracking technologies</li>
                <li>Usage patterns and interaction data</li>
              </ul>
            </section>

            {/* How We Use Your Data */}
            <section id="data-usage" className="mb-8">
              <h2 className="text-2xl font-bold text-brown mb-4 flex items-center">
                <Users className="w-6 h-6 mr-3 text-gold" />
                3. How We Use Your Data
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gold/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-brown mb-2">Primary Services</h4>
                  <ul className="text-sm text-brown/80 space-y-1">
                    <li>• Generate personalized investment assessments</li>
                    <li>• Provide AI-powered market analysis</li>
                    <li>• Schedule and conduct consultation calls</li>
                    <li>• Deliver ongoing email support</li>
                  </ul>
                </div>
                <div className="bg-brown/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-brown mb-2">Platform Improvement</h4>
                  <ul className="text-sm text-brown/80 space-y-1">
                    <li>• Analyze usage patterns (anonymized)</li>
                    <li>• Improve AI recommendation algorithms</li>
                    <li>• Enhance user experience</li>
                    <li>• Develop new features and services</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Legal Basis */}
            <section id="legal-basis" className="mb-8">
              <h2 className="text-2xl font-bold text-brown mb-4 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-gold" />
                4. Legal Basis for Processing
              </h2>
              
              <div className="space-y-4">
                <div className="border-l-4 border-gold pl-4">
                  <h4 className="font-semibold text-brown">Contract Performance</h4>
                  <p className="text-brown/80 text-sm">Processing necessary to deliver your €150 assessment and consultation services.</p>
                </div>
                <div className="border-l-4 border-brown pl-4">
                  <h4 className="font-semibold text-brown">Legitimate Interest</h4>
                  <p className="text-brown/80 text-sm">Platform improvement, fraud prevention, and service optimization.</p>
                </div>
                <div className="border-l-4 border-gold pl-4">
                  <h4 className="font-semibold text-brown">Consent</h4>
                  <p className="text-brown/80 text-sm">Marketing communications and non-essential cookies (with opt-out option).</p>
                </div>
                <div className="border-l-4 border-brown pl-4">
                  <h4 className="font-semibold text-brown">Legal Obligations</h4>
                  <p className="text-brown/80 text-sm">Tax compliance, anti-money laundering, and regulatory requirements.</p>
                </div>
              </div>
            </section>

            {/* Data Sharing */}
            <section id="data-sharing" className="mb-8">
              <h2 className="text-2xl font-bold text-brown mb-4 flex items-center">
                <Globe className="w-6 h-6 mr-3 text-gold" />
                5. Data Sharing & Third Parties
              </h2>
              
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
                <p className="text-red-800 font-semibold">We NEVER sell your personal data to third parties for marketing purposes.</p>
              </div>

              <h3 className="text-xl font-semibold text-brown mb-3">Trusted Service Providers</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white border border-gold/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-brown mb-2">Payment Processing</h4>
                  <p className="text-sm text-brown/80">Stripe (PCI DSS compliant)</p>
                </div>
                <div className="bg-white border border-gold/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-brown mb-2">Property Data</h4>
                  <p className="text-sm text-brown/80">Apify, Idealista, Casa Sapo</p>
                </div>
                <div className="bg-white border border-gold/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-brown mb-2">AI Services</h4>
                  <p className="text-sm text-brown/80">OpenAI, Anthropic, ElevenLabs, Vapi</p>
                </div>
                <div className="bg-white border border-gold/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-brown mb-2">Infrastructure</h4>
                  <p className="text-sm text-brown/80">AWS, Vercel, Google Analytics</p>
                </div>
              </div>
            </section>

            {/* International Transfers */}
            <section id="international-transfers" className="mb-8">
              <h2 className="text-2xl font-bold text-brown mb-4 flex items-center">
                <Globe className="w-6 h-6 mr-3 text-gold" />
                6. International Data Transfers
              </h2>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <ul className="text-blue-800 space-y-2">
                  <li>• EU-US Data Privacy Framework compliance for US providers</li>
                  <li>• Standard contractual clauses with non-EU processors</li>
                  <li>• Data residency commitments for sensitive information</li>
                  <li>• Regular adequacy decision monitoring</li>
                </ul>
              </div>
            </section>

            {/* Data Retention */}
            <section id="data-retention" className="mb-8">
              <h2 className="text-2xl font-bold text-brown mb-4 flex items-center">
                <Clock className="w-6 h-6 mr-3 text-gold" />
                7. Data Retention
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gold/30">
                  <thead>
                    <tr className="bg-gold/10">
                      <th className="border border-gold/30 p-3 text-left">Data Type</th>
                      <th className="border border-gold/30 p-3 text-left">Retention Period</th>
                      <th className="border border-gold/30 p-3 text-left">Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gold/30 p-3">Assessment Data</td>
                      <td className="border border-gold/30 p-3">5 years</td>
                      <td className="border border-gold/30 p-3">Financial records compliance</td>
                    </tr>
                    <tr className="bg-cream/50">
                      <td className="border border-gold/30 p-3">Payment Records</td>
                      <td className="border border-gold/30 p-3">7 years</td>
                      <td className="border border-gold/30 p-3">Tax compliance</td>
                    </tr>
                    <tr>
                      <td className="border border-gold/30 p-3">Marketing Data</td>
                      <td className="border border-gold/30 p-3">Until consent withdrawn</td>
                      <td className="border border-gold/30 p-3">User preference</td>
                    </tr>
                    <tr className="bg-cream/50">
                      <td className="border border-gold/30 p-3">Technical Logs</td>
                      <td className="border border-gold/30 p-3">90 days</td>
                      <td className="border border-gold/30 p-3">Security and debugging</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* User Rights */}
            <section id="user-rights" className="mb-8">
              <h2 className="text-2xl font-bold text-brown mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-gold" />
                8. Your Rights (GDPR)
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gold/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-brown mb-2">Access & Portability</h4>
                  <ul className="text-sm text-brown/80 space-y-1">
                    <li>• Request copy of your data</li>
                    <li>• Export in structured format</li>
                    <li>• Transfer to another service</li>
                  </ul>
                </div>
                <div className="bg-brown/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-brown mb-2">Control & Correction</h4>
                  <ul className="text-sm text-brown/80 space-y-1">
                    <li>• Correct inaccurate information</li>
                    <li>• Delete your data ("right to be forgotten")</li>
                    <li>• Object to processing</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gold/10 rounded-lg">
                <h4 className="font-semibold text-brown mb-2">Exercise Your Rights</h4>
                <p className="text-brown/80 text-sm mb-2">Contact us at privacy@arrows.com or use our data request form.</p>
                <p className="text-brown/80 text-sm">Response time: 30 days maximum</p>
              </div>
            </section>

            {/* Cookies */}
            <section id="cookies" className="mb-8">
              <h2 className="text-2xl font-bold text-brown mb-4 flex items-center">
                <Eye className="w-6 h-6 mr-3 text-gold" />
                9. Cookies & Tracking
              </h2>
              <p className="text-brown/80 mb-4">
                We use cookies and similar technologies to enhance your experience. See our detailed 
                <a href="/cookie-policy" className="text-gold hover:underline ml-1">Cookie Policy</a> for complete information.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Essential</h4>
                  <p className="text-green-700 text-sm">Required for service functionality</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Analytics</h4>
                  <p className="text-blue-700 text-sm">Help us improve the platform</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Marketing</h4>
                  <p className="text-purple-700 text-sm">Personalized advertising</p>
                </div>
              </div>
            </section>

            {/* Security */}
            <section id="security" className="mb-8">
              <h2 className="text-2xl font-bold text-brown mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-gold" />
                10. Security Measures
              </h2>
              
              <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-3">Our Security Commitment</h4>
                <ul className="text-green-700 space-y-2">
                  <li>• Post-quantum cryptography implementation</li>
                  <li>• End-to-end encryption for sensitive data</li>
                  <li>• Regular security audits and penetration testing</li>
                  <li>• Employee access controls and training</li>
                  <li>• 24/7 monitoring and incident response</li>
                </ul>
              </div>
            </section>

            {/* Children's Privacy */}
            <section id="children" className="mb-8">
              <h2 className="text-2xl font-bold text-brown mb-4 flex items-center">
                <Users className="w-6 h-6 mr-3 text-gold" />
                11. Children's Privacy
              </h2>
              <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                <p className="text-orange-800">
                  Our services are not intended for users under 18 years of age. We do not knowingly collect 
                  personal information from children. If you believe we have collected information from a minor, 
                  please contact us immediately at privacy@arrows.com.
                </p>
              </div>
            </section>

            {/* Updates */}
            <section id="updates" className="mb-8">
              <h2 className="text-2xl font-bold text-brown mb-4 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-gold" />
                12. Updates to This Policy
              </h2>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-blue-800 mb-2">
                  We may update this Privacy Policy to reflect changes in our practices or legal requirements.
                </p>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Material changes: 30-day advance notice via email</li>
                  <li>• Minor updates: Posted on website with updated date</li>
                  <li>• Continued use constitutes acceptance of changes</li>
                </ul>
              </div>
            </section>

            {/* Contact */}
            <div className="mt-12 p-6 bg-gold/10 rounded-lg border border-gold/30">
              <h3 className="text-xl font-semibold text-brown mb-3">Contact Us</h3>
              <p className="text-brown/80 mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Email:</strong> privacy@arrows.com</p>
                  <p><strong>Data Protection Officer:</strong> dpo@arrows.com</p>
                </div>
                <div>
                  <p><strong>Address:</strong> [Portuguese registered address]</p>
                  <p><strong>Response Time:</strong> 30 days maximum</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;