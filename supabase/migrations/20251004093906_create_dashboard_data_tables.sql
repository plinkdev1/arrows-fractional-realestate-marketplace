/*
  # Dashboard Data Tables

  1. New Tables
    - `assessments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `status` (text)
      - `pdf_url` (text)
      - `purchase_date` (timestamptz)
      - `delivery_date` (timestamptz)
      - `price` (numeric)
      - `key_findings` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
    - `properties`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `price` (numeric)
      - `location` (text)
      - `region` (text)
      - `property_type` (text)
      - `bedrooms` (integer)
      - `bathrooms` (integer)
      - `area_sqm` (numeric)
      - `features` (text[])
      - `images` (text[])
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
    - `saved_properties`
      - `user_id` (uuid, references auth.users)
      - `property_id` (uuid, references properties)
      - `created_at` (timestamptz)
      
    - `consultations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `scheduled_date` (timestamptz)
      - `duration_minutes` (integer)
      - `status` (text)
      - `meeting_link` (text)
      - `notes` (text)
      - `recording_url` (text)
      - `transcript_url` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
    - `documents`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `file_url` (text)
      - `file_type` (text)
      - `file_size` (integer)
      - `category` (text)
      - `created_at` (timestamptz)
      
    - `messages`
      - `id` (uuid, primary key)
      - `sender_id` (uuid, references auth.users)
      - `recipient_id` (uuid, references auth.users)
      - `subject` (text)
      - `body` (text)
      - `read` (boolean)
      - `created_at` (timestamptz)
      
    - `loan_applications`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `property_id` (uuid, references properties)
      - `bank_id` (uuid, references organizations)
      - `amount` (numeric)
      - `status` (text)
      - `application_data` (jsonb)
      - `assigned_to` (uuid, references auth.users)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
    - `insurance_quotes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `property_id` (uuid, references properties)
      - `insurance_company_id` (uuid, references organizations)
      - `coverage_type` (text)
      - `premium_amount` (numeric)
      - `status` (text)
      - `quote_data` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
    - `service_bookings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `property_id` (uuid, references properties)
      - `provider_id` (uuid, references auth.users)
      - `service_type` (text)
      - `scheduled_date` (timestamptz)
      - `status` (text)
      - `notes` (text)
      - `rating` (integer)
      - `review` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access
*/

-- Create assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'delivered', 'revision_requested')),
  pdf_url text,
  purchase_date timestamptz NOT NULL DEFAULT now(),
  delivery_date timestamptz,
  price numeric(10,2) NOT NULL DEFAULT 150.00,
  key_findings jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  price numeric(12,2) NOT NULL,
  location text NOT NULL,
  region text NOT NULL,
  property_type text NOT NULL CHECK (property_type IN ('apartment', 'house', 'villa', 'land', 'commercial')),
  bedrooms integer DEFAULT 0,
  bathrooms integer DEFAULT 0,
  area_sqm numeric(10,2),
  features text[] DEFAULT '{}',
  images text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'sold')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Create saved_properties table
CREATE TABLE IF NOT EXISTS saved_properties (
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, property_id)
);

ALTER TABLE saved_properties ENABLE ROW LEVEL SECURITY;

-- Create consultations table
CREATE TABLE IF NOT EXISTS consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  scheduled_date timestamptz,
  duration_minutes integer DEFAULT 30,
  status text NOT NULL DEFAULT 'not_scheduled' CHECK (status IN ('not_scheduled', 'scheduled', 'completed', 'cancelled')),
  meeting_link text,
  notes text,
  recording_url text,
  transcript_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  file_url text NOT NULL,
  file_type text NOT NULL,
  file_size integer,
  category text DEFAULT 'general' CHECK (category IN ('assessment', 'contract', 'general', 'invoice')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  recipient_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  subject text NOT NULL,
  body text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create loan_applications table
CREATE TABLE IF NOT EXISTS loan_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  property_id uuid REFERENCES properties(id) ON DELETE SET NULL,
  bank_id uuid REFERENCES organizations(id) ON DELETE SET NULL,
  amount numeric(12,2) NOT NULL,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'under_review', 'approved', 'rejected', 'funded')),
  application_data jsonb,
  assigned_to uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE loan_applications ENABLE ROW LEVEL SECURITY;

-- Create insurance_quotes table
CREATE TABLE IF NOT EXISTS insurance_quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  property_id uuid REFERENCES properties(id) ON DELETE SET NULL,
  insurance_company_id uuid REFERENCES organizations(id) ON DELETE SET NULL,
  coverage_type text NOT NULL,
  premium_amount numeric(10,2),
  status text NOT NULL DEFAULT 'requested' CHECK (status IN ('requested', 'quoted', 'accepted', 'issued', 'rejected')),
  quote_data jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE insurance_quotes ENABLE ROW LEVEL SECURITY;

-- Create service_bookings table
CREATE TABLE IF NOT EXISTS service_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  property_id uuid REFERENCES properties(id) ON DELETE SET NULL,
  provider_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  service_type text NOT NULL,
  scheduled_date timestamptz,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'completed', 'cancelled')),
  notes text,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  review text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE service_bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for assessments
CREATE POLICY "Users can view own assessments"
  ON assessments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all assessments"
  ON assessments FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin', 'analyst', 'support')
    )
  );

