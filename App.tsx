import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider, MD3DarkTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import WelcomeScreen from '@/screens/WelcomeScreen';
import AuthScreen from '@/screens/AuthScreen';
import HomeScreen from '@/screens/HomeScreen';
import MixerScreen from '@/screens/MixerScreen';
import { AuthProvider } from '@/context/AuthContext';

export type RootStackParamList = {
  Welcome: undefined;
  Auth: undefined;
  Home: undefined;
  Mixer: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider theme={MD3DarkTheme}>
        <NavigationContainer theme={navigationTheme}>
          <StatusBar style="light" />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Mixer" component={MixerScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
}
