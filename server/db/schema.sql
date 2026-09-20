-- Investment Experts Next-Gen Database Schema
-- Blueprint Part E: Data Architecture

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  country TEXT,
  investor_type TEXT CHECK (investor_type IN ('local', 'international', 'institutional')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Properties table
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  property_type TEXT CHECK (property_type IN ('apartment', 'villa', 'penthouse', 'townhouse', 'commercial')) NOT NULL,
  status TEXT CHECK (status IN ('available', 'reserved', 'sold', 'off_plan')) DEFAULT 'available',
  price NUMERIC(12, 2) NOT NULL,
  currency TEXT DEFAULT 'AED',
  area_sqft NUMERIC(10, 2),
  area_sqm NUMERIC(10, 2),
  bedrooms INTEGER,
  bathrooms INTEGER,
  floor_number INTEGER,
  total_floors INTEGER,
  year_built INTEGER,
  location_address TEXT,
  location_area TEXT,
  location_emirate TEXT DEFAULT 'Dubai',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  developer_id UUID,
  amenities JSONB DEFAULT '[]',
  images JSONB DEFAULT '[]',
  virtual_tour_url TEXT,
  video_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects table (for off-plan developments)
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  developer_id UUID,
  description TEXT,
  location_area TEXT,
  completion_date DATE,
  handover_date DATE,
  payment_plan JSONB,
  starting_price NUMERIC(12, 2),
  unit_types JSONB,
  amenities JSONB,
  images JSONB,
  brochure_url TEXT,
  status TEXT CHECK (status IN ('upcoming', 'launching_soon', 'active', 'completed')) DEFAULT 'upcoming',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Developers table
CREATE TABLE IF NOT EXISTS public.developers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  website_url TEXT,
  phone TEXT,
  email TEXT,
  established_year INTEGER,
  projects_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads table
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source TEXT CHECK (source IN ('website', 'phone', 'email', 'social', 'referral', 'walk_in')) NOT NULL,
  status TEXT CHECK (status IN ('new', 'contacted', 'qualified', 'viewing_scheduled', 'offer_made', 'closed_won', 'closed_lost')) DEFAULT 'new',
  first_name TEXT NOT NULL,
  last_name TEXT,
  email TEXT,
  phone TEXT NOT NULL,
  nationality TEXT,
  budget_min NUMERIC(12, 2),
  budget_max NUMERIC(12, 2),
  preferred_areas JSONB,
  property_interest TEXT,
  investment_goal TEXT,
  notes TEXT,
  assigned_agent_id UUID,
  user_id UUID REFERENCES public.users(id),
  property_id UUID REFERENCES public.properties(id),
  project_id UUID REFERENCES public.projects(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lead activities (timeline)
CREATE TABLE IF NOT EXISTS public.lead_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  activity_type TEXT CHECK (activity_type IN ('call', 'email', 'sms', 'whatsapp', 'viewing', 'meeting', 'note')) NOT NULL,
  subject TEXT,
  notes TEXT,
  scheduled_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Property views (analytics)
CREATE TABLE IF NOT EXISTS public.property_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id),
  session_id TEXT,
  viewed_at TIMESTAMPTZ DEFAULT NOW(),
  duration_seconds INTEGER,
  source TEXT
);

-- Saved properties
CREATE TABLE IF NOT EXISTS public.saved_properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  saved_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, property_id)
);

-- Property inquiries
CREATE TABLE IF NOT EXISTS public.property_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  preferred_contact_method TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Market reports
CREATE TABLE IF NOT EXISTS public.market_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  report_type TEXT CHECK (report_type IN ('quarterly', 'annual', 'area_analysis', 'investment_guide')) NOT NULL,
  area TEXT,
  published_date DATE,
  summary TEXT,
  content JSONB,
  pdf_url TEXT,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_properties_status ON public.properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_type ON public.properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_area ON public.properties(location_area);
CREATE INDEX IF NOT EXISTS idx_properties_price ON public.properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON public.properties(featured);
CREATE INDEX IF NOT EXISTS idx_properties_location ON public.properties USING GIST (ll_to_earth(latitude, longitude));
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_property_views_property ON public.property_views(property_id);
CREATE INDEX IF NOT EXISTS idx_saved_properties_user ON public.saved_properties(user_id);

-- RLS Policies (Row Level Security)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_inquiries ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY users_select_own ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY leads_select_own ON public.leads
  FOR SELECT USING (auth.uid() = user_id OR assigned_agent_id = auth.uid());

CREATE POLICY saved_properties_select_own ON public.saved_properties
  FOR SELECT USING (auth.uid() = user_id);

-- Agents can view all leads assigned to them
CREATE POLICY agents_view_assigned_leads ON public.leads
  FOR SELECT TO authenticated
  USING (assigned_agent_id = auth.uid());

