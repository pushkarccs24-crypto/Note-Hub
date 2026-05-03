import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Picker,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { colors } from '../styles/colors';

export default function NoteUploadScreen({ navigation }) {
  const { addNote } = useApp();
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [pages, setPages] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!title || !subject || !pages) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    setLoading(true);

    const colors_array = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
    const randomColor = colors_array[Math.floor(Math.random() * colors_array.length)];

    await addNote({
      title,
      subject,
      description,
      pages: parseInt(pages),
      thumbnail: randomColor,
      author: 'Current User',
      authorId: 'current_user',
    });

    setLoading(false);
    setTitle('');
    setSubject('');
    setDescription('');
    setPages('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Upload Notes</Text>
        <Text style={styles.subtitle}>Share your study materials</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Data Structures Complete Notes"
            value={title}
            onChangeText={setTitle}
            editable={!loading}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Subject *</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={subject}
              onValueChange={setSubject}
              style={styles.picker}
              enabled={!loading}
            >
              <Picker.Item label="Select a subject" value="" />
              <Picker.Item label="Computer Science" value="Computer Science" />
              <Picker.Item label="Mathematics" value="Mathematics" />
              <Picker.Item label="Physics" value="Physics" />
              <Picker.Item label="Chemistry" value="Chemistry" />
              <Picker.Item label="Biology" value="Biology" />
              <Picker.Item label="History" value="History" />
              <Picker.Item label="Literature" value="Literature" />
              <Picker.Item label="Economics" value="Economics" />
            </Picker>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Number of Pages *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 45"
            value={pages}
            onChangeText={setPages}
            keyboardType="numeric"
            editable={!loading}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Add a brief description of your notes..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            editable={!loading}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            📝 Your uploaded notes will be reviewed by our admin team before being published.
            This usually takes 24-48 hours.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleUpload}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Uploading...' : 'Upload Notes'}</Text>
        </TouchableOpacity>
      </View>
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
  form: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: colors.surface,
  },
  textarea: {
    height: 100,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  infoBox: {
    backgroundColor: colors.info,
    padding: 12,
    borderRadius: 12,
  },
  infoText: {
    fontSize: 12,
    color: '#1E40AF',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
});