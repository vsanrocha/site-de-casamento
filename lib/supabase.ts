import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

// Tabelas no Supabase
export const TABLES = {
  RSVP: 'rsvps',
  MESSAGES: 'messages',
  GIFTS: 'gifts',
};
