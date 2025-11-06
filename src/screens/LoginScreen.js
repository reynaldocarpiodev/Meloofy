import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { authService } from '../services/authService';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Error', 'Por favor ingresa un correo electrónico válido');
            return;
        }

        setLoading(true);

        try {
            if (isLogin) {
                // Iniciar sesión
                const { user, error } = await authService.signIn(email, password);
                
                if (error) {
                    Alert.alert('Error', error.message || 'Error al iniciar sesión');
                    setLoading(false);
                    return;
                }

                if (user) {
                    Alert.alert('Éxito', 'Sesión iniciada correctamente', [
                        { text: 'OK', onPress: () => navigation.navigate('Home') }
                    ]);
                }
            } else {
                // Registrar nuevo usuario
                if (password !== confirmPassword) {
                    Alert.alert('Error', 'Las contraseñas no coinciden');
                    setLoading(false);
                    return;
                }

                if (password.length < 6) {
                    Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
                    setLoading(false);
                    return;
                }

                const { user, error } = await authService.signUp(email, password);
                
                if (error) {
                    Alert.alert('Error', error.message || 'Error al crear la cuenta');
                    setLoading(false);
                    return;
                }

                if (user) {
                    Alert.alert(
                        'Cuenta creada',
                        'Tu cuenta ha sido creada exitosamente. Por favor, verifica tu correo electrónico.',
                        [
                            { 
                                text: 'OK', 
                                onPress: () => {
                                    setIsLogin(true);
                                    setPassword('');
                                    setConfirmPassword('');
                                }
                            }
                        ]
                    );
                }
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error inesperado. Por favor, intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        // Aquí iría la lógica de Google Sign-In
        Alert.alert('Info', 'Funcionalidad de Google en desarrollo');
    };

    const handleSpotifyLogin = () => {
        // Aquí iría la lógica de Spotify OAuth
        Alert.alert('Info', 'Funcionalidad de Spotify en desarrollo');
    };

    const handleGuestMode = () => {
        navigation.navigate('Home');
    };

    return (
        <LinearGradient
            colors={['#1a1a2e', '#16213e', '#0f3460']}
            style={styles.container}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardView}
                >
                    {/* Logo y Título */}
                    <View style={styles.header}>
                        <View style={styles.logoContainer}>
                            <Ionicons name="musical-notes" size={60} color="#1DB954" />
                        </View>
                        <Text style={styles.title}>Meloofy</Text>
                        <Text style={styles.subtitle}>Transforma sonidos en melodías</Text>
                    </View>

                    {/* Formulario de Login/Registro */}
                    <View style={styles.formContainer}>
                        <Text style={styles.formTitle}>
                            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                        </Text>

                        <View style={styles.inputContainer}>
                            <Ionicons name="mail-outline" size={20} color="#888" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Correo electrónico"
                                placeholderTextColor="#666"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Contraseña"
                                placeholderTextColor="#666"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.eyeIcon}
                            >
                                <Ionicons
                                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                                    size={20}
                                    color="#888"
                                />
                            </TouchableOpacity>
                        </View>

                        {!isLogin && (
                            <View style={styles.inputContainer}>
                                <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Confirmar contraseña"
                                    placeholderTextColor="#666"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry={!showPassword}
                                />
                            </View>
                        )}

                        <TouchableOpacity 
                            style={[styles.primaryButton, loading && styles.primaryButtonDisabled]} 
                            onPress={handleLogin}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.primaryButtonText}>
                                    {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                                </Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.divider}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>o</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        {/* Botones de OAuth */}
                        <TouchableOpacity style={styles.oauthButton} onPress={handleGoogleLogin}>
                            <Ionicons name="logo-google" size={24} color="#4285F4" />
                            <Text style={styles.oauthButtonText}>Continuar con Google</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.oauthButton, styles.spotifyButton]} onPress={handleSpotifyLogin}>
                            <Ionicons name="logo-spotify" size={24} color="#1DB954" />
                            <Text style={[styles.oauthButtonText, styles.spotifyButtonText]}>
                                Continuar con Spotify
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.switchButton}
                            onPress={() => setIsLogin(!isLogin)}
                        >
                            <Text style={styles.switchButtonText}>
                                {isLogin
                                    ? '¿No tienes cuenta? Crear cuenta'
                                    : '¿Ya tienes cuenta? Iniciar sesión'}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.guestButton} onPress={handleGuestMode}>
                            <Text style={styles.guestButtonText}>Explorar como invitado</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
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
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    keyboardView: {
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(29, 185, 84, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
        letterSpacing: -1,
    },
    subtitle: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
    },
    formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 20,
        padding: 25,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    formTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 25,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        marginBottom: 15,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        color: '#fff',
        fontSize: 16,
    },
    eyeIcon: {
        padding: 5,
    },
    primaryButton: {
        backgroundColor: '#1DB954',
        paddingVertical: 16,
        borderRadius: 12,
        marginTop: 10,
        marginBottom: 20,
        shadowColor: '#1DB954',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    dividerText: {
        color: '#888',
        marginHorizontal: 15,
        fontSize: 14,
    },
    oauthButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingVertical: 14,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    spotifyButton: {
        backgroundColor: 'rgba(29, 185, 84, 0.1)',
        borderColor: 'rgba(29, 185, 84, 0.3)',
    },
    oauthButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10,
    },
    spotifyButtonText: {
        color: '#1DB954',
    },
    switchButton: {
        marginTop: 20,
        marginBottom: 10,
    },
    switchButtonText: {
        color: '#888',
        textAlign: 'center',
        fontSize: 14,
    },
    guestButton: {
        marginTop: 10,
        paddingVertical: 12,
    },
    guestButtonText: {
        color: '#888',
        textAlign: 'center',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    primaryButtonDisabled: {
        opacity: 0.6,
    },
});

