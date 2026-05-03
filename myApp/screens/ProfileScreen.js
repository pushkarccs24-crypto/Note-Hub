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

export default function ProfileScreen({ navigation }) {
  const { user, logout, userActivity, toggleDarkMode, darkMode } = useApp();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Logout',
        onPress: () => {
          logout();
          navigation.reset({ index: 0, routes: [{ name: 'RoleSelection' }] });
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Manage your account</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <Text style={styles.userName}>{user?.name}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
        {user?.role === 'admin' && (
          <View style={styles.adminBadge}>
            <Text style={styles.adminBadgeText}>Admin</Text>
          </View>
        )}
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Your Activity</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📝</Text>
            <Text style={styles.statValue}>{userActivity.uploads}</Text>
            <Text style={styles.statLabel}>Uploaded</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>❤️</Text>
            <Text style={styles.statValue}>{userActivity.likes}</Text>
            <Text style={styles.statLabel}>Liked</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>⬇️</Text>
            <Text style={styles.statValue}>{userActivity.downloads}</Text>
            <Text style={styles.statLabel}>Downloads</Text>
          </View>
        </View>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.menuTitle}>Settings</Text>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('AccountSettings')}
        >
          <Text style={styles.menuItemIcon}>⚙️</Text>
          <Text style={styles.menuItemText}>Account Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={toggleDarkMode}>
          <Text style={styles.menuItemIcon}>{darkMode ? '☀️' : '🌙'}</Text>
          <Text style={styles.menuItemText}>{darkMode ? 'Light Mode' : 'Dark Mode'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('MyUploads')}
        >
          <Text style={styles.menuItemIcon}>📁</Text>
          <Text style={styles.menuItemText}>My Uploads</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemIcon}>❤️</Text>
          <Text style={styles.menuItemText}>Saved Notes</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>🚪 Log Out</Text>
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
  profileCard: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 48,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  userEmail: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 4,
  },
  adminBadge: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: colors.primary,
    borderRadius: 12,
  },
  adminBadgeText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: '600',
  },
  statsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textLight,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 8,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  statLabel: {
    fontSize: 10,
    color: colors.textLight,
    marginTop: 2,
  },
  menuSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textLight,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginVertical: 4,
  },
  menuItemIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  logoutButton: {
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 14,
    backgroundColor: '#FFE4E4',
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.danger,
  },
});