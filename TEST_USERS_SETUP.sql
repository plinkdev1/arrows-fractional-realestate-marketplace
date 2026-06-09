-- TEST USERS SETUP GUIDE
-- Use this guide to create test users for each dashboard type
--
-- IMPORTANT: You must first create the auth user in Supabase Dashboard:
-- 1. Go to Authentication → Users → Add User
-- 2. Enter email and password
-- 3. Copy the generated user ID
-- 4. Use that ID in the SQL below

-- ============================================
-- STEP 1: Create Organizations (for partner roles)
-- ============================================

-- Create a test bank organization
INSERT INTO organizations (name, type, status, contact_email, agreement_type, revenue_share_percentage)
VALUES ('Test Bank', 'bank', 'active', 'bank@test.com', 'revenue_share', 10.00)
ON CONFLICT DO NOTHING
RETURNING id; -- Save this ID for bank users

-- Create a test insurance organization
INSERT INTO organizations (name, type, status, contact_email, agreement_type, revenue_share_percentage)
VALUES ('Test Insurance Co', 'insurance', 'active', 'insurance@test.com', 'revenue_share', 8.00)
ON CONFLICT DO NOTHING
RETURNING id; -- Save this ID for insurance users

-- ============================================
-- STEP 2: Create User Profiles (after creating auth users)
-- ============================================

-- Test Client User
-- First create auth user with email: client@test.com, password: TestPassword123!
-- Then insert profile (replace 'AUTH_USER_ID_HERE' with actual ID):
INSERT INTO user_profiles (id, full_name, role, status)
VALUES ('AUTH_USER_ID_HERE', 'Test Client', 'client', 'active')
ON CONFLICT (id) DO NOTHING;

-- Test Super Admin User
-- First create auth user with email: admin@test.com, password: TestPassword123!
-- Then insert profile:
INSERT INTO user_profiles (id, full_name, role, status)
VALUES ('AUTH_USER_ID_HERE', 'Test Admin', 'super_admin', 'active')
ON CONFLICT (id) DO NOTHING;

-- Test Bank Agent User
-- First create auth user with email: bank@test.com, password: TestPassword123!
-- Then insert profile (replace ORGANIZATION_ID with bank org ID from step 1):
INSERT INTO user_profiles (id, full_name, role, status, organization_id)
VALUES ('AUTH_USER_ID_HERE', 'Test Bank Agent', 'bank_agent', 'active', 'ORGANIZATION_ID')
ON CONFLICT (id) DO NOTHING;

-- Test Insurance Agent User
-- First create auth user with email: insurance@test.com, password: TestPassword123!
-- Then insert profile (replace ORGANIZATION_ID with insurance org ID from step 1):
INSERT INTO user_profiles (id, full_name, role, status, organization_id)
VALUES ('AUTH_USER_ID_HERE', 'Test Insurance Agent', 'insurance_agent', 'active', 'ORGANIZATION_ID')
ON CONFLICT (id) DO NOTHING;

-- Test Service Provider User
-- First create auth user with email: service@test.com, password: TestPassword123!
-- Then insert profile:
INSERT INTO user_profiles (id, full_name, role, status)
VALUES ('AUTH_USER_ID_HERE', 'Test Service Provider', 'service_provider', 'active')
ON CONFLICT (id) DO NOTHING;

-- Test Support User (Team Dashboard)
-- First create auth user with email: support@test.com, password: TestPassword123!
-- Then insert profile:
INSERT INTO user_profiles (id, full_name, role, status)
VALUES ('AUTH_USER_ID_HERE', 'Test Support', 'support', 'active')
ON CONFLICT (id) DO NOTHING;

-- Test Analyst User (Team Dashboard)
-- First create auth user with email: analyst@test.com, password: TestPassword123!
-- Then insert profile:
INSERT INTO user_profiles (id, full_name, role, status)
VALUES ('AUTH_USER_ID_HERE', 'Test Analyst', 'analyst', 'active')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- STEP 3: Create Sample Data for Testing
-- ============================================

-- Sample Assessment for Client (replace CLIENT_USER_ID)
INSERT INTO assessments (user_id, status, purchase_date, delivery_date, price)
VALUES (
  'CLIENT_USER_ID',
  'delivered',
  now() - interval '5 days',
  now() - interval '2 days',
  150.00
)
ON CONFLICT DO NOTHING;

-- Sample Consultation for Client (replace CLIENT_USER_ID)
INSERT INTO consultations (user_id, status)
VALUES ('CLIENT_USER_ID', 'not_scheduled')
ON CONFLICT DO NOTHING;

