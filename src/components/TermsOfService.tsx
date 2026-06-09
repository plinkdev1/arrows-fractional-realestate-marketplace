import React, { useState } from 'react';
import { ArrowLeft, Download, Search, FileText, Shield, Users, AlertCircle, Scale, CheckCircle } from 'lucide-react';

const TermsOfService: React.FC = () => {
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
    { id: 'acceptance', title: 'Acceptance of Terms', icon: CheckCircle },
    { id: 'services', title: 'Services Description', icon: FileText },
    { id: 'user-obligations', title: 'User Obligations', icon: Users },
    { id: 'payment', title: 'Payment Terms', icon: Scale },
    { id: 'intellectual-property', title: 'Intellectual Property', icon: Shield },
    { id: 'disclaimers', title: 'Disclaimers', icon: AlertCircle },
    { id: 'limitation', title: 'Limitation of Liability', icon: Scale },
    { id: 'termination', title: 'Termination', icon: AlertCircle },
    { id: 'governing-law', title: 'Governing Law', icon: Scale },
    { id: 'changes', title: 'Changes to Terms', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-cream">
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
              <h1 className="text-3xl font-bold text-brown font-playfair">Terms of Service</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-brown/60" />
                <input
                  type="text"
                  placeholder="Search terms..."
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

        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gold/20 p-8">
          <div className="prose prose-lg max-w-none">
            <div className="mb-8 p-6 bg-gold/5 rounded-lg border border-gold/20">
              <h2 className="text-xl font-semibold text-brown mb-3">Welcome to Arrows Terms of Service</h2>
              <p className="text-brown/80">
                These Terms of Service govern your use of the Arrows platform and services. By accessing or using
                our services, you agree to be bound by these terms. Please read them carefully.
              </p>
            </div>

            <section id="acceptance" className="mb-8">
              <h2 className="text-2xl font-bold text-brown mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 mr-3 text-gold" />
                1. Acceptance of Terms
              </h2>
              <div className="space-y-4 text-brown/80">
                <p>
                  By accessing or using the Arrows platform, you confirm that:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You are at least 18 years of age</li>
                  <li>You have the legal capacity to enter into binding contracts</li>
                  <li>You agree to comply with all applicable laws and regulations</li>
                  <li>All information you provide is accurate and current</li>
                </ul>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-blue-800 font-semibold">
                    If you do not agree to these terms, you must not use our services.
                  </p>
                </div>
              </div>
            </section>

            <section id="services" className="mb-8">
              <h2 className="text-2xl font-bold text-brown mb-4 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-gold" />
                2. Services Description
              </h2>
              <div className="space-y-4 text-brown/80">
                <p>
                  Arrows provides real estate investment assessment and consultation services, including:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gold/5 p-4 rounded-lg">
                    <h4 className="font-semibold text-brown mb-2">Core Services</h4>
                    <ul className="text-sm space-y-1">
                      <li>" AI-powered investment assessments</li>
                      <li>" Property market analysis</li>
                      <li>" Personalized recommendations</li>
                      <li>" Investment strategy guidance</li>
                    </ul>
                  </div>
                  <div className="bg-brown/5 p-4 rounded-lg">
                    <h4 className="font-semibold text-brown mb-2">Support Services</h4>
                    <ul className="text-sm space-y-1">
                      <li>" 30-minute video consultation</li>
                      <li>" 30 days of email support</li>
                      <li>" Follow-up assistance</li>
                      <li>" Resource recommendations</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">Important Notice</h4>
                  <p className="text-orange-700 text-sm">
                    Arrows provides informational and analytical services only. We are not financial advisors,
                    real estate agents, or legal professionals. Our assessments are based on available data and
                    should not be considered as professional financial, legal, or investment advice.
                  </p>
                </div>
              </div>
            </section>

            <section id="user-obligations" className="mb-8">
              <h2 className="text-2xl font-bold text-brown mb-4 flex items-center">
                <Users className="w-6 h-6 mr-3 text-gold" />
                3. User Obligations
              </h2>
              <div className="space-y-4 text-brown/80">
                <h3 className="text-xl font-semibold text-brown">You Agree To:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Keep your account credentials secure and confidential</li>
                  <li>Use the services only for lawful purposes</li>
                  <li>Respect intellectual property rights</li>
                  <li>Not share or resell access to our services</li>
                </ul>

                <h3 className="text-xl font-semibold text-brown mt-6">You Agree NOT To:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use automated tools to scrape or extract data</li>
                  <li>Interfere with the proper functioning of the platform</li>
                  <li>Impersonate others or misrepresent your identity</li>
                  <li>Upload malicious code or engage in harmful activities</li>
                </ul>
              </div>
            </section>

            <section id="payment" className="mb-8">
              <h2 className="text-2xl font-bold text-brown mb-4 flex items-center">
                <Scale className="w-6 h-6 mr-3 text-gold" />
                4. Payment Terms
              </h2>
              <div className="space-y-4 text-brown/80">
                <div className="bg-gold/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-brown mb-3">Service Fee: �150</h3>
                  <p className="mb-4">
                    Our comprehensive assessment package is available for a one-time fee of �150 (or equivalent in your currency), which includes:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Complete investment assessment report</li>
                    <li>AI-powered market analysis</li>
                    <li>30-minute video consultation</li>
                    <li>30 days of email support</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold text-brown">Payment Processing</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All payments are processed securely through Stripe</li>
                  <li>Payment is required before receiving your assessment</li>
                  <li>We accept major credit cards and debit cards</li>
                  <li>Prices are listed in Euros and may be converted to your local currency</li>
                </ul>

                <h3 className="text-xl font-semibold text-brown">Refund Policy</h3>
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="text-red-800">
                    <strong>14-Day Money-Back Guarantee:</strong> If you are not satisfied with our service,
                    you may request a full refund within 14 days of purchase, provided you have not yet had
                    your video consultation. After the consultation, all sales are final.
                  </p>
                </div>
              </div>
            </section>

            <section id="intellectual-property" className="mb-8">
              <h2 className="text-2xl font-bold text-brown mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-3 text-gold" />
                5. Intellectual Property
              </h2>
              <div className="space-y-4 text-brown/80">
                <h3 className="text-xl font-semibold text-brown">Our Rights</h3>
                <p>
                  All content, features, and functionality of the Arrows platform, including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Text, graphics, logos, and design elements</li>
                  <li>Software, algorithms, and AI models</li>
                  <li>Proprietary data and analysis methodologies</li>
                  <li>Trademarks and brand identity</li>
                </ul>
                <p>
                  are owned by Arrows and protected by copyright, trademark, and other intellectual property laws.
                </p>

                <h3 className="text-xl font-semibold text-brown mt-6">Your Rights</h3>
                <p>
                  You retain ownership of any information you provide to us. By using our services, you grant us
                  a license to use your data solely for the purpose of providing our services and improving our platform.
                </p>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-blue-800">
                    <strong>Assessment Reports:</strong> You may use your personalized assessment report for your
                    own investment purposes. You may not redistribute, resell, or publicly share the report without permission.
                  </p>
                </div>
              </div>
            </section>

            <section id="disclaimers" className="mb-8">
              <h2 className="text-2xl font-bold text-brown mb-4 flex items-center">
                <AlertCircle className="w-6 h-6 mr-3 text-gold" />
                6. Disclaimers
              </h2>
              <div className="space-y-4 text-brown/80">
                <div className="bg-red-50 border-2 border-red-300 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-red-800 mb-3">Important Disclaimers</h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-red-800 mb-2">Not Financial Advice</h4>
                      <p className="text-red-700">
                        Our services are for informational purposes only and do not constitute financial, investment,
                        legal, or tax advice. Always consult with licensed professionals before making investment decisions.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-red-800 mb-2">No Guarantees</h4>
                      <p className="text-red-700">
                        We make no guarantees about investment outcomes, property values, rental yields, or market performance.
                        Real estate investing involves risk, and past performance does not indicate future results.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-red-800 mb-2">Data Accuracy</h4>
                      <p className="text-red-700">
                        While we strive for accuracy, we cannot guarantee that all data, analysis, or recommendations are
                        error-free, complete, or current. Market conditions change rapidly.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-red-800 mb-2">Service Availability</h4>
                      <p className="text-red-700">
                        Services are provided "as is" and "as available." We do not guarantee uninterrupted or error-free service.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="limitation" className="mb-8">
              <h2 className="text-2xl font-bold text-brown mb-4 flex items-center">
                <Scale className="w-6 h-6 mr-3 text-gold" />
                7. Limitation of Liability
              </h2>
              <div className="space-y-4 text-brown/80">
                <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
                  <p className="text-orange-800 mb-4">
                    To the maximum extent permitted by law, Arrows and its officers, directors, employees, and agents
                    shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-orange-700">
                    <li>Loss of profits or investment opportunities</li>
                    <li>Loss of data or business interruption</li>
                    <li>Property damage or financial losses</li>
                    <li>Any damages arising from your use of our services</li>
                  </ul>
                  <p className="mt-4 text-orange-800 font-semibold">
                    Our total liability to you for any claims arising from or related to our services shall not exceed
                    the amount you paid for our services (�150).
                  </p>
                </div>
              </div>
            </section>

            <section id="termination" className="mb-8">
              <h2 className="text-2xl font-bold text-brown mb-4 flex items-center">
                <AlertCircle className="w-6 h-6 mr-3 text-gold" />
                8. Termination
              </h2>
              <div className="space-y-4 text-brown/80">
                <h3 className="text-xl font-semibold text-brown">By You</h3>
                <p>
                  You may stop using our services at any time. If you wish to delete your account and data,
                  please contact us at privacy@arrows.com.
                </p>

                <h3 className="text-xl font-semibold text-brown">By Us</h3>
                <p>
                  We reserve the right to suspend or terminate your access to our services at any time if:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>You violate these Terms of Service</li>
                  <li>You engage in fraudulent or abusive behavior</li>
                  <li>We are required to do so by law</li>
                  <li>We discontinue the service</li>
                </ul>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-blue-800">
                    <strong>Effect of Termination:</strong> Upon termination, your right to use our services will
                    immediately cease. Data retention will be governed by our Privacy Policy.
                  </p>
                </div>
              </div>
            </section>

            <section id="governing-law" className="mb-8">
              <h2 className="text-2xl font-bold text-brown mb-4 flex items-center">
                <Scale className="w-6 h-6 mr-3 text-gold" />
                9. Governing Law and Disputes
              </h2>
              <div className="space-y-4 text-brown/80">
                <h3 className="text-xl font-semibold text-brown">Governing Law</h3>
                <p>
                  These Terms of Service are governed by and construed in accordance with the laws of Portugal,
                  without regard to its conflict of law provisions.
                </p>

                <h3 className="text-xl font-semibold text-brown">Dispute Resolution</h3>
                <div className="bg-gold/10 p-4 rounded-lg">
                  <p className="mb-3">
                    In the event of any dispute arising from these terms or our services:
                  </p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li><strong>Informal Resolution:</strong> First, contact us at legal@arrows.com to attempt informal resolution</li>
                    <li><strong>Mediation:</strong> If informal resolution fails, parties agree to attempt mediation</li>
                    <li><strong>Jurisdiction:</strong> Any legal action shall be brought exclusively in the courts of Lisbon, Portugal</li>
                  </ol>
                </div>

                <h3 className="text-xl font-semibold text-brown">EU Consumer Rights</h3>
                <p>
                  If you are a consumer in the European Union, you benefit from mandatory consumer protection provisions
                  under EU law. Nothing in these terms affects those statutory rights.
                </p>
              </div>
            </section>

            <section id="changes" className="mb-8">
              <h2 className="text-2xl font-bold text-brown mb-4 flex items-center">
                <FileText className="w-6 h-6 mr-3 text-gold" />
                10. Changes to Terms
              </h2>
              <div className="space-y-4 text-brown/80">
                <p>
                  We reserve the right to modify these Terms of Service at any time. When we make changes:
                </p>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <ul className="space-y-2 text-blue-800">
                    <li>" We will update the "Last Updated" date at the top of this page</li>
                    <li>" For material changes, we will notify you via email at least 30 days in advance</li>
                    <li>" Continued use of our services after changes take effect constitutes acceptance</li>
                    <li>" If you do not agree to the changes, you must stop using our services</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-brown mb-4">Additional Terms</h2>
              <div className="space-y-4 text-brown/80">
                <h3 className="text-xl font-semibold text-brown">Entire Agreement</h3>
                <p>
                  These Terms of Service, together with our Privacy Policy and Cookie Policy, constitute the entire
                  agreement between you and Arrows regarding your use of our services.
                </p>

                <h3 className="text-xl font-semibold text-brown">Severability</h3>
                <p>
                  If any provision of these terms is found to be unenforceable, the remaining provisions will continue
                  in full force and effect.
                </p>

                <h3 className="text-xl font-semibold text-brown">Waiver</h3>
                <p>
                  Our failure to enforce any right or provision of these terms will not be considered a waiver of those rights.
                </p>

                <h3 className="text-xl font-semibold text-brown">Assignment</h3>
                <p>
                  You may not assign or transfer your rights under these terms without our prior written consent.
                  We may assign our rights without restriction.
                </p>
              </div>
            </section>

            <div className="mt-12 p-6 bg-gold/10 rounded-lg border border-gold/30">
              <h3 className="text-xl font-semibold text-brown mb-3">Contact Information</h3>
              <p className="text-brown/80 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>General Inquiries:</strong> info@arrows.com</p>
                  <p><strong>Legal Questions:</strong> legal@arrows.com</p>
                </div>
                <div>
                  <p><strong>Address:</strong> [Portuguese registered address]</p>
                  <p><strong>Response Time:</strong> 2-3 business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
