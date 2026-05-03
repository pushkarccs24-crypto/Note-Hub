import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { colors } from '../styles/colors';

export default function GuestViewScreen({ navigation }) {
  const { logout } = useApp();

  const handleExitGuest = () => {
    logout();
    navigation.reset({ index: 0, routes: [{ name: 'RoleSelection' }] });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Guest Mode</Text>
        <Text style={styles.subtitle}>Browse notes without an account</Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={styles.infoTitle}>Guest Limitations</Text>
        </View>
        <View style={styles.limitationsList}>
          <Text style={styles.limitation}>✗ Cannot upload notes</Text>
          <Text style={styles.limitation}>✗ Cannot download notes</Text>
          <Text style={styles.limitation}>✗ Cannot like or save notes</Text>
          <Text style={styles.limitation}>✓ Can browse all approved notes</Text>
          <Text style={styles.limitation}>✓ Can search and filter notes</Text>
        </View>
      </View>

      <View style={styles.upgradeBox}>
        <Text style={styles.upgradeTitle}>Want to do more?</Text>
        <Text style={styles.upgradeText}>
          Create an account to upload, download, and interact with notes from the community.
        </Text>
        <TouchableOpacity
          style={styles.upgradeButton}
          onPress={handleExitGuest}
        >
          <Text style={styles.upgradeButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.exitButton}
        onPress={handleExitGuest}
      >
        <Text style={styles.exitButtonText}>🚪 Exit Guest Mode</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 4,
  },
  infoSection: {
    marginHorizontal: 16,
    marginVertical: 16,
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: colors.info,
    borderRadius: 12,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E40AF',
  },
  limitationsList: {
    gap: 8,
  },
  limitation: {
    fontSize: 12,
    color: '#1E40AF',
  },
  upgradeBox: {
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
  },
  upgradeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 8,
  },
  upgradeText: {
    fontSize: 12,
    color: '#1E40AF',
    marginBottom: 12,
    lineHeight: 18,
  },
  upgradeButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  upgradeButtonText: {
    color: colors.background,
    fontWeight: '600',
    fontSize: 12,
  },
  exitButton: {
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 12,
    backgroundColor: '#FFE4E4',
    borderRadius: 12,
    alignItems: 'center',
  },
  exitButtonText: {
    color: colors.danger,
    fontWeight: '600',
    fontSize: 14,
  },
});