-- ============================================
-- SCRIPTS SQL PARA CONFIGURAR SUPABASE
-- Aplicación: Meloofy
-- ============================================
-- 
-- INSTRUCCIONES:
-- 1. Ve a SQL Editor en tu proyecto de Supabase
-- 2. Copia y pega cada sección completa
-- 3. Ejecuta cada sección por separado
-- ============================================

-- ============================================
-- SECCIÓN 1: CREAR TABLA DE CANCIONES
-- ============================================
-- Ejecuta este script primero para crear la tabla de canciones

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

-- ============================================
-- SECCIÓN 2: POLÍTICAS DE SEGURIDAD (RLS)
-- ============================================
-- Ejecuta este script después de crear la tabla
-- Este script elimina las políticas existentes antes de crearlas

-- Eliminar políticas existentes si existen
DROP POLICY IF EXISTS "Users can view own songs" ON songs;
DROP POLICY IF EXISTS "Users can insert own songs" ON songs;
DROP POLICY IF EXISTS "Users can update own songs" ON songs;
DROP POLICY IF EXISTS "Users can delete own songs" ON songs;

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

-- ============================================
-- SECCIÓN 3: FUNCIÓN Y TRIGGER PARA updated_at
-- ============================================
-- Ejecuta este script para actualizar automáticamente updated_at

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Eliminar trigger existente si existe
DROP TRIGGER IF EXISTS update_songs_updated_at ON songs;

-- Trigger para actualizar updated_at
CREATE TRIGGER update_songs_updated_at
  BEFORE UPDATE ON songs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SECCIÓN 4: POLÍTICAS DE STORAGE
-- ============================================
-- IMPORTANTE: Primero debes crear el bucket "audio-files" en Storage
-- Luego ejecuta este script para configurar las políticas de acceso

-- Eliminar políticas existentes si existen
DROP POLICY IF EXISTS "Users can upload own audio files" ON storage.objects;
DROP POLICY IF EXISTS "Users can read own audio files" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own audio files" ON storage.objects;

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

-- ============================================
-- FIN DE LOS SCRIPTS
-- ============================================

