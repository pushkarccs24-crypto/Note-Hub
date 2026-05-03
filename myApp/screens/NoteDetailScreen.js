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

export default function NoteDetailScreen({ route, navigation }) {
  const { note } = route.params;
  const { user, likeNote, downloadNote, likedNotes } = useApp();
  const isLiked = likedNotes.has(note.id);
  const isGuest = user?.role === 'guest';

  const handleLike = () => {
    if (isGuest) {
      Alert.alert('Error', 'Please login to like notes');
      return;
    }
    likeNote(note.id);
  };

  const handleDownload = () => {
    if (isGuest) {
      Alert.alert('Error', 'Please login to download notes');
      return;
    }
    downloadNote(note.id);
    Alert.alert('Success', 'Download started!');
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <View style={[styles.thumbnail, { backgroundColor: note.thumbnail }]}>
        <Text style={styles.thumbnailText}>📄</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{note.title}</Text>
        <View style={styles.badgeContainer}>
          <Text style={styles.badge}>{note.subject}</Text>
        </View>

        <View style={styles.authorContainer}>
          <View style={styles.authorAvatar}>
            <Text>👤</Text>
          </View>
          <View>
            <Text style={styles.authorName}>{note.author}</Text>
            <Text style={styles.uploadDate}>Uploaded {note.uploadDate}</Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{note.likes}</Text>
            <Text style={styles.statLabel}>Likes</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{note.downloads}</Text>
            <Text style={styles.statLabel}>Downloads</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{note.pages}</Text>
            <Text style={styles.statLabel}>Pages</Text>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>About these notes</Text>
          <Text style={styles.descriptionText}>
            {note.description ||
              'Comprehensive study materials covering all key topics and concepts. These notes include detailed explanations, examples, and practice problems to help you master the subject matter.'}
          </Text>
        </View>

        <View style={styles.tagsContainer}>
          <Text style={styles.tagsTitle}>Topics covered</Text>
          <View style={styles.tagsList}>
            {['Fundamentals', 'Advanced Concepts', 'Examples', 'Practice'].map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.actionContainer}>
        {!isGuest ? (
          <>
            <TouchableOpacity
              style={[styles.actionButton, isLiked && styles.actionButtonActive]}
              onPress={handleLike}
            >
              <Text style={styles.actionButtonIcon}>❤️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonIcon}>🔗</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.downloadButton]} onPress={handleDownload}>
              <Text style={styles.downloadButtonText}>⬇️ Download PDF</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.loginPrompt}>
            <Text style={styles.loginPromptText}>Login to download and like notes</Text>
          </View>
        )}
      </View>
    </ScrollView>
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
  thumbnail: {
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailText: {
    fontSize: 56,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  badgeContainer: {
    marginBottom: 16,
  },
  badge: {
    display: 'flex',
    backgroundColor: colors.primary,
    color: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    fontSize: 12,
    fontWeight: '600',
    width: '30%',
    textAlign: 'center',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: 16,
  },
  authorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  uploadDate: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  statBox: {
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.surface,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 4,
  },
  descriptionContainer: {
    marginVertical: 16,
  },
  descriptionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 13,
    color: colors.textLight,
    lineHeight: 20,
  },
  tagsContainer: {
    marginVertical: 16,
  },
  tagsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    color: colors.text,
  },
  actionContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.background,
    gap: 8,
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonActive: {
    backgroundColor: '#FFE4E4',
    borderColor: colors.danger,
  },
  actionButtonIcon: {
    fontSize: 20,
  },
  downloadButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadButtonText: {
    color: colors.background,
    fontWeight: '600',
    fontSize: 14,
  },
  loginPrompt: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginPromptText: {
    fontSize: 12,
    color: colors.textLight,
  },
});