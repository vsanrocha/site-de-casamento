-- Create extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables
CREATE TABLE IF NOT EXISTS rsvps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  guests INTEGER NOT NULL DEFAULT 0,
  message TEXT,
  attending BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gifts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  price DECIMAL(10, 2),
  purchased BOOLEAN DEFAULT false,
  purchased_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS rsvps_email_idx ON rsvps (email);
CREATE INDEX IF NOT EXISTS rsvps_created_at_idx ON rsvps (created_at DESC);
CREATE INDEX IF NOT EXISTS messages_created_at_idx ON messages (created_at DESC);
CREATE INDEX IF NOT EXISTS gifts_created_at_idx ON gifts (created_at DESC);
CREATE INDEX IF NOT EXISTS gifts_purchased_idx ON gifts (purchased);

-- Enable Row Level Security
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (admin)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'rsvps' AND policyname = 'Allow authenticated users to view all RSVPs'
  ) THEN
    CREATE POLICY "Allow authenticated users to view all RSVPs" ON rsvps
      FOR SELECT
      TO authenticated
      USING (auth.role() = 'authenticated');
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'messages' AND policyname = 'Allow authenticated users to view all messages'
  ) THEN
    CREATE POLICY "Allow authenticated users to view all messages" ON messages
      FOR SELECT
      TO authenticated
      USING (auth.role() = 'authenticated');
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'gifts' AND policyname = 'Allow authenticated users to insert gifts'
  ) THEN
    CREATE POLICY "Allow authenticated users to insert gifts" ON gifts
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.role() = 'authenticated');
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'gifts' AND policyname = 'Allow authenticated users to update gifts'
  ) THEN
    CREATE POLICY "Allow authenticated users to update gifts" ON gifts
      FOR UPDATE
      TO authenticated
      USING (auth.role() = 'authenticated');
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'rsvps' AND policyname = 'Allow anyone to insert RSVPs'
  ) THEN
    CREATE POLICY "Allow anyone to insert RSVPs" ON rsvps
      FOR INSERT
      TO anon
      WITH CHECK (true);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'messages' AND policyname = 'Allow anyone to insert messages'
  ) THEN
    CREATE POLICY "Allow anyone to insert messages" ON messages
      FOR INSERT
      TO anon
      WITH CHECK (true);
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'gifts' AND policyname = 'Allow anyone to view gifts'
  ) THEN
    CREATE POLICY "Allow anyone to view gifts" ON gifts
      FOR SELECT
      TO anon
      USING (true);
  END IF;
END
$$;

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_rsvps_updated_at'
  ) THEN
    CREATE TRIGGER update_rsvps_updated_at
    BEFORE UPDATE ON rsvps
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_gifts_updated_at'
  ) THEN
    CREATE TRIGGER update_gifts_updated_at
    BEFORE UPDATE ON gifts
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();
  END IF;
END
$$;
