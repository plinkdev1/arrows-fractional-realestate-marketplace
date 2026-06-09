/*
  # Authentication and Role-Based Access Control System

  1. New Tables
    - `user_profiles`
      - `id` (uuid, references auth.users)
      - `full_name` (text)
      - `role` (text)
      - `status` (text)
      - `phone` (text)
      - `avatar_url` (text)
      - `organization_id` (uuid, nullable for partner associations)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `last_login_at` (timestamptz)
      - `mfa_enabled` (boolean)
      - `mfa_secret` (text, encrypted)
      
    - `roles`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `display_name` (text)
      - `description` (text)
      - `level` (integer)
      - `created_at` (timestamptz)
      
    - `permissions`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
      - `resource` (text)
      - `action` (text)
      - `created_at` (timestamptz)
      
    - `role_permissions`
      - `role_id` (uuid, references roles)
      - `permission_id` (uuid, references permissions)
      - `created_at` (timestamptz)
      
    - `organizations`
      - `id` (uuid, primary key)
      - `name` (text)
      - `type` (text: bank, insurance, service_provider)
      - `status` (text)
      - `contact_email` (text)
      - `contact_phone` (text)
      - `agreement_type` (text)
      - `revenue_share_percentage` (numeric)
      - `fixed_fee` (numeric)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
    - `audit_logs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `action` (text)
      - `resource` (text)
      - `resource_id` (uuid)
      - `details` (jsonb)
      - `ip_address` (text)
      - `user_agent` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access
    - Secure sensitive fields
*/

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  display_name text NOT NULL,
  description text,
  level integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

-- Create permissions table
CREATE TABLE IF NOT EXISTS permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  resource text NOT NULL,
  action text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;

