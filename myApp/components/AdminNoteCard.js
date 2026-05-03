import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../styles/colors';

export default function AdminNoteCard({ note, onApprove, onReject }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={2}>
          {note.title}
        </Text>
        <View
          style={[
            styles.statusBadge,
            note.status === 'pending' && styles.statusPending,
            note.status === 'approved' && styles.statusApproved,
            note.status === 'rejected' && styles.statusRejected,
          ]}
        >
          <Text style={styles.statusText}>{note.status}</Text>
        </View>
      </View>

      <Text style={styles.meta}>
        {note.subject} • {note.pages} pages
      </Text>
      <Text style={styles.author}>👤 {note.author}</Text>
      <Text style={styles.date}>Uploaded {note.uploadDate}</Text>

      {note.status === 'pending' && (
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.rejectButton} onPress={onReject}>
            <Text style={styles.rejectButtonText}>Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.approveButton} onPress={onApprove}>
            <Text style={styles.approveButtonText}>Approve</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
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
  meta: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 4,
  },
  author: {
    fontSize: 12,
    color: colors.text,
    marginBottom: 2,
  },
  date: {
    fontSize: 10,
    color: colors.textLight,
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#FFE4E4',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  rejectButtonText: {
    color: colors.danger,
    fontWeight: '600',
    fontSize: 12,
  },
  approveButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  approveButtonText: {
    color: colors.background,
    fontWeight: '600',
    fontSize: 12,
  },
});