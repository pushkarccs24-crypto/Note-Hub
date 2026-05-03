import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../styles/colors';

export default function NoteCard({ note, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.thumbnail, { backgroundColor: note.thumbnail }]}>
        <Text style={styles.thumbnailIcon}>📄</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {note.title}
        </Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{note.subject}</Text>
        </View>
        <View style={styles.stats}>
          <Text style={styles.stat}>❤️ {note.likes}</Text>
          <Text style={styles.stat}>⬇️ {note.downloads}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  thumbnail: {
    height: 96,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailIcon: {
    fontSize: 40,
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  badge: {
    backgroundColor: colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 10,
    color: colors.text,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    fontSize: 10,
    color: colors.textLight,
  },
});