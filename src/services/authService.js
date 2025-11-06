import { supabase } from '../config/supabase';

/**
 * Servicio de autenticación con Supabase
 */
export const authService = {
  /**
   * Registra un nuevo usuario
   * @param {string} email - Correo electrónico del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Promise<{user: object|null, error: Error|null}>}
   */
  async signUp(email, password) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      return { user: data.user, error: null };
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return { user: null, error };
    }
  },

  /**
   * Inicia sesión con email y contraseña
   * @param {string} email - Correo electrónico del usuario
   * @param {string} password - Contraseña del usuario
   * @returns {Promise<{user: object|null, error: Error|null}>}
   */
  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return { user: data.user, error: null };
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      return { user: null, error };
    }
  },

  /**
   * Cierra la sesión del usuario actual
   * @returns {Promise<{error: Error|null}>}
   */
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      return { error };
    }
  },

  /**
   * Obtiene el usuario actual
   * @returns {Promise<{user: object|null, error: Error|null}>}
   */
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return { user, error: null };
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      return { user: null, error };
    }
  },

  /**
   * Obtiene la sesión actual
   * @returns {Promise<{session: object|null, error: Error|null}>}
   */
  async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return { session, error: null };
    } catch (error) {
      console.error('Error al obtener sesión:', error);
      return { session: null, error };
    }
  },

  /**
   * Escucha cambios en el estado de autenticación
   * @param {Function} callback - Función que se ejecuta cuando cambia el estado
   * @returns {Function} Función para cancelar la suscripción
   */
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });
  },

  /**
   * Envía un email para restablecer la contraseña
   * @param {string} email - Correo electrónico del usuario
   * @returns {Promise<{error: Error|null}>}
   */
  async resetPassword(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'meloofy://reset-password',
      });
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Error al enviar email de restablecimiento:', error);
      return { error };
    }
  },
};

