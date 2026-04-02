-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Drop existing table if exists for a clean setup
drop table if exists leads;

-- Create the simplified leads table
create table leads (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text not null,
  phone text,
  industry text,
  monthly_revenue text,
  ready_to_start text,
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

-- Allow anonymous inserts (public lead submission)
create policy "Enable insert for anonymous users" on leads
  for insert with check (true);

-- Allow authenticated admins to full read/write
create policy "Enable all for authenticated users" on leads
  for all using (auth.role() = 'authenticated');
