-- Create RSVP table
CREATE TABLE IF NOT EXISTS rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  guests INTEGER NOT NULL,
  message TEXT,
  attending BOOLEAN NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS rsvps_email_idx ON rsvps (email);
CREATE INDEX IF NOT EXISTS rsvps_created_at_idx ON rsvps (created_at);

-- Add RLS policies
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows only authenticated users to view all RSVPs
CREATE POLICY "Allow authenticated users to view all RSVPs" 
  ON rsvps FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Create a policy that allows anyone to insert RSVPs
CREATE POLICY "Allow anyone to insert RSVPs" 
  ON rsvps FOR INSERT 
  WITH CHECK (true);