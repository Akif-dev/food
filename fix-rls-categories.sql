-- Fix RLS policies for categories table to allow public reads

DROP POLICY IF EXISTS "Allow public select to categories" ON categories;

CREATE POLICY "Allow public select to categories" ON categories
FOR SELECT
USING (true);
