-- Fix RLS policies for menu_items table to allow public reads

DROP POLICY IF EXISTS "Allow public select to menu_items" ON menu_items;

CREATE POLICY "Allow public select to menu_items" ON menu_items
FOR SELECT
USING (true);
