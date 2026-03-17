import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import Header from '@components/Header';
import SearchBar from '@components/SearchBar';
import NoteCard from '@components/NoteCard';
import FloatingActionButton from '@components/FloatingActionButton';
import TagChip from '@components/TagChip';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const SectionTitle = styled.Text`
  margin: 0 ${({ theme }) => theme.spacing.lg}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.size.md}px;
  font-weight: 600;
`;

const TagsRow = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false
})`
  padding: 0 ${({ theme }) => theme.spacing.lg}px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const TagSpacer = styled.View`
  width: ${({ theme }) => theme.spacing.sm}px;
`;

const notes = [
  {
    id: '1',
    title: 'Welcome to NoteHUB',
    preview: 'Start creating and sharing your notes! Tap the + button to create a new note.',
    timestamp: '1h ago'
  },
  {
    id: '2',
    title: 'Features',
    preview: 'Create unlimited notes • Share with friends • Beautiful dark theme • Mobile-first design',
    timestamp: '2h ago'
  }
];

const HomeScreen: React.FC = () => {
  return (
    <Container>
      <Header title="Search & Explore Notes" subtitle="Find notes by course, department, and subject" />
      <SearchBar />
      <SectionTitle>Quick filters</SectionTitle>
      <TagsRow>
        <TagChip label="All Courses" active />
        <TagSpacer />
        <TagChip label="All Departments" />
        <TagSpacer />
        <TagChip label="All Subjects" />
      </TagsRow>
      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <NoteCard title={item.title} preview={item.preview} timestamp={item.timestamp} />
        )}
        contentContainerStyle={{ paddingBottom: 96 }}
      />
      <FloatingActionButton />
    </Container>
  );
};

export default HomeScreen;