-- Create role_permissions junction table
CREATE TABLE IF NOT EXISTS role_permissions (
  role_id uuid REFERENCES roles(id) ON DELETE CASCADE,
  permission_id uuid REFERENCES permissions(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (role_id, permission_id)
);

ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;

-- Create organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('bank', 'insurance', 'service_provider')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('active', 'pending', 'inactive', 'suspended')),
  contact_email text NOT NULL,
  contact_phone text,
  agreement_type text CHECK (agreement_type IN ('revenue_share', 'fixed_fee', 'hybrid')),
  revenue_share_percentage numeric(5,2),
  fixed_fee numeric(10,2),
  logo_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'client',
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  phone text,
  avatar_url text,
  organization_id uuid REFERENCES organizations(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_login_at timestamptz,
  mfa_enabled boolean DEFAULT false,
  mfa_secret text
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create audit_logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  resource text NOT NULL,
  resource_id uuid,
  details jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Insert default roles
INSERT INTO roles (name, display_name, description, level) VALUES
  ('super_admin', 'Super Admin', 'Full platform control', 1),
  ('admin', 'Admin', 'Manage users and content', 2),
  ('analyst', 'Analyst', 'View analytics and reports', 2),
  ('support', 'Support', 'Handle customer inquiries', 2),
  ('sales', 'Sales', 'Manage client relationships', 2),
  ('bank_admin', 'Bank Admin', 'Manage bank partnerships', 3),
  ('bank_agent', 'Bank Agent', 'Process loan applications', 3),
  ('insurance_admin', 'Insurance Admin', 'Manage insurance partnerships', 3),
  ('insurance_agent', 'Insurance Agent', 'Create quotes', 3),
  ('service_admin', 'Service Admin', 'Manage service providers', 3),
  ('service_provider', 'Service Provider', 'Fulfill bookings', 3),
  ('client', 'Client', 'Standard customer access', 4),
  ('client_premium', 'Premium Client', 'Enhanced customer access', 4)
ON CONFLICT (name) DO NOTHING;

-- Insert default permissions
INSERT INTO permissions (name, description, resource, action) VALUES
  ('view_all_users', 'View all users', 'users', 'read'),
  ('manage_users', 'Create, edit, and delete users', 'users', 'write'),
  ('view_analytics', 'View analytics and reports', 'analytics', 'read'),
  ('export_reports', 'Export reports', 'reports', 'export'),
  ('manage_content', 'Edit platform content', 'content', 'write'),
  ('manage_partners', 'Manage partner organizations', 'partners', 'write'),
  ('view_clients', 'View client information', 'clients', 'read'),
  ('manage_clients', 'Manage client relationships', 'clients', 'write'),
  ('view_applications', 'View loan applications', 'applications', 'read'),
  ('approve_loans', 'Approve loan applications', 'applications', 'approve'),
  ('view_quotes', 'View insurance quotes', 'quotes', 'read'),
  ('create_quotes', 'Create insurance quotes', 'quotes', 'write'),
  ('issue_policies', 'Issue insurance policies', 'policies', 'write'),
  ('view_bookings', 'View service bookings', 'bookings', 'read'),
  ('manage_bookings', 'Manage service bookings', 'bookings', 'write'),
  ('view_own_data', 'View own data', 'profile', 'read'),
  ('impersonate_users', 'Impersonate other users', 'users', 'impersonate')
ON CONFLICT (name) DO NOTHING;

-- Assign permissions to roles
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'super_admin'
ON CONFLICT DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'admin' AND p.name IN (
  'view_all_users', 'manage_users', 'view_analytics', 'export_reports',
  'manage_content', 'manage_partners', 'view_clients', 'manage_clients'
)
ON CONFLICT DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'analyst' AND p.name IN ('view_analytics', 'export_reports', 'view_clients')
ON CONFLICT DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'support' AND p.name IN ('view_clients')
ON CONFLICT DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'sales' AND p.name IN ('view_clients', 'manage_clients', 'view_analytics')
ON CONFLICT DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'bank_admin' AND p.name IN ('view_applications', 'approve_loans', 'view_clients')
ON CONFLICT DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'bank_agent' AND p.name IN ('view_applications', 'view_clients')
ON CONFLICT DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'insurance_admin' AND p.name IN ('view_quotes', 'create_quotes', 'issue_policies')
ON CONFLICT DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'insurance_agent' AND p.name IN ('view_quotes', 'create_quotes')
ON CONFLICT DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'service_admin' AND p.name IN ('view_bookings', 'manage_bookings')
ON CONFLICT DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'service_provider' AND p.name IN ('view_bookings')
ON CONFLICT DO NOTHING;

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name IN ('client', 'client_premium') AND p.name = 'view_own_data'
ON CONFLICT DO NOTHING;

-- RLS Policies

-- User profiles: Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- User profiles: Super admins and admins can view all profiles
CREATE POLICY "Admins can view all profiles"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin')
    )
  );

-- User profiles: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- User profiles: Admins can update any profile
CREATE POLICY "Admins can update profiles"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin')
    )
  );

-- User profiles: Admins can insert new profiles
CREATE POLICY "Admins can create profiles"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin')
    )
  );

-- Roles: Everyone can view roles
CREATE POLICY "Anyone can view roles"
  ON roles FOR SELECT
  TO authenticated
  USING (true);

-- Permissions: Everyone can view permissions
CREATE POLICY "Anyone can view permissions"
  ON permissions FOR SELECT
  TO authenticated
  USING (true);

-- Role permissions: Everyone can view role permissions
CREATE POLICY "Anyone can view role permissions"
  ON role_permissions FOR SELECT
  TO authenticated
  USING (true);

-- Organizations: Authenticated users can view organizations
CREATE POLICY "Users can view organizations"
  ON organizations FOR SELECT
  TO authenticated
  USING (true);

-- Organizations: Admins can manage organizations
CREATE POLICY "Admins can manage organizations"
  ON organizations FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin')
    )
  );

-- Audit logs: Only super admins can view audit logs
CREATE POLICY "Super admins can view audit logs"
  ON audit_logs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid()
      AND role = 'super_admin'
    )
  );

-- Audit logs: System can insert audit logs
CREATE POLICY "System can create audit logs"
  ON audit_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_organizations_updated_at ON organizations;
CREATE TRIGGER update_organizations_updated_at
  BEFORE UPDATE ON organizations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
