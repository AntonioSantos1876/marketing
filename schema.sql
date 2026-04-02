-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create the leads table
create table leads (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  business_name text not null,
  email text not null,
  phone text,
  website_or_social text,
  industry text,
  interested_service text,
  business_description text,
  current_challenge text,
  goals text,
  monthly_budget text,
  ready_to_start text,
  worked_with_agency_before text,
  why_good_fit text,
  preferred_contact_method text,
  consent_to_contact boolean default false,
  
  -- Admin status fields
  lead_status text default 'New' check (lead_status in ('New', 'Reviewed', 'Contacted', 'Qualified', 'Unqualified', 'Closed')),
  admin_notes text,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on Row Level Security
alter table leads enable row level security;

-- Allow anonymous inserts (so public form users can submit leads)
create policy "Enable insert for anonymous users" on leads
  for insert with check (true);

-- Allow authenticated users (Admins) to read all leads
create policy "Enable read for authenticated users" on leads
  for select using (auth.role() = 'authenticated');

-- Allow authenticated users to update leads
create policy "Enable update for authenticated users" on leads
  for update using (auth.role() = 'authenticated');

-- Allow authenticated users to delete leads (optional, nice for cleanup)
create policy "Enable delete for authenticated users" on leads
  for delete using (auth.role() = 'authenticated');

-- Insert sample data
insert into leads (
  full_name, business_name, email, phone, website_or_social, industry, interested_service, business_description, current_challenge, goals, monthly_budget, ready_to_start, worked_with_agency_before, why_good_fit, preferred_contact_method, consent_to_contact, lead_status
) values 
  ('Sarah Jenkins', 'Jenkins Consulting', 'sarah@jenkinsconsulting.demo', '555-0101', 'www.jenkinsconsulting.demo', 'B2B Consulting', 'Lead Generation', 'We provide management consulting for medium-sized firms.', 'Not getting enough qualified leads through organic channels.', 'Double our inbound pipeline in 6 months.', '$3,000 - $10,000', 'ASAP', 'Yes', 'We have budget and are ready to execute aggressively.', 'Email', true, 'New'),
  ('Michael Ross', 'Ross & Co Legal', 'michael@rosslegal.demo', '555-0102', 'www.rosslegal.demo', 'Legal Services', 'Brand Visibility', 'A boutique law firm specializing in corporate law.', 'Low brand awareness compared to competitors.', 'Become the top-of-mind firm in our city.', '$10,000+', 'In 1-2 weeks', 'No', 'We deliver a premium service and need our marketing to match.', 'Phone Call', true, 'Contacted'),
  ('David Lin', 'TechScale SaaS', 'david@techscale.demo', '555-0103', 'www.techscale.demo', 'Software', 'Full Growth System', 'SaaS platform for inventory management.', 'Ads are too expensive and not converting well.', 'Lower CAC and scale internationally.', '$3,000 - $10,000', 'Within a month', 'Yes', 'We are funded and looking for an experienced growth partner.', 'Email', true, 'Qualified');
