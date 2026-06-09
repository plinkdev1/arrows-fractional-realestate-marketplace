import React, { useState } from 'react';
import { Cookie, Settings, Shield, Download, Printer as Print, Eye, EyeOff } from 'lucide-react';

const CookiePolicy: React.FC = () => {
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    preferences: false
  });

  const [showPreferenceCenter, setShowPreferenceCenter] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const updatePreference = (category: string, value: boolean) => {
    if (category === 'essential') return; // Cannot disable essential cookies
    
    setCookiePreferences(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const acceptAll = () => {
    setCookiePreferences({
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true
    });
    setShowPreferenceCenter(false);
  };

  const rejectNonEssential = () => {
    setCookiePreferences({
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false
    });
    setShowPreferenceCenter(false);
  };

  const savePreferences = () => {
    // Save preferences to localStorage or send to backend
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
    setShowPreferenceCenter(false);
  };

  const cookieDetails = [
    {
      name: '_arrows_session',
      provider: 'Arrows',
      purpose: 'User authentication and session management',
      expiration: 'Session',
      type: 'Essential'
    },
    {
      name: '_stripe_mid',
      provider: 'Stripe',
      purpose: 'Payment processing and fraud prevention',
      expiration: '1 year',
      type: 'Essential'
    },
    {
      name: '_ga',
      provider: 'Google Analytics',
      purpose: 'Distinguish users and sessions',
      expiration: '2 years',
      type: 'Analytics'
    },
    {
      name: '_ga_*',
      provider: 'Google Analytics 4',
      purpose: 'Persist session state',
      expiration: '2 years',
      type: 'Analytics'
    },
    {
      name: '_fbp',
      provider: 'Facebook',
      purpose: 'Store and track visits across websites',
      expiration: '3 months',
      type: 'Marketing'
    },
    {
      name: '_gcl_au',
      provider: 'Google Ads',
      purpose: 'Store and track conversions',
      expiration: '3 months',
      type: 'Marketing'
    },
    {
      name: 'arrows_lang',
      provider: 'Arrows',
      purpose: 'Remember language preference',
      expiration: '1 year',
      type: 'Preferences'
    },
    {
      name: 'arrows_theme',
      provider: 'Arrows',
      purpose: 'Remember UI customization',
      expiration: '1 year',
      type: 'Preferences'
    }
  ];

  return (
    <div className="min-h-screen bg-cream-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Cookie className="h-8 w-8 text-gold-600" />
              <h1 className="text-3xl font-display font-bold text-brown-800">
                Cookie Policy
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
              This Cookie Policy explains how Arrows uses cookies and similar technologies 
              to recognize you when you visit our platform. It explains what these technologies 
              are and why we use them, as well as your rights to control our use of them.
            </p>
          </div>
        </div>

        {/* Cookie Preference Center */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-semibold text-brown-800">
              Cookie Preferences
            </h2>
            <button
              onClick={() => setShowPreferenceCenter(!showPreferenceCenter)}
              className="flex items-center space-x-2 px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span>Manage Preferences</span>
            </button>
          </div>

          {showPreferenceCenter && (
            <div className="border border-gold-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-brown-800 mb-4">Cookie Categories</h3>
              
              <div className="space-y-4">
                {/* Essential Cookies */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold text-brown-800">Essential Cookies</h4>
                    <p className="text-sm text-brown-600">Required for the website to function properly</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Always Active</span>
                    <div className="w-12 h-6 bg-green-500 rounded-full flex items-center justify-end px-1">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-center justify-between p-4 bg-cream-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold text-brown-800">Analytics Cookies</h4>
                    <p className="text-sm text-brown-600">Help us understand how visitors interact with our website</p>
                  </div>
                  <button
                    onClick={() => updatePreference('analytics', !cookiePreferences.analytics)}
                    className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                      cookiePreferences.analytics ? 'bg-green-500 justify-end' : 'bg-gray-300 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-center justify-between p-4 bg-cream-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold text-brown-800">Marketing Cookies</h4>
                    <p className="text-sm text-brown-600">Used to deliver relevant advertisements and track ad performance</p>
                  </div>
                  <button
                    onClick={() => updatePreference('marketing', !cookiePreferences.marketing)}
                    className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                      cookiePreferences.marketing ? 'bg-green-500 justify-end' : 'bg-gray-300 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>

                {/* Preference Cookies */}
                <div className="flex items-center justify-between p-4 bg-cream-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold text-brown-800">Preference Cookies</h4>
                    <p className="text-sm text-brown-600">Remember your settings and preferences</p>
                  </div>
                  <button
                    onClick={() => updatePreference('preferences', !cookiePreferences.preferences)}
                    className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                      cookiePreferences.preferences ? 'bg-green-500 justify-end' : 'bg-gray-300 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </button>
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  onClick={acceptAll}
                  className="px-6 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors"
                >
                  Accept All
                </button>
                <button
                  onClick={rejectNonEssential}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Reject Non-Essential
                </button>
                <button
                  onClick={savePreferences}
                  className="px-6 py-2 bg-brown-600 text-white rounded-lg hover:bg-brown-700 transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* What Are Cookies */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-display font-semibold text-brown-800 mb-6">
              What Are Cookies?
            </h2>
            
            <div className="space-y-4 text-brown-600">
              <p>
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. 
                Cookies are widely used by website owners to make their websites work, or to work more efficiently, 
                as well as to provide reporting information.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gold-50 rounded-lg p-4">
                  <h4 className="font-semibold text-brown-800 mb-2">Session vs Persistent</h4>
                  <ul className="text-sm text-brown-600 space-y-1">
                    <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
                    <li><strong>Persistent cookies:</strong> Remain on your device for a set period</li>
                  </ul>
                </div>
                
                <div className="bg-gold-50 rounded-lg p-4">
                  <h4 className="font-semibold text-brown-800 mb-2">First-party vs Third-party</h4>
                  <ul className="text-sm text-brown-600 space-y-1">
                    <li><strong>First-party:</strong> Set by the website you're visiting</li>
                    <li><strong>Third-party:</strong> Set by other domains (e.g., analytics, ads)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Cookies We Use */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-display font-semibold text-brown-800 mb-6">
              Cookies We Use
            </h2>
            
            <div className="space-y-6">
              {/* Essential Cookies */}
              <div className="border border-green-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-brown-800">Essential Cookies (Always Active)</h3>
                </div>
                <p className="text-brown-600 mb-4">
                  These cookies are necessary for the website to function and cannot be switched off in our systems.
                </p>
                <ul className="list-disc list-inside text-brown-600 space-y-1">
                  <li>Authentication tokens and session management</li>
                  <li>Payment processing (Stripe integration)</li>
                  <li>Security features and CSRF protection</li>
                  <li>Load balancing and performance optimization</li>
                </ul>
              </div>

              {/* Analytics Cookies */}
              <div className="border border-blue-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Eye className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-brown-800">Analytics Cookies (Opt-in Required)</h3>
                </div>
                <p className="text-brown-600 mb-4">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </p>
                <ul className="list-disc list-inside text-brown-600 space-y-1">
                  <li>Google Analytics (traffic analysis and user behavior)</li>
                  <li>Mixpanel (product analytics and user journey tracking)</li>
                  <li>Hotjar (heatmaps and session recordings)</li>
                </ul>
              </div>

              {/* Marketing Cookies */}
              <div className="border border-purple-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Settings className="h-6 w-6 text-purple-600" />
                  <h3 className="text-lg font-semibold text-brown-800">Marketing Cookies (Opt-in Required)</h3>
                </div>
                <p className="text-brown-600 mb-4">
                  These cookies are used to deliver advertisements more relevant to you and your interests.
                </p>
                <ul className="list-disc list-inside text-brown-600 space-y-1">
                  <li>Google Ads (conversion tracking and remarketing)</li>
                  <li>Facebook Pixel (social media advertising)</li>
                  <li>LinkedIn Insight Tag (professional network advertising)</li>
                </ul>
              </div>

              {/* Preference Cookies */}
              <div className="border border-gold-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Cookie className="h-6 w-6 text-gold-600" />
                  <h3 className="text-lg font-semibold text-brown-800">Preference Cookies (Opt-in Required)</h3>
                </div>
                <p className="text-brown-600 mb-4">
                  These cookies enable the website to remember information that changes the way the website behaves or looks.
                </p>
                <ul className="list-disc list-inside text-brown-600 space-y-1">
                  <li>Language selection and localization</li>
                  <li>UI customization and theme preferences</li>
                  <li>Saved search filters and property preferences</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Cookie Details Table */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-display font-semibold text-brown-800 mb-6">
              Detailed Cookie Information
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gold-200">
                <thead>
                  <tr className="bg-gold-50">
                    <th className="border border-gold-200 px-4 py-3 text-left font-semibold text-brown-800">Cookie Name</th>
                    <th className="border border-gold-200 px-4 py-3 text-left font-semibold text-brown-800">Provider</th>
                    <th className="border border-gold-200 px-4 py-3 text-left font-semibold text-brown-800">Purpose</th>
                    <th className="border border-gold-200 px-4 py-3 text-left font-semibold text-brown-800">Expiration</th>
                    <th className="border border-gold-200 px-4 py-3 text-left font-semibold text-brown-800">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {cookieDetails.map((cookie, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-cream-50' : 'bg-white'}>
                      <td className="border border-gold-200 px-4 py-3 font-mono text-sm">{cookie.name}</td>
                      <td className="border border-gold-200 px-4 py-3">{cookie.provider}</td>
                      <td className="border border-gold-200 px-4 py-3 text-sm">{cookie.purpose}</td>
                      <td className="border border-gold-200 px-4 py-3">{cookie.expiration}</td>
                      <td className="border border-gold-200 px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          cookie.type === 'Essential' ? 'bg-green-100 text-green-800' :
                          cookie.type === 'Analytics' ? 'bg-blue-100 text-blue-800' :
                          cookie.type === 'Marketing' ? 'bg-purple-100 text-purple-800' :
                          'bg-gold-100 text-gold-800'
                        }`}>
                          {cookie.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Managing Cookies */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-display font-semibold text-brown-800 mb-6">
              Managing Your Cookie Preferences
            </h2>
            
            <div className="space-y-6">
              <div className="bg-gold-50 rounded-lg p-6">
                <h3 className="font-semibold text-brown-800 mb-3">On Our Website</h3>
                <p className="text-brown-600 mb-4">
                  You can manage your cookie preferences at any time using our preference center above, 
                  or through the cookie banner that appears on your first visit.
                </p>
                <button
                  onClick={() => setShowPreferenceCenter(true)}
                  className="bg-gold-600 text-white px-4 py-2 rounded-lg hover:bg-gold-700 transition-colors"
                >
                  Open Preference Center
                </button>
              </div>

              <div className="bg-brown-50 rounded-lg p-6">
                <h3 className="font-semibold text-brown-800 mb-3">Browser Settings</h3>
                <p className="text-brown-600 mb-4">
                  You can also control cookies through your browser settings:
                </p>
                <ul className="list-disc list-inside text-brown-600 space-y-2">
                  <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                  <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">Impact of Disabling Cookies</h4>
                <ul className="list-disc list-inside text-red-700 space-y-1">
                  <li><strong>Essential cookies:</strong> Website may not function properly</li>
                  <li><strong>Analytics cookies:</strong> We can't improve our services based on usage data</li>
                  <li><strong>Marketing cookies:</strong> You'll still see ads, but they may be less relevant</li>
                  <li><strong>Preference cookies:</strong> Your settings won't be remembered</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-display font-semibold text-brown-800 mb-6">
              Third-Party Cookies
            </h2>
            
            <div className="space-y-4">
              <p className="text-brown-600">
                Some cookies on our site are set by third-party services. We have no control over these cookies, 
                and you should check the relevant third party's website for more information.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-brown-800 mb-2">Google Services</h4>
                  <p className="text-sm text-brown-600 mb-2">Analytics, Ads, and other Google services</p>
                  <a href="https://policies.google.com/privacy" className="text-blue-600 hover:text-blue-700 text-sm">
                    Google Privacy Policy →
                  </a>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-brown-800 mb-2">Facebook/Meta</h4>
                  <p className="text-sm text-brown-600 mb-2">Social media integration and advertising</p>
                  <a href="https://www.facebook.com/privacy/policy/" className="text-blue-600 hover:text-blue-700 text-sm">
                    Facebook Privacy Policy →
                  </a>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-brown-800 mb-2">Stripe</h4>
                  <p className="text-sm text-brown-600 mb-2">Payment processing and fraud prevention</p>
                  <a href="https://stripe.com/privacy" className="text-blue-600 hover:text-blue-700 text-sm">
                    Stripe Privacy Policy →
                  </a>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-brown-800 mb-2">Mixpanel</h4>
                  <p className="text-sm text-brown-600 mb-2">Product analytics and user behavior</p>
                  <a href="https://mixpanel.com/legal/privacy-policy/" className="text-blue-600 hover:text-blue-700 text-sm">
                    Mixpanel Privacy Policy →
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Updates */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-display font-semibold text-brown-800 mb-6">
              Updates to This Policy
            </h2>
            
            <div className="space-y-4 text-brown-600">
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our practices 
                or for other operational, legal, or regulatory reasons.
              </p>
              
              <div className="bg-gold-50 rounded-lg p-4">
                <h4 className="font-semibold text-brown-800 mb-2">How We Notify You</h4>
                <ul className="list-disc list-inside text-brown-600 space-y-1">
                  <li>Email notification to registered users</li>
                  <li>Banner notification on the website</li>
                  <li>Updated "Last Modified" date at the top of this policy</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-gold-50 rounded-xl p-8">
            <h2 className="text-2xl font-display font-semibold text-brown-800 mb-6">
              Contact Us
            </h2>
            
            <p className="text-brown-600 mb-4">
              If you have any questions about our use of cookies, please contact us:
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Cookie className="h-5 w-5 text-gold-600" />
                <a href="mailto:privacy@arrows.pt" className="text-gold-600 hover:text-gold-700">
                  privacy@arrows.pt
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <span className="h-5 w-5 text-gold-600">📞</span>
                <span className="text-brown-600">+351 21 123 4567</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;