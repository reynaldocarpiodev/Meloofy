import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Obtener las variables de entorno
// En Expo, las variables con prefijo EXPO_PUBLIC_ están disponibles en process.env
// Nota: Asegúrate de tener un archivo .env en la raíz del proyecto con estas variables
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Validar que las variables de entorno estén configuradas
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '❌ ERROR: Faltan las variables de entorno de Supabase.\n' +
    'Por favor, crea un archivo .env en la raíz del proyecto con:\n' +
    'EXPO_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co\n' +
    'EXPO_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima\n\n' +
    'Luego reinicia el servidor de Expo con: npm start -- --clear'
  );
}

// Crear el cliente de Supabase
// Si las variables no están configuradas, lanzará un error más claro
export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || '',
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

