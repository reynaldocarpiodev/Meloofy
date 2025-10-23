import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/App';
import { useAuth } from '@/context/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

const AuthScreen: React.FC<Props> = ({ navigation }) => {
  const { signInWithEmail, signUpWithEmail, user } = useAuth();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [mode, setMode] = React.useState<'login' | 'register'>('login');

  React.useEffect(() => {
    if (user) {
      navigation.replace('Home');
    }
  }, [user]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (mode === 'login') {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={{ marginBottom: 12 }}>Accede a Meloofy</Text>
      <TextInput label="Email" value={email} onChangeText={setEmail} autoCapitalize='none' keyboardType='email-address' style={{ width: '100%', marginBottom: 8 }} />
      <TextInput label="Contraseña" value={password} onChangeText={setPassword} secureTextEntry style={{ width: '100%', marginBottom: 16 }} />
      <Button mode="contained" onPress={handleSubmit} loading={loading} style={{ marginBottom: 8 }}>
        {mode === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
      </Button>
      <Button onPress={() => setMode(mode === 'login' ? 'register' : 'login')}>
        {mode === 'login' ? 'Crear cuenta' : 'Ya tengo cuenta'}
      </Button>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
});


