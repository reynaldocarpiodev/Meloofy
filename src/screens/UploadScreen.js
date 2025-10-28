import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

export default function UploadScreen({ navigation }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sound, setSound] = useState();

  const pickAudioFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled) {
        setSelectedFile(result.assets[0]);
        Alert.alert('Éxito', 'Archivo de audio seleccionado correctamente');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo seleccionar el archivo');
    }
  };

  const playPreview = async () => {
    if (!selectedFile) return;

    try {
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: selectedFile.uri }
      );
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      Alert.alert('Error', 'No se pudo reproducir el archivo');
    }
  };

  const processAudio = async () => {
    if (!selectedFile) {
      Alert.alert('Error', 'Por favor selecciona un archivo de audio primero');
      return;
    }

    setIsProcessing(true);
    
    // Simulamos el procesamiento de IA
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert(
        'Melodía Creada',
        '¡Tu melodía ha sido generada exitosamente!',
        [
          {
            text: 'Ver en Mi Música',
            onPress: () => navigation.navigate('MyMusic')
          },
          {
            text: 'Crear Otra',
            onPress: () => {
              setSelectedFile(null);
              if (sound) {
                sound.unloadAsync();
              }
            }
          }
        ]
      );
    }, 3000);
  };

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Subir Audio</Text>
          <Text style={styles.subtitle}>Selecciona un archivo de audio para crear tu melodía</Text>
        </View>

        <View style={styles.uploadSection}>
          <TouchableOpacity style={styles.uploadButton} onPress={pickAudioFile}>
            <Ionicons name="cloud-upload-outline" size={60} color="#667eea" />
            <Text style={styles.uploadText}>
              {selectedFile ? 'Cambiar Archivo' : 'Seleccionar Audio'}
            </Text>
          </TouchableOpacity>

          {selectedFile && (
            <View style={styles.fileInfo}>
              <Text style={styles.fileName}>{selectedFile.name}</Text>
              <Text style={styles.fileSize}>
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </Text>
              
              <TouchableOpacity style={styles.previewButton} onPress={playPreview}>
                <Ionicons name="play-circle-outline" size={24} color="white" />
                <Text style={styles.previewText}>Reproducir</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.instructions}>
          <Text style={styles.instructionsTitle}>Instrucciones:</Text>
          <Text style={styles.instructionsText}>
            • Formatos soportados: MP3, WAV, M4A{'\n'}
            • Tamaño máximo: 50MB{'\n'}
            • Duración recomendada: 10-60 segundos{'\n'}
            • Mejor calidad con sonidos claros y definidos
          </Text>
        </View>

        <TouchableOpacity 
          style={[styles.processButton, (!selectedFile || isProcessing) && styles.disabledButton]}
          onPress={processAudio}
          disabled={!selectedFile || isProcessing}
        >
          <Text style={styles.processButtonText}>
            {isProcessing ? 'Procesando...' : 'Crear Melodía'}
          </Text>
        </TouchableOpacity>
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
  uploadSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  uploadButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    width: '100%',
  },
  uploadText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#667eea',
    marginTop: 15,
  },
  fileInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  fileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  fileSize: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  previewButton: {
    backgroundColor: '#667eea',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  previewText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  instructions: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  instructionsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  processButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 18,
    borderRadius: 30,
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  disabledButton: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  processButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});