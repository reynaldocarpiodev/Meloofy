import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl as string;
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey as string;

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn('Supabase env no configuradas. Define SUPABASE_URL y SUPABASE_ANON_KEY en app.json -> extra o via .env');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

export type Tables = {
  users: unknown;
  sounds: {
    id: string;
    name: string;
    url: string;
    duration: number | null;
    user_id: string;
    created_at: string;
  };
  mixes: {
    id: string;
    name: string;
    sounds: string[]; // array de sound ids
    user_id: string;
    created_at: string;
  };
};

