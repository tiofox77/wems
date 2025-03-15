-- Create tables for WEMS database

-- Version table
CREATE TABLE IF NOT EXISTS db_version (
  id SERIAL PRIMARY KEY,
  version INTEGER NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Slides table
CREATE TABLE IF NOT EXISTS slides (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  button_text TEXT,
  button_href TEXT,
  order_index INTEGER DEFAULT 0
);

-- Partners table
CREATE TABLE IF NOT EXISTS partners (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  logo TEXT NOT NULL,
  website TEXT,
  description TEXT
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  detailed_info TEXT NOT NULL,
  features JSONB NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE
);

-- Client categories table
CREATE TABLE IF NOT EXISTS client_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  clients JSONB NOT NULL,
  order_index INTEGER DEFAULT 0
);

-- Images table
CREATE TABLE IF NOT EXISTS images (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  section TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  alt_text TEXT,
  size INTEGER
);

-- Contact data table
CREATE TABLE IF NOT EXISTS contact (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  contact_info JSONB NOT NULL
);

-- Site logo table
CREATE TABLE IF NOT EXISTS site_logo (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- About data table
CREATE TABLE IF NOT EXISTS about (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT NOT NULL,
  stats JSONB
);

-- Mission vision data table
CREATE TABLE IF NOT EXISTS mission_vision (
  id SERIAL PRIMARY KEY,
  mission JSONB NOT NULL,
  vision JSONB NOT NULL,
  values JSONB
);

-- Site settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id SERIAL PRIMARY KEY,
  site_name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  favicon TEXT,
  primary_color TEXT,
  secondary_color TEXT,
  social_links JSONB,
  meta_tags JSONB
);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'new'
);

-- Strategic consulting table
CREATE TABLE IF NOT EXISTS strategic_consulting (
  id SERIAL PRIMARY KEY,
  content JSONB NOT NULL
);

-- Service examples table
CREATE TABLE IF NOT EXISTS service_examples (
  id SERIAL PRIMARY KEY,
  examples JSONB NOT NULL
);
