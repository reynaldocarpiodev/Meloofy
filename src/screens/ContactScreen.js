import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function ContactScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const sendMessage = () => {
    if (!formData.name || !formData.email || !formData.message) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    Alert.alert(
      'Mensaje Enviado',
      'Gracias por contactarnos. Te responderemos pronto.',
      [{ text: 'OK', onPress: () => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      }}]
    );
  };

  const openSocialMedia = (platform) => {
    const urls = {
      instagram: 'https://instagram.com/meloofy',
      twitter: 'https://twitter.com/meloofy',
      facebook: 'https://facebook.com/meloofy',
      youtube: 'https://youtube.com/meloofy',
    };
    
    Linking.openURL(urls[platform]).catch(() => {
      Alert.alert('Error', 'No se pudo abrir el enlace');
    });
  };

  const sendEmail = () => {
    Linking.openURL('mailto:support@meloofy.com').catch(() => {
      Alert.alert('Error', 'No se pudo abrir el cliente de correo');
    });
  };

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Contacto</Text>
          <Text style={styles.subtitle}>¿Tienes preguntas? Estamos aquí para ayudarte</Text>
        </View>

        <View style={styles.contactInfo}>
          <View style={styles.infoCard}>
            <Ionicons name="mail-outline" size={24} color="#667eea" />
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>Email</Text>
              <TouchableOpacity onPress={sendEmail}>
                <Text style={styles.infoValue}>support@meloofy.com</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="time-outline" size={24} color="#667eea" />
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>Horario de Atención</Text>
              <Text style={styles.infoValue}>Lun - Vie: 9:00 AM - 6:00 PM</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <Ionicons name="location-outline" size={24} color="#667eea" />
            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>Ubicación</Text>
              <Text style={styles.infoValue}>Ciudad de México, México</Text>
            </View>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Envíanos un Mensaje</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Nombre *"
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            placeholder="Email *"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            placeholder="Asunto"
            value={formData.subject}
            onChangeText={(value) => handleInputChange('subject', value)}
            placeholderTextColor="#999"
          />

          <TextInput
            style={[styles.input, styles.messageInput]}
            placeholder="Mensaje *"
            value={formData.message}
            onChangeText={(value) => handleInputChange('message', value)}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor="#999"
          />

          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Enviar Mensaje</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.socialSection}>
          <Text style={styles.socialTitle}>Síguenos en Redes Sociales</Text>
          <View style={styles.socialButtons}>
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => openSocialMedia('instagram')}
            >
              <Ionicons name="logo-instagram" size={28} color="white" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => openSocialMedia('twitter')}
            >
              <Ionicons name="logo-twitter" size={28} color="white" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => openSocialMedia('facebook')}
            >
              <Ionicons name="logo-facebook" size={28} color="white" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => openSocialMedia('youtube')}
            >
              <Ionicons name="logo-youtube" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Meloofy v1.0.0</Text>
          <Text style={styles.footerText}>© 2024 Meloofy. Todos los derechos reservados.</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  contactInfo: {
    marginBottom: 30,
  },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 15,
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 14,
    color: '#666',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 25,
    marginBottom: 30,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 18,
    borderRadius: 30,
    marginTop: 10,
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  socialSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  socialTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginBottom: 5,
  },
});