CREATE POLICY "Admins can manage assessments"
  ON assessments FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin')
    )
  );

-- RLS Policies for properties
CREATE POLICY "Anyone can view available properties"
  ON properties FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage properties"
  ON properties FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin')
    )
  );

-- RLS Policies for saved_properties
CREATE POLICY "Users can view own saved properties"
  ON saved_properties FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save properties"
  ON saved_properties FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave properties"
  ON saved_properties FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for consultations
CREATE POLICY "Users can view own consultations"
  ON consultations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own consultations"
  ON consultations FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all consultations"
  ON consultations FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin', 'support')
    )
  );

-- RLS Policies for documents
CREATE POLICY "Users can view own documents"
  ON documents FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upload documents"
  ON documents FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all documents"
  ON documents FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid()
      AND role IN ('super_admin', 'admin', 'support')
    )
  );

-- RLS Policies for messages
CREATE POLICY "Users can view own messages"
  ON messages FOR SELECT
  TO authenticated
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update own received messages"
  ON messages FOR UPDATE
  TO authenticated
  USING (auth.uid() = recipient_id)
  WITH CHECK (auth.uid() = recipient_id);

-- RLS Policies for loan_applications
CREATE POLICY "Users can view own applications"
  ON loan_applications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Bank staff can view assigned applications"
  ON loan_applications FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.id = auth.uid()
      AND up.role IN ('bank_admin', 'bank_agent')
      AND up.organization_id = loan_applications.bank_id
    )
  );

CREATE POLICY "Bank staff can manage applications"
  ON loan_applications FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.id = auth.uid()
      AND up.role IN ('bank_admin', 'bank_agent')
      AND up.organization_id = loan_applications.bank_id
    )
  );

-- RLS Policies for insurance_quotes
CREATE POLICY "Users can view own quotes"
  ON insurance_quotes FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Insurance staff can view company quotes"
  ON insurance_quotes FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.id = auth.uid()
      AND up.role IN ('insurance_admin', 'insurance_agent')
      AND up.organization_id = insurance_quotes.insurance_company_id
    )
  );

CREATE POLICY "Insurance staff can manage quotes"
  ON insurance_quotes FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles up
      WHERE up.id = auth.uid()
      AND up.role IN ('insurance_admin', 'insurance_agent')
      AND up.organization_id = insurance_quotes.insurance_company_id
    )
  );

-- RLS Policies for service_bookings
CREATE POLICY "Users can view own bookings"
  ON service_bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Providers can view assigned bookings"
  ON service_bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = provider_id);

CREATE POLICY "Users can create bookings"
  ON service_bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Providers can update bookings"
  ON service_bookings FOR UPDATE
  TO authenticated
  USING (auth.uid() = provider_id)
  WITH CHECK (auth.uid() = provider_id);

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_assessments_updated_at ON assessments;
CREATE TRIGGER update_assessments_updated_at
  BEFORE UPDATE ON assessments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_properties_updated_at ON properties;
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_consultations_updated_at ON consultations;
CREATE TRIGGER update_consultations_updated_at
  BEFORE UPDATE ON consultations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_loan_applications_updated_at ON loan_applications;
CREATE TRIGGER update_loan_applications_updated_at
  BEFORE UPDATE ON loan_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_insurance_quotes_updated_at ON insurance_quotes;
CREATE TRIGGER update_insurance_quotes_updated_at
  BEFORE UPDATE ON insurance_quotes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_service_bookings_updated_at ON service_bookings;
CREATE TRIGGER update_service_bookings_updated_at
  BEFORE UPDATE ON service_bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for testing
INSERT INTO properties (title, description, price, location, region, property_type, bedrooms, bathrooms, area_sqm, features, images, status) VALUES
  ('Modern Apartment in Lisbon', 'Beautiful 2-bedroom apartment in the heart of Lisbon with stunning views', 350000, 'Avenida da Liberdade, Lisbon', 'Lisbon', 'apartment', 2, 2, 85, ARRAY['balcony', 'parking', 'elevator'], ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'], 'available'),
  ('Luxury Villa in Algarve', 'Stunning 4-bedroom villa with private pool and ocean views', 750000, 'Lagos, Algarve', 'Algarve', 'villa', 4, 3, 250, ARRAY['pool', 'garden', 'garage', 'sea_view'], ARRAY['https://images.unsplash.com/photo-1613490493576-7fde63acd811'], 'available'),
  ('Cozy House in Porto', 'Charming 3-bedroom house in traditional Portuguese style', 280000, 'Ribeira, Porto', 'Porto', 'house', 3, 2, 120, ARRAY['terrace', 'fireplace'], ARRAY['https://images.unsplash.com/photo-1580587771525-78b9dba3b914'], 'available'),
  ('Apartment with River View', 'Spacious apartment overlooking the Douro River', 420000, 'Foz do Douro, Porto', 'Porto', 'apartment', 3, 2, 110, ARRAY['balcony', 'parking', 'river_view'], ARRAY['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688'], 'available'),
  ('Penthouse in Cascais', 'Exclusive penthouse with panoramic sea views', 950000, 'Cascais', 'Lisbon', 'apartment', 3, 3, 180, ARRAY['pool', 'gym', 'concierge', 'sea_view'], ARRAY['https://images.unsplash.com/photo-1512917774080-9991f1c4c750'], 'available')
ON CONFLICT DO NOTHING;
