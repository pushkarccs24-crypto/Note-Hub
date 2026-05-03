import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { colors } from '../styles/colors';
import NoteCard from '../components/NoteCard';

export default function HomeScreen({ navigation }) {
  const { notes } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [sortBy, setSortBy] = useState('recent');

  const subjects = ['All', 'Computer Science', 'Mathematics', 'Chemistry', 'Physics', 'Biology', 'History', 'Literature', 'Economics'];

  const approvedNotes = notes.filter((note) => note.status === 'approved');

  let filteredNotes = approvedNotes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || note.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  filteredNotes = [...filteredNotes].sort((a, b) => {
    if (sortBy === 'likes') return b.likes - a.likes;
    if (sortBy === 'downloads') return b.downloads - a.downloads;
    return new Date(b.uploadDate) - new Date(a.uploadDate);
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover Notes</Text>
        <Text style={styles.subtitle}>Find and share study materials</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search notes..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor={colors.textLight}
      />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        {subjects.map((subject) => (
          <TouchableOpacity
            key={subject}
            style={[
              styles.filterChip,
              selectedSubject === subject && styles.filterChipActive,
            ]}
            onPress={() => setSelectedSubject(subject)}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedSubject === subject && styles.filterChipTextActive,
              ]}
            >
              {subject}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.sortContainer}>
        {['recent', 'likes', 'downloads'].map((sort) => (
          <TouchableOpacity
            key={sort}
            style={[styles.sortButton, sortBy === sort && styles.sortButtonActive]}
            onPress={() => setSortBy(sort)}
          >
            <Text
              style={[
                styles.sortButtonText,
                sortBy === sort && styles.sortButtonTextActive,
              ]}
            >
              {sort === 'recent' ? 'Recent' : sort === 'likes' ? 'Liked' : 'Downloads'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.noteGrid}
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            onPress={() => navigation.navigate('NoteDetail', { note: item })}
          />
        )}
        contentContainerStyle={styles.listContent}
        scrollEnabled={false}
      />

      {filteredNotes.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No notes found</Text>
        </View>
      )}
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
  searchInput: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: colors.surface,
  },
  filterScroll: {
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterChipText: {
    fontSize: 12,
    color: colors.text,
  },
  filterChipTextActive: {
    color: colors.background,
  },
  sortContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginVertical: 8,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
  },
  sortButtonActive: {
    backgroundColor: colors.primary,
  },
  sortButtonText: {
    fontSize: 12,
    color: colors.text,
  },
  sortButtonTextActive: {
    color: colors.background,
  },
  noteGrid: {
    gap: 12,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  listContent: {
    paddingVertical: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textLight,
  },
});