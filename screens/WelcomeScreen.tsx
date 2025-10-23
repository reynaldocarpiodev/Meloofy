import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/App';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <LinearGradient colors={["#0f0c29", "#302b63", "#24243e"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text variant="headlineLarge" style={styles.title}>Meloofy</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>Crea música con tus propios sonidos</Text>
        <Button mode="contained" onPress={() => navigation.navigate('Auth')} style={styles.btn}>
          Empezar
        </Button>
      </View>
    </LinearGradient>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { color: 'white', marginBottom: 8, fontWeight: 'bold' },
  subtitle: { color: 'white', opacity: 0.8, marginBottom: 24 },
  btn: { alignSelf: 'center' },
});