-- Sample Loan Application for Bank (replace CLIENT_USER_ID, PROPERTY_ID, BANK_ORG_ID)
INSERT INTO loan_applications (user_id, property_id, bank_id, amount, status)
VALUES (
  'CLIENT_USER_ID',
  (SELECT id FROM properties LIMIT 1),
  'BANK_ORG_ID',
  300000.00,
  'new'
)
ON CONFLICT DO NOTHING;

-- Sample Insurance Quote (replace CLIENT_USER_ID, PROPERTY_ID, INSURANCE_ORG_ID)
INSERT INTO insurance_quotes (user_id, property_id, insurance_company_id, coverage_type, status)
VALUES (
  'CLIENT_USER_ID',
  (SELECT id FROM properties LIMIT 1),
  'INSURANCE_ORG_ID',
  'comprehensive',
  'requested'
)
ON CONFLICT DO NOTHING;

-- Sample Service Booking (replace CLIENT_USER_ID, SERVICE_PROVIDER_ID, PROPERTY_ID)
INSERT INTO service_bookings (user_id, provider_id, property_id, service_type, scheduled_date, status)
VALUES (
  'CLIENT_USER_ID',
  'SERVICE_PROVIDER_ID',
  (SELECT id FROM properties LIMIT 1),
  'property_inspection',
  now() + interval '3 days',
  'pending'
)
ON CONFLICT DO NOTHING;

-- Sample Document for Client (replace CLIENT_USER_ID)
INSERT INTO documents (user_id, title, file_url, file_type, file_size, category)
VALUES (
  'CLIENT_USER_ID',
  'Sample Assessment Report',
  'https://example.com/sample.pdf',
  'application/pdf',
  1024000,
  'assessment'
)
ON CONFLICT DO NOTHING;

-- Sample Message to Client (replace CLIENT_USER_ID, SUPPORT_USER_ID)
INSERT INTO messages (sender_id, recipient_id, subject, body, read)
VALUES (
  'SUPPORT_USER_ID',
  'CLIENT_USER_ID',
  'Welcome to Arrows Platform',
  'Thank you for joining Arrows! We are excited to help you with your real estate investment journey. If you have any questions, please do not hesitate to reach out.',
  false
)
ON CONFLICT DO NOTHING;

-- ============================================
-- QUICK VERIFICATION QUERIES
-- ============================================

-- Check all created user profiles
SELECT id, full_name, role, status, organization_id, created_at
FROM user_profiles
ORDER BY created_at DESC;

-- Check organizations
SELECT id, name, type, status, agreement_type, revenue_share_percentage
FROM organizations;

-- Check properties (should have 5 sample properties)
SELECT id, title, price, location, region, property_type, status
FROM properties;

-- Check assessments
SELECT id, user_id, status, price, purchase_date, delivery_date
FROM assessments;

-- Check consultations
SELECT id, user_id, status, scheduled_date
FROM consultations;

-- Check loan applications
SELECT id, user_id, bank_id, amount, status
FROM loan_applications;

-- Check insurance quotes
SELECT id, user_id, insurance_company_id, coverage_type, status
FROM insurance_quotes;

-- Check service bookings
SELECT id, user_id, provider_id, service_type, status, scheduled_date
FROM service_bookings;

-- ============================================
-- NOTES
-- ============================================

-- PASSWORD REQUIREMENTS:
-- - Minimum 12 characters
-- - Must include uppercase letters
-- - Must include lowercase letters
-- - Must include numbers
-- - Must include special characters
-- Example: TestPassword123!

-- LOGIN URLS:
-- - Client: http://localhost:5173/login → /dashboard/client
-- - Super Admin: http://localhost:5173/login → /dashboard/super-admin
-- - Bank: http://localhost:5173/login → /dashboard/bank
-- - Insurance: http://localhost:5173/login → /dashboard/insurance
-- - Service: http://localhost:5173/login → /dashboard/service
-- - Team: http://localhost:5173/login → /dashboard/team

-- DEFAULT REDIRECT:
-- After login, users are automatically redirected to /dashboard
-- which then redirects to the appropriate dashboard based on their role

-- TESTING CHECKLIST:
-- □ Create auth users in Supabase Dashboard
-- □ Insert user profiles with correct IDs
-- □ Create organizations for partner roles
-- □ Link partner users to organizations
-- □ Create sample data for each user
-- □ Test login for each role
-- □ Verify dashboard access
-- □ Test key features in each dashboard
