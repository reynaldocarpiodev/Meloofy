import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
    // Datos de ejemplo del usuario
    const userData = {
        name: 'Juan Pérez',
        email: 'juan.perez@example.com',
        joinDate: 'Enero 2024',
    };

    const recentRecordings = [
        {
            id: 1,
            title: 'Grabación del Parque',
            duration: '2:45',
            date: 'Hace 2 días',
            waveform: [20, 40, 30, 50, 35, 45, 25],
        },
        {
            id: 2,
            title: 'Sonidos de la Playa',
            duration: '5:12',
            date: 'Hace 1 semana',
            waveform: [30, 50, 40, 60, 45, 55, 35],
        },
        {
            id: 3,
            title: 'Melodía del Bosque',
            duration: '3:28',
            date: 'Hace 2 semanas',
            waveform: [25, 45, 35, 55, 40, 50, 30],
        },
    ];

    const renderWaveform = (waveform) => {
        return (
            <View style={styles.waveformContainer}>
                {waveform.map((height, index) => (
                    <View
                        key={index}
                        style={[
                            styles.waveformBar,
                            {
                                height: height,
                            },
                        ]}
                    />
                ))}
            </View>
        );
    };

    return (
        <LinearGradient
            colors={['#1a1a2e', '#16213e', '#0f3460']}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Perfil</Text>
                    <View style={styles.placeholder} />
                </View>

                {/* Avatar y Info del Usuario */}
                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Ionicons name="person" size={50} color="#1DB954" />
                        </View>
                        <View style={styles.avatarRing} />
                    </View>
                    <Text style={styles.userName}>{userData.name}</Text>
                    <Text style={styles.userEmail}>{userData.email}</Text>
                    <Text style={styles.joinDate}>Miembro desde {userData.joinDate}</Text>
                </View>

                {/* Estadísticas */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{recentRecordings.length}</Text>
                        <Text style={styles.statLabel}>Grabaciones</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>12</Text>
                        <Text style={styles.statLabel}>Melodías</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>234</Text>
                        <Text style={styles.statLabel}>Minutos</Text>
                    </View>
                </View>

                {/* Últimas Grabaciones */}
                <View style={styles.recordingsSection}>
                    <Text style={styles.sectionTitle}>Últimas Grabaciones</Text>
                    {recentRecordings.map((recording) => (
                        <TouchableOpacity
                            key={recording.id}
                            style={styles.recordingCard}
                        >
                            <View style={styles.recordingInfo}>
                                <Text style={styles.recordingTitle}>{recording.title}</Text>
                                <Text style={styles.recordingMeta}>
                                    {recording.date} • {recording.duration}
                                </Text>
                            </View>
                            {renderWaveform(recording.waveform)}
                            <TouchableOpacity style={styles.playButton}>
                                <Ionicons name="play" size={24} color="#1DB954" />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Configuración */}
                <View style={styles.settingsSection}>
                    <TouchableOpacity style={styles.settingsItem}>
                        <Ionicons name="settings-outline" size={24} color="#fff" />
                        <Text style={styles.settingsText}>Configuración</Text>
                        <Ionicons name="chevron-forward" size={24} color="#888" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingsItem}>
                        <Ionicons name="help-circle-outline" size={24} color="#fff" />
                        <Text style={styles.settingsText}>Ayuda</Text>
                        <Ionicons name="chevron-forward" size={24} color="#888" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.settingsItem}>
                        <Ionicons name="log-out-outline" size={24} color="#ff4444" />
                        <Text style={[styles.settingsText, styles.logoutText]}>Cerrar Sesión</Text>
                        <Ionicons name="chevron-forward" size={24} color="#888" />
                    </TouchableOpacity>
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
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    placeholder: {
        width: 34,
    },
    profileSection: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(29, 185, 84, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: 'rgba(29, 185, 84, 0.3)',
    },
    avatarRing: {
        position: 'absolute',
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 2,
        borderColor: 'rgba(29, 185, 84, 0.1)',
        top: -5,
        left: -5,
    },
    userName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    userEmail: {
        fontSize: 16,
        color: '#888',
        marginBottom: 5,
    },
    joinDate: {
        fontSize: 14,
        color: '#666',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        marginHorizontal: 20,
        borderRadius: 15,
        paddingVertical: 20,
        marginBottom: 30,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1DB954',
        marginBottom: 5,
    },
    statLabel: {
        fontSize: 14,
        color: '#888',
    },
    statDivider: {
        width: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    recordingsSection: {
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 15,
    },
    recordingCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    recordingInfo: {
        flex: 1,
        marginRight: 10,
    },
    recordingTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 5,
    },
    recordingMeta: {
        fontSize: 13,
        color: '#888',
    },
    waveformContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        marginRight: 10,
    },
    waveformBar: {
        width: 3,
        backgroundColor: '#1DB954',
        marginHorizontal: 1,
        borderRadius: 2,
    },
    playButton: {
        padding: 8,
    },
    settingsSection: {
        paddingHorizontal: 20,
    },
    settingsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        padding: 15,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    settingsText: {
        flex: 1,
        fontSize: 16,
        color: '#fff',
        marginLeft: 15,
    },
    logoutText: {
        color: '#ff4444',
    },
});

