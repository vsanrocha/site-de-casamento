import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Please check your environment variables.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Tipos para os dados
export interface RSVPData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  guests: number;
  message?: string;
  attending: boolean;
  created_at?: string;
}

export interface MessageData {
  id?: string;
  name: string;
  email?: string;
  message: string; // Keep this as 'message' for frontend compatibility
  content?: string; // Add this for database compatibility
  created_at?: string;
}

export interface GiftData {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  gift_id: string;
  gift_title: string;
  gift_price: number;
  message?: string;
  created_at?: string;
}

// Tabelas no Supabase
export const TABLES = {
  RSVP: 'rsvps',
  MESSAGES: 'messages',
  GIFTS: 'gifts',
};
