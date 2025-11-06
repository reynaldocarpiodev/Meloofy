# Configuración de Supabase para Meloofy

Esta guía te ayudará a configurar Supabase como base de datos para tu aplicación Meloofy.

## 📋 Pasos para Configurar Supabase

### 1. Crear una cuenta en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Espera a que se complete la configuración (puede tomar unos minutos)

### 2. Obtener las credenciales de API

1. En tu proyecto de Supabase, ve a **Settings** (Configuración) → **API**
2. Encontrarás dos valores importantes:
   - **Project URL**: Tu URL de Supabase (ejemplo: `https://xxxxx.supabase.co`)
   - **anon public key**: Tu clave pública anónima

### 3. Configurar el archivo .env

1. Abre el archivo `.env` en la raíz del proyecto
2. Agrega las siguientes variables con tus valores de Supabase:

```env
EXPO_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_aqui
```

**⚠️ IMPORTANTE**: 
- Reemplaza `https://tu-proyecto.supabase.co` con tu Project URL real
- Reemplaza `tu_clave_anonima_aqui` con tu anon public key real
- No compartas estas credenciales públicamente
- El archivo `.env` ya está en `.gitignore` para proteger tus credenciales

### 4. Crear las tablas en Supabase

Ve a **SQL Editor** en tu proyecto de Supabase y ejecuta los siguientes comandos SQL:

#### Tabla de usuarios (ya existe por defecto con Auth)
La tabla `auth.users` se crea automáticamente cuando usas la autenticación de Supabase.

#### Tabla de canciones/pistas

```sql
-- Crear tabla de canciones
CREATE TABLE IF NOT EXISTS songs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  audio_url TEXT NOT NULL,
  original_file_name VARCHAR(255),
  duration INTEGER, -- Duración en segundos
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Crear índice para búsquedas rápidas por usuario
CREATE INDEX IF NOT EXISTS idx_songs_user_id ON songs(user_id);

-- Crear índice para ordenar por fecha de creación
CREATE INDEX IF NOT EXISTS idx_songs_created_at ON songs(created_at DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE songs ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios solo pueden ver sus propias canciones
CREATE POLICY "Users can view own songs"
  ON songs FOR SELECT
  USING (auth.uid() = user_id);

-- Política: Los usuarios solo pueden insertar sus propias canciones
CREATE POLICY "Users can insert own songs"
  ON songs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Política: Los usuarios solo pueden actualizar sus propias canciones
CREATE POLICY "Users can update own songs"
  ON songs FOR UPDATE
  USING (auth.uid() = user_id);

-- Política: Los usuarios solo pueden eliminar sus propias canciones
CREATE POLICY "Users can delete own songs"
  ON songs FOR DELETE
  USING (auth.uid() = user_id);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
CREATE TRIGGER update_songs_updated_at
  BEFORE UPDATE ON songs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### 5. Configurar Storage para archivos de audio

1. Ve a **Storage** en tu proyecto de Supabase
2. Crea un nuevo bucket llamado `audio-files`
3. Configura las políticas de acceso:

```sql
-- Política para permitir que los usuarios suban sus propios archivos
CREATE POLICY "Users can upload own audio files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'audio-files' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Política para permitir que los usuarios lean sus propios archivos
CREATE POLICY "Users can read own audio files"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'audio-files' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Política para permitir que los usuarios eliminen sus propios archivos
CREATE POLICY "Users can delete own audio files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'audio-files' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

### 6. Configurar autenticación por email

1. Ve a **Authentication** → **Providers** en tu proyecto de Supabase
2. Asegúrate de que **Email** esté habilitado
3. (Opcional) Configura la URL de redirección para confirmación de email:
   - Ve a **Authentication** → **URL Configuration**
   - Agrega tu URL de redirección (ejemplo: `meloofy://reset-password`)

### 7. Verificar la configuración

1. Reinicia tu servidor de desarrollo de Expo:
   ```bash
   npm start
   ```
2. Prueba crear una cuenta desde la app
3. Verifica que puedas iniciar sesión

## 🔒 Seguridad

- **Row Level Security (RLS)**: Las políticas RLS aseguran que los usuarios solo puedan acceder a sus propios datos
- **Storage Policies**: Las políticas de storage aseguran que los usuarios solo puedan subir/leer/eliminar sus propios archivos
- **Variables de entorno**: Nunca commitees el archivo `.env` con credenciales reales

## 📚 Recursos Adicionales

- [Documentación de Supabase](https://supabase.com/docs)
- [Guía de Autenticación](https://supabase.com/docs/guides/auth)
- [Guía de Storage](https://supabase.com/docs/guides/storage)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## 🐛 Solución de Problemas

### Error: "Faltan las variables de entorno de Supabase"
- Verifica que el archivo `.env` existe en la raíz del proyecto
- Verifica que las variables tienen los nombres correctos: `EXPO_PUBLIC_SUPABASE_URL` y `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- Reinicia el servidor de desarrollo después de crear/modificar el archivo `.env`

### Error: "Invalid API key"
- Verifica que copiaste correctamente la clave anónima desde Supabase
- Asegúrate de no tener espacios extra al inicio o final de las variables

### Error al crear cuenta: "Email already registered"
- El email ya está registrado. Intenta iniciar sesión en su lugar.

### Error al subir archivos: "new row violates row-level security policy"
- Verifica que las políticas RLS están correctamente configuradas
- Asegúrate de que el usuario está autenticado antes de intentar subir archivos

