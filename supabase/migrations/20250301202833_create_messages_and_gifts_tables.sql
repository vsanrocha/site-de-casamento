
-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for messages table
CREATE INDEX IF NOT EXISTS messages_created_at_idx ON messages (created_at);

-- Add RLS policies for messages
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows only authenticated users to view all messages
CREATE POLICY "Allow authenticated users to view all messages" 
  ON messages FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Create a policy that allows anyone to insert messages
CREATE POLICY "Allow anyone to insert messages" 
  ON messages FOR INSERT 
  WITH CHECK (true);

-- Create gifts table
CREATE TABLE IF NOT EXISTS gifts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  price DECIMAL(10, 2),
  purchased BOOLEAN DEFAULT FALSE,
  purchased_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for gifts table
CREATE INDEX IF NOT EXISTS gifts_purchased_idx ON gifts (purchased);
CREATE INDEX IF NOT EXISTS gifts_created_at_idx ON gifts (created_at);

-- Add RLS policies for gifts
ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to view gifts
CREATE POLICY "Allow anyone to view gifts" 
  ON gifts FOR SELECT 
  USING (true);

-- Create a policy that allows only authenticated users to update gifts
CREATE POLICY "Allow authenticated users to update gifts" 
  ON gifts FOR UPDATE 
  USING (auth.role() = 'authenticated');

-- Create a policy that allows only authenticated users to insert gifts
CREATE POLICY "Allow authenticated users to insert gifts" 
  ON gifts FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');