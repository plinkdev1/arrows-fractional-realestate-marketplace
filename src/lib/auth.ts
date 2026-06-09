import { supabase } from './supabase';

export type UserRole =
  | 'super_admin'
  | 'admin'
  | 'analyst'
  | 'support'
  | 'sales'
  | 'bank_admin'
  | 'bank_agent'
  | 'insurance_admin'
  | 'insurance_agent'
  | 'service_admin'
  | 'service_provider'
  | 'client'
  | 'client_premium';

export interface UserProfile {
  id: string;
  full_name: string;
  role: UserRole;
  status: 'active' | 'inactive' | 'suspended';
  phone?: string;
  avatar_url?: string;
  organization_id?: string;
  created_at: string;
  updated_at: string;
  last_login_at?: string;
  mfa_enabled: boolean;
}

export interface AuthUser {
  id: string;
  email: string;
  profile: UserProfile;
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  if (data.user) {
    await supabase
      .from('user_profiles')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', data.user.id);
  }

  return data;
};

export const signUp = async (email: string, password: string, fullName: string, role: UserRole = 'client') => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  if (data.user) {
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        id: data.user.id,
        full_name: fullName,
        role,
        status: 'active',
      });

    if (profileError) throw profileError;
  }

  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async (): Promise<AuthUser | null> => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  if (error) throw error;
  if (!profile) return null;

  return {
    id: user.id,
    email: user.email!,
    profile,
  };
};

export const getUserPermissions = async (userId: string): Promise<string[]> => {
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('role')
    .eq('id', userId)
    .maybeSingle();

  if (!profile) return [];

  if (profile.role === 'super_admin') {
    return ['*'];
  }

  const { data: roleData } = await supabase
    .from('roles')
    .select('id')
    .eq('name', profile.role)
    .maybeSingle();

  if (!roleData) return [];

  const { data: permissions } = await supabase
    .from('role_permissions')
    .select('permission_id, permissions(name)')
    .eq('role_id', roleData.id);

  if (!permissions) return [];

  return permissions.map((p: any) => p.permissions.name);
};

export const hasPermission = (userPermissions: string[], requiredPermission: string): boolean => {
  if (userPermissions.includes('*')) return true;
  return userPermissions.includes(requiredPermission);
};

export const hasAnyPermission = (userPermissions: string[], requiredPermissions: string[]): boolean => {
  if (userPermissions.includes('*')) return true;
  return requiredPermissions.some(permission => userPermissions.includes(permission));
};

export const hasRole = (userRole: UserRole, allowedRoles: UserRole[]): boolean => {
  return allowedRoles.includes(userRole);
};

export const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) throw error;
};

export const updatePassword = async (newPassword: string) => {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw error;
};

export const logAudit = async (
  action: string,
  resource: string,
  resourceId?: string,
  details?: any
) => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return;

  await supabase.from('audit_logs').insert({
    user_id: user.id,
    action,
    resource,
    resource_id: resourceId,
    details,
    ip_address: null,
    user_agent: navigator.userAgent,
  });
};
