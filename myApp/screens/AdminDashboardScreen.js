import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { colors } from '../styles/colors';
import AdminNoteCard from '../components/AdminNoteCard';

export default function AdminDashboardScreen({ navigation }) {
  const { notes, updateNoteStatus } = useApp();
  const [filter, setFilter] = useState('pending');
  const [activeTab, setActiveTab] = useState('notes');

  const stats = {
    pending: notes.filter((n) => n.status === 'pending').length,
    approved: notes.filter((n) => n.status === 'approved').length,
    rejected: notes.filter((n) => n.status === 'rejected').length,
  };

  const filteredNotes =
    filter === 'all' ? notes : notes.filter((note) => note.status === filter);

  const handleApprove = (id) => {
    updateNoteStatus(id, 'approved');
    Alert.alert('Success', 'Note approved!');
  };

  const handleReject = (id) => {
    updateNoteStatus(id, 'rejected');
    Alert.alert('Note rejected');
  };

  if (activeTab === 'users') {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>User Management</Text>
        </View>
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => setActiveTab('notes')}
        >
          <Text style={styles.tabButtonText}>Back to Notes</Text>
        </TouchableOpacity>
        <View style={styles.placeholderContent}>
          <Text style={styles.placeholderText}>User Management Screen</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Admin Dashboard</Text>
        <Text style={styles.subtitle}>Review and approve notes</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{stats.pending}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{stats.approved}</Text>
          <Text style={styles.statLabel}>Approved</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{stats.rejected}</Text>
          <Text style={styles.statLabel}>Rejected</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        {['pending', 'approved', 'rejected', 'all'].map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterButton, filter === f && styles.filterButtonActive]}
            onPress={() => setFilter(f)}
          >
            <Text
              style={[
                styles.filterButtonText,
                filter === f && styles.filterButtonTextActive,
              ]}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AdminNoteCard
            note={item}
            onApprove={() => handleApprove(item.id)}
            onReject={() => handleReject(item.id)}
          />
        )}
        scrollEnabled={false}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity
        style={styles.usersButton}
        onPress={() => setActiveTab('users')}
      >
        <Text style={styles.usersButtonText}>👥 Users</Text>
      </TouchableOpacity>
    </View>
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
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  statLabel: {
    fontSize: 10,
    color: colors.textLight,
    marginTop: 4,
  },
  filterScroll: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterButtonText: {
    fontSize: 12,
    color: colors.text,
  },
  filterButtonTextActive: {
    color: colors.background,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  usersButton: {
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  usersButtonText: {
    color: colors.background,
    fontWeight: '600',
  },
  tabButton: {
    marginHorizontal: 16,
    marginTop: 12,
    paddingVertical: 10,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabButtonText: {
    color: colors.background,
    fontWeight: '600',
    fontSize: 12,
  },
  placeholderContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: colors.textLight,
  },
});