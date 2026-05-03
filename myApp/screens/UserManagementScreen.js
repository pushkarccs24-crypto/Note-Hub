import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { colors } from '../styles/colors';

export default function UserManagementScreen({ navigation }) {
  const { users, deleteUser } = useApp();

  const handleDelete = (userId, userName) => {
    Alert.alert('Delete User', `Are you sure you want to delete ${userName}?`, [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: () => {
          deleteUser(userId);
          Alert.alert('Success', `${userName} deleted`);
        },
      },
    ]);
  };

  const regularUsers = users.filter((u) => u.role === 'user');
  const adminUsers = users.filter((u) => u.role === 'admin');

  const renderUserItem = ({ item, isAdmin }) => (
    <View style={styles.userCard}>
      <View style={styles.userInfo}>
        <View
          style={[
            styles.userAvatar,
            isAdmin && { backgroundColor: colors.secondary },
          ]}
        >
          <Text style={styles.avatarText}>{isAdmin ? '👮' : '👤'}</Text>
        </View>
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>
        </View>
      </View>
      {!isAdmin && (
        <TouchableOpacity
          onPress={() => handleDelete(item.id, item.name)}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>User Management</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{regularUsers.length}</Text>
          <Text style={styles.statLabel}>Users</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{adminUsers.length}</Text>
          <Text style={styles.statLabel}>Admins</Text>
        </View>
      </View>

      <FlatList
        data={[
          ...adminUsers.map((u) => ({ ...u, isAdmin: true })),
          ...regularUsers.map((u) => ({ ...u, isAdmin: false })),
        ]}
        renderItem={({ item }) => renderUserItem({ item, isAdmin: item.isAdmin })}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButtonText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
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
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 24,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  userEmail: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  deleteButton: {
    padding: 8,
  },
  deleteButtonText: {
    fontSize: 18,
  },
});