import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
    // Animaciones para las ondas interactivas
    const wave1Anim = useRef(new Animated.Value(0)).current;
    const wave2Anim = useRef(new Animated.Value(0)).current;
    const wave3Anim = useRef(new Animated.Value(0)).current;
    
    // Partículas flotantes
    const particle1X = useRef(new Animated.Value(0)).current;
    const particle1Y = useRef(new Animated.Value(0)).current;
    const particle2X = useRef(new Animated.Value(0)).current;
    const particle2Y = useRef(new Animated.Value(0)).current;
    const particle3X = useRef(new Animated.Value(0)).current;
    const particle3Y = useRef(new Animated.Value(0)).current;
    
    // Animación continua de ondas
    useEffect(() => {
        const animateWaves = () => {
            Animated.loop(
                Animated.parallel([
                    Animated.sequence([
                        Animated.timing(wave1Anim, {
                            toValue: 1,
                            duration: 3000,
                            useNativeDriver: false,
                        }),
                        Animated.timing(wave1Anim, {
                            toValue: 0,
                            duration: 3000,
                            useNativeDriver: false,
                        }),
                    ]),
                    Animated.sequence([
                        Animated.timing(wave2Anim, {
                            toValue: 1,
                            duration: 2500,
                            useNativeDriver: false,
                        }),
                        Animated.timing(wave2Anim, {
                            toValue: 0,
                            duration: 2500,
                            useNativeDriver: false,
                        }),
                    ]),
                    Animated.sequence([
                        Animated.timing(wave3Anim, {
                            toValue: 1,
                            duration: 3500,
                            useNativeDriver: false,
                        }),
                        Animated.timing(wave3Anim, {
                            toValue: 0,
                            duration: 3500,
                            useNativeDriver: false,
                        }),
                    ]),
                ])
            ).start();
        };

        animateWaves();
    }, []);

    // Animación de partículas flotantes
    useEffect(() => {
        const animateParticles = () => {
            const createParticleAnimation = (xAnim, yAnim) => {
                return Animated.loop(
                    Animated.parallel([
                        Animated.sequence([
                            Animated.timing(xAnim, {
                                toValue: width * 0.5,
                                duration: 4000 + Math.random() * 2000,
                                useNativeDriver: false,
                            }),
                            Animated.timing(xAnim, {
                                toValue: 0,
                                duration: 4000 + Math.random() * 2000,
                                useNativeDriver: false,
                            }),
                        ]),
                        Animated.sequence([
                            Animated.timing(yAnim, {
                                toValue: height * 0.5,
                                duration: 3000 + Math.random() * 2000,
                                useNativeDriver: false,
                            }),
                            Animated.timing(yAnim, {
                                toValue: 0,
                                duration: 3000 + Math.random() * 2000,
                                useNativeDriver: false,
                            }),
                        ]),
                    ])
                );
            };

            createParticleAnimation(particle1X, particle1Y).start();
            createParticleAnimation(particle2X, particle2Y).start();
            createParticleAnimation(particle3X, particle3Y).start();
        };

        animateParticles();
    }, []);

    return (
        <View style={styles.container}>
            {/* Gradiente principal */}
            <LinearGradient
                colors={['#1a1a2e', '#16213e', '#0f3460']}
                style={StyleSheet.absoluteFillObject}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            />

            {/* Ondas interactivas */}
            <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
                {/* Onda 1 */}
                <Animated.View
                    style={[
                        styles.wave,
                        {
                            bottom: wave1Anim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-50, 50],
                            }),
                            opacity: wave1Anim.interpolate({
                                inputRange: [0, 0.5, 1],
                                outputRange: [0.3, 0.6, 0.3],
                            }),
                        },
                    ]}
                >
                    <View style={[styles.waveContent, { backgroundColor: 'rgba(255,255,255,0.1)' }]} />
                </Animated.View>

                {/* Onda 2 */}
                <Animated.View
                    style={[
                        styles.wave,
                        {
                            bottom: wave2Anim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-80, 80],
                            }),
                            opacity: wave2Anim.interpolate({
                                inputRange: [0, 0.5, 1],
                                outputRange: [0.2, 0.5, 0.2],
                            }),
                        },
                    ]}
                >
                    <View style={[styles.waveContent, { backgroundColor: 'rgba(255,255,255,0.15)' }]} />
                </Animated.View>

                {/* Onda 3 */}
                <Animated.View
                    style={[
                        styles.wave,
                        {
                            bottom: wave3Anim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-100, 100],
                            }),
                            opacity: wave3Anim.interpolate({
                                inputRange: [0, 0.5, 1],
                                outputRange: [0.1, 0.4, 0.1],
                            }),
                        },
                    ]}
                >
                    <View style={[styles.waveContent, { backgroundColor: 'rgba(255,255,255,0.1)' }]} />
                </Animated.View>
            </View>

            {/* Partículas flotantes */}
            <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
                <Animated.View
                    style={[
                        styles.particle,
                        {
                            backgroundColor: '#FFD700',
                            width: 60,
                            height: 60,
                            left: particle1X,
                            top: particle1Y,
                        },
                    ]}
                />
                <Animated.View
                    style={[
                        styles.particle,
                        {
                            backgroundColor: '#FF6B6B',
                            width: 40,
                            height: 40,
                            left: particle2X,
                            top: particle2Y,
                        },
                    ]}
                />
                <Animated.View
                    style={[
                        styles.particle,
                        {
                            backgroundColor: '#4ECDC4',
                            width: 50,
                            height: 50,
                            left: particle3X,
                            top: particle3Y,
                        },
                    ]}
                />
            </View>

            {/* Contenido principal */}
            <View style={styles.contentContainer}>
                {/* Header con icono de usuario */}
                <View style={styles.topHeader}>
                    <View style={styles.headerContent}>
                        <Text style={styles.headerTitle}>Meloofy</Text>
                        <TouchableOpacity
                            style={styles.userIconButton}
                            onPress={() => navigation.navigate('Profile')}
                        >
                            <View style={styles.userIcon}>
                                <Ionicons name="person" size={20} color="#1DB954" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.header}>
                    <Text style={styles.title}>Transforma sonidos</Text>
                    <Text style={styles.subtitle}>Crea melodías únicas con nuestra IA</Text>
                </View>

                <View style={styles.content}>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>¡Bienvenido a Meloofy!</Text>
                        <Text style={styles.cardText}>
                            Sube cualquier sonido y nuestra IA lo convertirá en una hermosa melodía musical.
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={() => navigation.navigate('Upload')}
                    >
                        <Text style={styles.buttonText}>Crear Melodía</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => navigation.navigate('MyMusic')}
                    >
                        <Text style={styles.secondaryButtonText}>Mi Música</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: 'hidden',
    },
    contentContainer: {
        flex: 1,
    },
    topHeader: {
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: -0.5,
    },
    userIconButton: {
        padding: 5,
    },
    userIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(29, 185, 84, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'rgba(29, 185, 84, 0.3)',
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 10,
        letterSpacing: -1,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
    },
    content: {
        flex: 2,
        paddingHorizontal: 30,
        justifyContent: 'center',
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 20,
        padding: 25,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 15,
        textAlign: 'center',
    },
    cardText: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'center',
        lineHeight: 24,
    },
    primaryButton: {
        backgroundColor: '#1DB954',
        paddingVertical: 18,
        borderRadius: 12,
        marginBottom: 15,
        shadowColor: '#1DB954',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        paddingVertical: 18,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    secondaryButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    wave: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 150,
    },
    waveContent: {
        flex: 1,
        borderRadius: 200,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    particle: {
        position: 'absolute',
        borderRadius: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },
});