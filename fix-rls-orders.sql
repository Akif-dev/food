-- Fix RLS policies for orders table to allow public inserts

DROP POLICY IF EXISTS "Allow public insert to orders" ON orders;

CREATE POLICY "Allow public insert to orders" ON orders
FOR INSERT
WITH CHECK (true);

-- Also ensure select policy exists
DROP POLICY IF EXISTS "Allow public select to orders" ON orders;

CREATE POLICY "Allow public select to orders" ON orders
FOR SELECT
USING (true);

-- Add update policy for order status updates
DROP POLICY IF EXISTS "Allow public update to orders" ON orders;

CREATE POLICY "Allow public update to orders" ON orders
FOR UPDATE
WITH CHECK (true);

-- Enable real-time replication for orders table (ignore if already added)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'orders'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE orders;
  END IF;
END $$;
