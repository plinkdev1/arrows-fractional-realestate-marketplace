import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  DollarSign,
  FileText,
  TrendingUp,
  Activity,
  AlertCircle,
  Briefcase,
  UserPlus,
} from 'lucide-react';

export const SuperAdminOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-brown">Platform Overview</h1>
          <p className="text-brown/60 mt-1">Monitor and manage your entire platform</p>
        </div>
        <div className="flex space-x-3">
          <Link
            to="/dashboard/super-admin/users"
            className="px-4 py-2 bg-gold text-white rounded-lg hover:bg-gold/90 transition-colors inline-flex items-center space-x-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Create User</span>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gold/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-green-600 text-sm font-medium flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12.5%
            </span>
          </div>
          <p className="text-2xl font-bold text-brown">€47,250</p>
          <p className="text-sm text-brown/60">Total Revenue (Month)</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gold/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-blue-600 text-sm font-medium flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +8.2%
            </span>
          </div>
          <p className="text-2xl font-bold text-brown">1,247</p>
          <p className="text-sm text-brown/60">Total Users</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gold/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-purple-600 text-sm font-medium flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +15.3%
            </span>
          </div>
          <p className="text-2xl font-bold text-brown">315</p>
          <p className="text-sm text-brown/60">Assessments Sold (Month)</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gold/20">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-gold" />
            </div>
          </div>
          <p className="text-2xl font-bold text-brown">23</p>
          <p className="text-sm text-brown/60">Active Partners</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gold/20">
          <h2 className="text-xl font-semibold text-brown mb-4">Revenue Overview</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-brown/70">Today</span>
              <span className="font-semibold text-brown">€1,850</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-brown/70">This Week</span>
              <span className="font-semibold text-brown">€12,340</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-brown/70">This Month</span>
              <span className="font-semibold text-brown">€47,250</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-brown/70">All Time</span>
              <span className="font-semibold text-brown">€342,580</span>
            </div>
          </div>
          <Link
            to="/dashboard/super-admin/analytics"
            className="mt-4 block text-center px-4 py-2 bg-gold/10 text-gold rounded-lg hover:bg-gold/20 transition-colors"
          >
            View Detailed Analytics
          </Link>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gold/20">
          <h2 className="text-xl font-semibold text-brown mb-4">User Growth</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-brown/70">Active Users (30 days)</span>
              <span className="font-semibold text-brown">892</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-brown/70">New Signups (Month)</span>
              <span className="font-semibold text-brown">156</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-brown/70">Churn Rate</span>
              <span className="font-semibold text-brown">2.3%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-brown/70">Average Session</span>
              <span className="font-semibold text-brown">14.5 min</span>
            </div>
          </div>
          <Link
            to="/dashboard/super-admin/users"
            className="mt-4 block text-center px-4 py-2 bg-gold/10 text-gold rounded-lg hover:bg-gold/20 transition-colors"
          >
            Manage Users
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gold/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-brown">Conversion Funnel</h2>
          <span className="text-sm text-brown/60">Last 30 days</span>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-brown/70">Landing Page Visitors</span>
              <span className="font-semibold text-brown">8,432</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gold rounded-full h-2" style={{ width: '100%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-brown/70">Form Started</span>
              <span className="font-semibold text-brown">2,847 (33.7%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gold rounded-full h-2" style={{ width: '33.7%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-brown/70">Form Completed</span>
              <span className="font-semibold text-brown">1,423 (16.9%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gold rounded-full h-2" style={{ width: '16.9%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-brown/70">Payment Completed</span>
              <span className="font-semibold text-brown">315 (3.7%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 rounded-full h-2" style={{ width: '3.7%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gold/20">
          <h2 className="text-xl font-semibold text-brown mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-gold" />
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <UserPlus className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-brown">New user registered</p>
                <p className="text-xs text-brown/60">john.doe@example.com • 2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-brown">Assessment delivered</p>
                <p className="text-xs text-brown/60">Client ID: #1247 • 15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-brown">New partner activated</p>
                <p className="text-xs text-brown/60">Banco Example • 1 hour ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gold/20">
          <h2 className="text-xl font-semibold text-brown mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
            System Alerts
          </h2>
          <div className="space-y-3">
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm font-medium text-yellow-800">Server load high</p>
              <p className="text-xs text-yellow-700">CPU usage at 78% - consider scaling</p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-800">Backup completed</p>
              <p className="text-xs text-blue-700">Daily backup successful at 2:00 AM</p>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-medium text-green-800">All systems operational</p>
              <p className="text-xs text-green-700">99.9% uptime last 30 days</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 border border-gold/20">
        <h2 className="text-xl font-semibold text-brown mb-4">Partner Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gold/20">
                <th className="text-left py-3 px-4 text-sm font-medium text-brown/70">Partner</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-brown/70">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-brown/70">Revenue Generated</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-brown/70">Conversions</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-brown/70">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gold/20">
                <td className="py-3 px-4 text-sm text-brown">Banco Exemplo</td>
                <td className="py-3 px-4 text-sm text-brown/70">Bank</td>
                <td className="py-3 px-4 text-sm font-medium text-brown">€12,450</td>
                <td className="py-3 px-4 text-sm text-brown/70">23</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                </td>
              </tr>
              <tr className="border-b border-gold/20">
                <td className="py-3 px-4 text-sm text-brown">Insurance Pro</td>
                <td className="py-3 px-4 text-sm text-brown/70">Insurance</td>
                <td className="py-3 px-4 text-sm font-medium text-brown">€8,340</td>
                <td className="py-3 px-4 text-sm text-brown/70">18</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-sm text-brown">Property Services Ltd</td>
                <td className="py-3 px-4 text-sm text-brown/70">Service Provider</td>
                <td className="py-3 px-4 text-sm font-medium text-brown">€5,670</td>
                <td className="py-3 px-4 text-sm text-brown/70">15</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Link
          to="/dashboard/super-admin/partners"
          className="mt-4 block text-center px-4 py-2 bg-gold/10 text-gold rounded-lg hover:bg-gold/20 transition-colors"
        >
          View All Partners
        </Link>
      </div>
    </div>
  );
};
