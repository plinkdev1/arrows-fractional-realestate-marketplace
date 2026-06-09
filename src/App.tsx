import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import Header from './components/Header';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import CookiePolicy from './components/CookiePolicy';
import DataRetention from './components/DataRetention';
import { Login } from './pages/Login';
import { Unauthorized } from './pages/Unauthorized';
import { ClientOverview } from './pages/dashboards/client/ClientOverview';
import { ClientAssessment } from './pages/dashboards/client/ClientAssessment';
import { ClientProperties } from './pages/dashboards/client/ClientProperties';
import { ClientConsultation } from './pages/dashboards/client/ClientConsultation';
import { SuperAdminOverview } from './pages/dashboards/super-admin/SuperAdminOverview';
import { SuperAdminUsers } from './pages/dashboards/super-admin/SuperAdminUsers';
import { BankOverview } from './pages/dashboards/bank/BankOverview';
import { InsuranceOverview } from './pages/dashboards/insurance/InsuranceOverview';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-cream-50">
          <Routes>
            <Route path="/" element={
              <>
                <Header />
                <main>
                  <Hero />
                  <SocialProof />
                  <Features />
                  <Testimonials />
                  <FAQ />
                  <CTA />
                </main>
                <Footer />
              </>
            } />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/data-retention" element={<DataRetention />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Navigate to="/dashboard/client" replace />
              </ProtectedRoute>
            } />

            <Route path="/dashboard/client" element={
              <ProtectedRoute allowedRoles={['client', 'client_premium']}>
                <DashboardLayout>
                  <ClientOverview />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/dashboard/client/assessment" element={
              <ProtectedRoute allowedRoles={['client', 'client_premium']}>
                <DashboardLayout>
                  <ClientAssessment />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/dashboard/client/properties" element={
              <ProtectedRoute allowedRoles={['client', 'client_premium']}>
                <DashboardLayout>
                  <ClientProperties />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/dashboard/client/consultation" element={
              <ProtectedRoute allowedRoles={['client', 'client_premium']}>
                <DashboardLayout>
                  <ClientConsultation />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/dashboard/client/*" element={
              <ProtectedRoute allowedRoles={['client', 'client_premium']}>
                <DashboardLayout>
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-brown mb-4">Coming Soon</h2>
                    <p className="text-brown/60">This page is under construction</p>
                  </div>
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/dashboard/super-admin" element={
              <ProtectedRoute allowedRoles={['super_admin']}>
                <DashboardLayout>
                  <SuperAdminOverview />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/dashboard/super-admin/users" element={
              <ProtectedRoute allowedRoles={['super_admin']}>
                <DashboardLayout>
                  <SuperAdminUsers />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/dashboard/super-admin/*" element={
              <ProtectedRoute allowedRoles={['super_admin']}>
                <DashboardLayout>
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-brown mb-4">Coming Soon</h2>
                    <p className="text-brown/60">This page is under construction</p>
                  </div>
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/dashboard/team/*" element={
              <ProtectedRoute allowedRoles={['admin', 'analyst', 'support', 'sales']}>
                <DashboardLayout>
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-brown mb-4">Team Dashboard</h2>
                    <p className="text-brown/60">Coming soon</p>
                  </div>
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/dashboard/bank" element={
              <ProtectedRoute allowedRoles={['bank_admin', 'bank_agent']}>
                <DashboardLayout>
                  <BankOverview />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/dashboard/bank/*" element={
              <ProtectedRoute allowedRoles={['bank_admin', 'bank_agent']}>
                <DashboardLayout>
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-brown mb-4">Coming Soon</h2>
                    <p className="text-brown/60">This page is under construction</p>
                  </div>
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/dashboard/insurance" element={
              <ProtectedRoute allowedRoles={['insurance_admin', 'insurance_agent']}>
                <DashboardLayout>
                  <InsuranceOverview />
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/dashboard/insurance/*" element={
              <ProtectedRoute allowedRoles={['insurance_admin', 'insurance_agent']}>
                <DashboardLayout>
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-brown mb-4">Coming Soon</h2>
                    <p className="text-brown/60">This page is under construction</p>
                  </div>
                </DashboardLayout>
              </ProtectedRoute>
            } />

            <Route path="/dashboard/service/*" element={
              <ProtectedRoute allowedRoles={['service_admin', 'service_provider']}>
                <DashboardLayout>
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-brown mb-4">Service Provider Dashboard</h2>
                    <p className="text-brown/60">Coming soon</p>
                  </div>
                </DashboardLayout>
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;