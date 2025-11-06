import { supabase } from '../config/supabase';

/**
 * Servicio para manejar canciones y pistas musicales
 */
export const musicService = {
  /**
   * Obtiene todas las canciones del usuario actual
   * @param {string} userId - ID del usuario
   * @returns {Promise<{songs: Array, error: Error|null}>}
   */
  async getUserSongs(userId) {
    try {
      const { data, error } = await supabase
        .from('songs')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { songs: data || [], error: null };
    } catch (error) {
      console.error('Error al obtener canciones:', error);
      return { songs: [], error };
    }
  },

  /**
   * Crea una nueva canción
   * @param {Object} songData - Datos de la canción
   * @param {string} songData.user_id - ID del usuario
   * @param {string} songData.title - Título de la canción
   * @param {string} songData.audio_url - URL del archivo de audio
   * @param {string} songData.original_file_name - Nombre original del archivo
   * @param {number} songData.duration - Duración en segundos (opcional)
   * @returns {Promise<{song: object|null, error: Error|null}>}
   */
  async createSong(songData) {
    try {
      const { data, error } = await supabase
        .from('songs')
        .insert([songData])
        .select()
        .single();

      if (error) throw error;

      return { song: data, error: null };
    } catch (error) {
      console.error('Error al crear canción:', error);
      return { song: null, error };
    }
  },

  /**
   * Actualiza una canción existente
   * @param {string} songId - ID de la canción
   * @param {Object} updates - Campos a actualizar
   * @returns {Promise<{song: object|null, error: Error|null}>}
   */
  async updateSong(songId, updates) {
    try {
      const { data, error } = await supabase
        .from('songs')
        .update(updates)
        .eq('id', songId)
        .select()
        .single();

      if (error) throw error;

      return { song: data, error: null };
    } catch (error) {
      console.error('Error al actualizar canción:', error);
      return { song: null, error };
    }
  },

  /**
   * Elimina una canción
   * @param {string} songId - ID de la canción
   * @returns {Promise<{error: Error|null}>}
   */
  async deleteSong(songId) {
    try {
      const { error } = await supabase
        .from('songs')
        .delete()
        .eq('id', songId);

      if (error) throw error;

      return { error: null };
    } catch (error) {
      console.error('Error al eliminar canción:', error);
      return { error };
    }
  },

  /**
   * Sube un archivo de audio a Supabase Storage
   * @param {string} filePath - Ruta local del archivo
   * @param {string} fileName - Nombre del archivo
   * @param {string} userId - ID del usuario
   * @returns {Promise<{url: string|null, error: Error|null}>}
   */
  async uploadAudioFile(filePath, fileName, userId) {
    try {
      // Leer el archivo como blob
      const file = await fetch(filePath).then((res) => res.blob());

      // Subir a Supabase Storage
      const fileExt = fileName.split('.').pop();
      const filePathStorage = `${userId}/${Date.now()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('audio-files')
        .upload(filePathStorage, file, {
          contentType: `audio/${fileExt}`,
          upsert: false,
        });

      if (error) throw error;

      // Obtener la URL pública
      const { data: urlData } = supabase.storage
        .from('audio-files')
        .getPublicUrl(data.path);

      return { url: urlData.publicUrl, error: null };
    } catch (error) {
      console.error('Error al subir archivo de audio:', error);
      return { url: null, error };
    }
  },

  /**
   * Elimina un archivo de audio de Supabase Storage
   * @param {string} filePath - Ruta del archivo en storage
   * @returns {Promise<{error: Error|null}>}
   */
  async deleteAudioFile(filePath) {
    try {
      const { error } = await supabase.storage
        .from('audio-files')
        .remove([filePath]);

      if (error) throw error;

      return { error: null };
    } catch (error) {
      console.error('Error al eliminar archivo de audio:', error);
      return { error };
    }
  },
};

