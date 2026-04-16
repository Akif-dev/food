import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category_id?: number;
  category?: string;
  image_url: string;
  variations?: string[];
  addons?: string[];
  spice_levels?: string[];
  available: boolean;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: number;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  delivery_address: string;
  delivery_type: 'delivery' | 'pickup';
  items: OrderItem[];
  subtotal: number;
  delivery_fee: number;
  tax: number;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  payment_method: string;
  special_instructions?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  menu_item_id: number;
  name: string;
  price: number;
  quantity: number;
  variation?: string;
  addons: string[];
  spice_level?: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  icon: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'customer';
  created_at: string;
}
