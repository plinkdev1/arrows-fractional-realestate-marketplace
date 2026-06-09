# Multi-Role Dashboard System - User Guide

## Overview

The Arrows platform now includes a comprehensive multi-role dashboard system with 6 distinct dashboard types, each tailored to specific user roles with appropriate access controls.

## Dashboard Types

### 1. Client/Investor Dashboard (`/dashboard/client`)
**Roles:** `client`, `client_premium`

Features:
- Overview with key metrics and quick actions
- My Assessment page (view and download reports)
- Properties browsing and saved properties
- Consultation call scheduling
- Documents management
- Messaging system
- Settings

### 2. Super Admin Dashboard (`/dashboard/super-admin`)
**Role:** `super_admin`

Features:
- Platform overview with revenue and user metrics
- User management (create, edit, delete, impersonate)
- Content management
- Partner management
- Analytics and reports
- System settings
- Audit logs

### 3. Company Team Dashboard (`/dashboard/team`)
**Roles:** `admin`, `analyst`, `support`, `sales`

Features (role-based):
- Team overview
- Client management
- Analytics (admin, analyst, sales only)
- Support tools (admin, support only)
- Settings

### 4. Bank Partners Dashboard (`/dashboard/bank`)
**Roles:** `bank_admin`, `bank_agent`

Features:
- Loan applications pipeline
- Application details and processing
- Performance metrics
- Team management (bank_admin only)
- Settings

### 5. Insurance Partners Dashboard (`/dashboard/insurance`)
**Roles:** `insurance_admin`, `insurance_agent`

Features:
- Quote requests pipeline
- Quote creation tool
- Policy management
- Performance metrics
- Team management (insurance_admin only)
- Settings

### 6. Service Providers Dashboard (`/dashboard/service`)
**Roles:** `service_admin`, `service_provider`

Features:
- Booking management
- Availability calendar
- Performance tracking
- Client reviews
- Settings

## Authentication & Security

### Login Flow
1. Navigate to `/login`
2. Enter email and password
3. MFA verification (when enabled)
4. Automatic redirect to appropriate dashboard based on role

### Security Features
- Email + Password authentication
- MFA/OTP support (mandatory for admin roles)
- Role-Based Access Control (RBAC)
- Session management with 24-hour timeout
- Protected routes with automatic redirects
- Audit logging for sensitive actions

### Password Requirements
- Minimum 12 characters
- Must include uppercase letters
- Must include lowercase letters
- Must include numbers
- Must include special characters

## Database Schema

### Tables Created

1. **user_profiles** - Extended user information
2. **roles** - Role definitions
3. **permissions** - Permission definitions
4. **role_permissions** - Role-permission mappings
5. **organizations** - Partner organizations
6. **audit_logs** - System activity logs

### Default Roles

| Role | Level | Description |
|------|-------|-------------|
| super_admin | 1 | Full platform control |
| admin | 2 | Manage users and content |
| analyst | 2 | View analytics and reports |
| support | 2 | Handle customer inquiries |
| sales | 2 | Manage client relationships |
| bank_admin | 3 | Manage bank partnerships |
| bank_agent | 3 | Process loan applications |
| insurance_admin | 3 | Manage insurance partnerships |
| insurance_agent | 3 | Create quotes |
| service_admin | 3 | Manage service providers |
| service_provider | 3 | Fulfill bookings |
| client | 4 | Standard customer access |
| client_premium | 4 | Enhanced customer access |

## Getting Started

### For Development

1. Ensure Supabase is configured in `.env`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

2. The database migration has already been applied with:
   - All tables created
   - Default roles and permissions configured
   - RLS policies enabled

3. Create test users via Supabase Dashboard or programmatically:

```sql
-- Example: Create a super admin user
-- First, create the auth user in Supabase Dashboard
-- Then, create the profile:
INSERT INTO user_profiles (id, full_name, role, status)
VALUES ('auth-user-id-here', 'Admin User', 'super_admin', 'active');
```

### Testing Different Dashboards

1. **Test Client Dashboard:**
   - Create user with role: `client`
   - Login at `/login`
   - View dashboard at `/dashboard/client`

2. **Test Super Admin Dashboard:**
   - Create user with role: `super_admin`
   - Login at `/login`
   - View dashboard at `/dashboard/super-admin`

3. **Test Other Dashboards:**
   - Create users with appropriate roles
   - Access respective dashboard URLs

## API Integration Points

### Authentication
- `src/lib/auth.ts` - Core authentication functions
- `src/contexts/AuthContext.tsx` - Authentication context provider

### Database Access
- `src/lib/supabase.ts` - Supabase client configuration

### Protected Routes
- `src/components/ProtectedRoute.tsx` - Route protection wrapper

## Customization

### Adding New Roles

1. Insert into `roles` table:
```sql
INSERT INTO roles (name, display_name, description, level)
VALUES ('new_role', 'New Role', 'Description', 3);
```

2. Add permissions:
```sql
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'new_role' AND p.name IN ('permission1', 'permission2');
```

3. Update `UserRole` type in `src/lib/auth.ts`

### Adding New Dashboard Pages

1. Create page component in `src/pages/dashboards/[role]/`
2. Add route in `src/App.tsx`
3. Add navigation item in `src/components/dashboard/DashboardLayout.tsx`

### Adding New Permissions

```sql
INSERT INTO permissions (name, description, resource, action)
VALUES ('new_permission', 'Description', 'resource_name', 'action_name');
```

## Current Status

### ✅ Implemented
- Complete authentication system with Supabase
- Role-Based Access Control (RBAC) with 13 roles
- Database schema with all tables:
  - User profiles, roles, permissions, organizations
  - Assessments, properties, consultations
  - Loan applications, insurance quotes, service bookings
  - Messages, documents, audit logs
- Protected routes with role-based access
- Dashboard layout with role-specific navigation
- **Client Dashboard (Complete)**:
  - Overview with metrics and recent activity
  - Assessment page with status and refund options
  - Properties browsing with filters and saved properties
  - Consultation scheduling with calendar
  - Documents and Messages (placeholder)
- **Super Admin Dashboard**:
  - Overview with platform metrics and analytics
  - User Management (create, edit, delete users)
  - Partners, Analytics, Content (placeholder)
- **Bank Partners Dashboard**:
  - Loan applications overview with status pipeline
  - Application management and status updates
- **Insurance Partners Dashboard**:
  - Quote requests overview
  - Quote management with premium calculation
- Team, Service Provider dashboards (placeholder)
- 5 sample properties in database

### 🚧 Coming Soon (Phase 3)
- Client Documents and Messages pages
- Super Admin Analytics and Reports
- Partner management interface
- Team dashboard with client management
- Service provider dashboard with bookings
- MFA implementation
- Email notifications
- File upload functionality
- Advanced search and filters
- Real-time updates with Supabase subscriptions

## Support & Documentation

For questions or issues:
- Review this guide
- Check database migration file
- Review component source code
- Contact development team

## Security Notes

- Never commit `.env` files
- Use environment variables for all secrets
- MFA should be mandatory for admin roles
- Regularly review audit logs
- Test permission boundaries thoroughly
- Follow principle of least privilege

## Next Steps

1. Create test users for each role
2. Test authentication flow
3. Verify role-based access works correctly
4. Implement remaining dashboard pages
5. Add real data integration
6. Configure MFA
7. Set up monitoring and alerts
8. Conduct security audit
