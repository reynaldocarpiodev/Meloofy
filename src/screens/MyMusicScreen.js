import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function MyMusicScreen({ navigation }) {
  // Datos de ejemplo de melodías generadas
  const [melodies] = useState([
    {
      id: '1',
      title: 'Melodía de Lluvia',
      originalSound: 'rain_sound.mp3',
      duration: '2:34',
      createdAt: '2024-10-20',
      genre: 'Ambient',
    },
    {
      id: '2',
      title: 'Canto de Pájaros',
      originalSound: 'birds_chirping.wav',
      duration: '1:45',
      createdAt: '2024-10-19',
      genre: 'Nature',
    },
    {
      id: '3',
      title: 'Ritmo Urbano',
      originalSound: 'city_sounds.mp3',
      duration: '3:12',
      createdAt: '2024-10-18',
      genre: 'Electronic',
    },
  ]);

  const playMelody = (melody) => {
    Alert.alert(
      'Reproducir Melodía',
      `Reproduciendo: ${melody.title}`,
      [
        { text: 'Pausar', style: 'cancel' },
        { text: 'Compartir', onPress: () => shareMelody(melody) },
      ]
    );
  };

  const shareMelody = (melody) => {
    Alert.alert('Compartir', `Compartiendo "${melody.title}" en redes sociales...`);
  };

  const deleteMelody = (melodyId) => {
    Alert.alert(
      'Eliminar Melodía',
      '¿Estás seguro de que quieres eliminar esta melodía?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => {
          Alert.alert('Eliminado', 'La melodía ha sido eliminada');
        }},
      ]
    );
  };

  const renderMelodyItem = ({ item }) => (
    <View style={styles.melodyCard}>
      <View style={styles.melodyHeader}>
        <View style={styles.melodyIcon}>
          <Ionicons name="musical-notes" size={24} color="#667eea" />
        </View>
        <View style={styles.melodyInfo}>
          <Text style={styles.melodyTitle}>{item.title}</Text>
          <Text style={styles.melodySubtitle}>De: {item.originalSound}</Text>
          <Text style={styles.melodyDetails}>
            {item.duration} • {item.genre} • {item.createdAt}
          </Text>
        </View>
      </View>
      
      <View style={styles.melodyActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => playMelody(item)}
        >
          <Ionicons name="play-circle" size={32} color="#667eea" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => shareMelody(item)}
        >
          <Ionicons name="share-outline" size={24} color="#ff6b6b" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => deleteMelody(item.id)}
        >
          <Ionicons name="trash-outline" size={24} color="#999" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Mi Música</Text>
        <Text style={styles.subtitle}>Tus melodías generadas</Text>
      </View>

      {melodies.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="musical-notes-outline" size={80} color="rgba(255, 255, 255, 0.5)" />
          <Text style={styles.emptyTitle}>No tienes melodías aún</Text>
          <Text style={styles.emptySubtitle}>
            Crea tu primera melodía subiendo un sonido
          </Text>
          <TouchableOpacity 
            style={styles.createButton}
            onPress={() => navigation.navigate('Upload')}
          >
            <Text style={styles.createButtonText}>Crear Melodía</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={melodies}
          renderItem={renderMelodyItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={() => navigation.navigate('Upload')}
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  listContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  melodyCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  melodyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  melodyIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  melodyInfo: {
    flex: 1,
  },
  melodyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  melodySubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  melodyDetails: {
    fontSize: 12,
    color: '#999',
  },
  melodyActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  actionButton: {
    padding: 10,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 30,
  },
  createButton: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ff6b6b',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});