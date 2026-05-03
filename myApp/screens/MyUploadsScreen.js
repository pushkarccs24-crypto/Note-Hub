import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { colors } from '../styles/colors';

export default function MyUploadsScreen({ navigation }) {
  const { getUserUploads } = useApp();
  const myNotes = getUserUploads();

  const pendingNotes = myNotes.filter((n) => n.status === 'pending');
  const approvedNotes = myNotes.filter((n) => n.status === 'approved');
  const rejectedNotes = myNotes.filter((n) => n.status === 'rejected');

  const renderNoteItem = ({ item }) => (
    <View style={styles.noteCard}>
      <View style={styles.noteHeader}>
        <Text style={styles.noteTitle}>{item.title}</Text>
        <View
          style={[
            styles.statusBadge,
            item.status === 'pending' && styles.statusPending,
            item.status === 'approved' && styles.statusApproved,
            item.status === 'rejected' && styles.statusRejected,
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.noteSubject}>{item.subject} • {item.pages} pages</Text>
      <Text style={styles.noteDate}>Uploaded on {item.uploadDate}</Text>

      {item.status === 'approved' && (
        <View style={styles.statsLine}>
          <Text style={styles.statText}>❤️ {item.likes} likes</Text>
          <Text style={styles.statText}>⬇️ {item.downloads} downloads</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>My Uploads</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{pendingNotes.length}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{approvedNotes.length}</Text>
          <Text style={styles.statLabel}>Approved</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{rejectedNotes.length}</Text>
          <Text style={styles.statLabel}>Rejected</Text>
        </View>
      </View>

      {myNotes.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No uploads yet</Text>
          <Text style={styles.emptyStateSubtext}>Start sharing your notes!</Text>
        </View>
      ) : (
        <FlatList
          data={myNotes}
          renderItem={renderNoteItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          scrollEnabled={false}
        />
      )}
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
  noteCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusPending: {
    backgroundColor: colors.warning,
  },
  statusApproved: {
    backgroundColor: colors.success,
  },
  statusRejected: {
    backgroundColor: colors.danger,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.background,
    textTransform: 'capitalize',
  },
  noteSubject: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 4,
  },
  noteDate: {
    fontSize: 10,
    color: colors.textLight,
  },
  statsLine: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  statText: {
    fontSize: 12,
    color: colors.textLight,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textLight,
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 12,
    color: colors.textLight,
  },
});