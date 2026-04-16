-- Update the orders status check constraint to simple values

-- Drop the existing check constraint first
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_status_check;

-- Update existing orders to valid status values
UPDATE orders SET status = 'pending' WHERE status IN ('confirmed', 'preparing', 'on_the_way', 'ready');
UPDATE orders SET status = 'completed' WHERE status = 'delivered';

-- Add the updated check constraint with simple status values
ALTER TABLE orders ADD CONSTRAINT orders_status_check
CHECK (status IN ('pending', 'completed', 'cancelled'));
