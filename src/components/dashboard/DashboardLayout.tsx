import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  FileText,
  Building,
  Phone,
  Folder,
  MessageSquare,
  Settings,
  Users,
  BarChart3,
  Briefcase,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
} from 'lucide-react';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  roles?: string[];
}

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const getNavigationItems = (): NavItem[] => {
    const role = user?.profile.role;

    const baseClientNav: NavItem[] = [
      { icon: LayoutDashboard, label: 'Overview', path: '/dashboard/client' },
      { icon: FileText, label: 'My Assessment', path: '/dashboard/client/assessment' },
      { icon: Building, label: 'Properties', path: '/dashboard/client/properties' },
      { icon: Phone, label: 'Consultation', path: '/dashboard/client/consultation' },
      { icon: Folder, label: 'Documents', path: '/dashboard/client/documents' },
      { icon: MessageSquare, label: 'Messages', path: '/dashboard/client/messages' },
      { icon: Settings, label: 'Settings', path: '/dashboard/client/settings' },
    ];

    const baseSuperAdminNav: NavItem[] = [
      { icon: LayoutDashboard, label: 'Overview', path: '/dashboard/super-admin' },
      { icon: Users, label: 'User Management', path: '/dashboard/super-admin/users' },
      { icon: FileText, label: 'Content', path: '/dashboard/super-admin/content' },
      { icon: Briefcase, label: 'Partners', path: '/dashboard/super-admin/partners' },
      { icon: BarChart3, label: 'Analytics', path: '/dashboard/super-admin/analytics' },
      { icon: Settings, label: 'System Settings', path: '/dashboard/super-admin/settings' },
    ];

    const baseTeamNav: NavItem[] = [
      { icon: LayoutDashboard, label: 'Overview', path: '/dashboard/team' },
      { icon: Users, label: 'Clients', path: '/dashboard/team/clients' },
      { icon: BarChart3, label: 'Analytics', path: '/dashboard/team/analytics', roles: ['admin', 'analyst', 'sales'] },
      { icon: MessageSquare, label: 'Support', path: '/dashboard/team/support', roles: ['admin', 'support'] },
      { icon: Settings, label: 'Settings', path: '/dashboard/team/settings' },
    ];

    const baseBankNav: NavItem[] = [
      { icon: LayoutDashboard, label: 'Overview', path: '/dashboard/bank' },
      { icon: FileText, label: 'Applications', path: '/dashboard/bank/applications' },
      { icon: BarChart3, label: 'Performance', path: '/dashboard/bank/performance' },
      { icon: Users, label: 'Team', path: '/dashboard/bank/team', roles: ['bank_admin'] },
      { icon: Settings, label: 'Settings', path: '/dashboard/bank/settings' },
    ];

    const baseInsuranceNav: NavItem[] = [
      { icon: LayoutDashboard, label: 'Overview', path: '/dashboard/insurance' },
      { icon: FileText, label: 'Quotes', path: '/dashboard/insurance/quotes' },
      { icon: Folder, label: 'Policies', path: '/dashboard/insurance/policies' },
      { icon: BarChart3, label: 'Performance', path: '/dashboard/insurance/performance' },
      { icon: Users, label: 'Team', path: '/dashboard/insurance/team', roles: ['insurance_admin'] },
      { icon: Settings, label: 'Settings', path: '/dashboard/insurance/settings' },
    ];

    const baseServiceNav: NavItem[] = [
      { icon: LayoutDashboard, label: 'Overview', path: '/dashboard/service' },
      { icon: Phone, label: 'Bookings', path: '/dashboard/service/bookings' },
      { icon: BarChart3, label: 'Performance', path: '/dashboard/service/performance' },
      { icon: Settings, label: 'Settings', path: '/dashboard/service/settings' },
    ];

    switch (role) {
      case 'super_admin':
        return baseSuperAdminNav;
      case 'admin':
      case 'analyst':
      case 'support':
      case 'sales':
        return baseTeamNav.filter(item => !item.roles || item.roles.includes(role));
      case 'bank_admin':
      case 'bank_agent':
        return baseBankNav.filter(item => !item.roles || item.roles.includes(role));
      case 'insurance_admin':
      case 'insurance_agent':
        return baseInsuranceNav.filter(item => !item.roles || item.roles.includes(role));
      case 'service_admin':
      case 'service_provider':
        return baseServiceNav;
      case 'client':
      case 'client_premium':
      default:
        return baseClientNav;
    }
  };

  const navItems = getNavigationItems();

  return (
    <div className="min-h-screen bg-cream">
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gold/20 z-40">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gold/10 transition-colors"
            >
              {sidebarOpen ? <X className="w-6 h-6 text-brown" /> : <Menu className="w-6 h-6 text-brown" />}
            </button>
            <Link to="/" className="text-2xl font-bold text-gold">
              Arrows
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-gold/10 transition-colors relative">
              <Bell className="w-5 h-5 text-brown" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gold/10 transition-colors"
              >
                <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.profile.full_name.charAt(0)}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-brown">{user?.profile.full_name}</p>
                  <p className="text-xs text-brown/60 capitalize">{user?.profile.role.replace('_', ' ')}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-brown" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gold/20 py-2">
                  <Link
                    to="/dashboard/profile"
                    className="block px-4 py-2 text-sm text-brown hover:bg-gold/10 transition-colors"
                    onClick={() => setProfileOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/dashboard/settings"
                    className="block px-4 py-2 text-sm text-brown hover:bg-gold/10 transition-colors"
                    onClick={() => setProfileOpen(false)}
                  >
                    Settings
                  </Link>
                  <hr className="my-2 border-gold/20" />
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gold/20 transform transition-transform duration-300 ease-in-out z-30 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{ top: '64px' }}
      >
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-brown hover:bg-gold/10 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          style={{ top: '64px' }}
        />
      )}

      <main className="pt-16 lg:pl-64">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};
