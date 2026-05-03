import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useApp } from '../context/AppContext';
import { colors } from '../styles/colors';

export default function RoleSelectionScreen({ navigation, route }) {
  const { setUser } = useApp();

  const handleSelectRole = (role) => {
    if (role === 'guest') {
      setUser({
        id: 'guest',
        name: 'Guest User',
        email: 'guest@notehub.com',
        role: 'guest',
      });
      navigation.reset({ index: 0, routes: [{ name: 'GuestApp' }] });
    } else {
      route.params.onSelectRole(role);
      navigation.navigate('Login', { role });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoSmall}>
          <Text style={styles.logoText}>NH</Text>
        </View>
        <Text style={styles.title}>Welcome to NoteHub</Text>
        <Text style={styles.subtitle}>Choose how you want to continue</Text>
      </View>

      <View style={styles.cardsContainer}>
        <TouchableOpacity
          style={[styles.card, styles.cardGuest]}
          onPress={() => handleSelectRole('guest')}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Continue as Guest</Text>
            <Text style={styles.cardDescription}>Browse notes without signing in</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.cardUser]}
          onPress={() => handleSelectRole('user')}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>User Login</Text>
            <Text style={styles.cardDescription}>Upload and share your notes</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, styles.cardAdmin]}
          onPress={() => handleSelectRole('admin')}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardTitleLight}>Admin Login</Text>
            <Text style={styles.cardDescriptionLight}>Manage and approve notes</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>By continuing, you agree to our Terms & Privacy Policy</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  logoSmall: {
    width: 80,
    height: 80,
    backgroundColor: colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textLight,
  },
  cardsContainer: {
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 40,
  },
  card: {
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: colors.border,
  },
  cardGuest: {
    backgroundColor: colors.background,
  },
  cardUser: {
    backgroundColor: colors.background,
  },
  cardAdmin: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  cardContent: {
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  cardTitleLight: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.background,
  },
  cardDescription: {
    fontSize: 12,
    color: colors.textLight,
  },
  cardDescriptionLight: {
    fontSize: 12,
    color: '#E0D7FF',
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: colors.textLight,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});