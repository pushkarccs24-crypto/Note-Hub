import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import Header from '@components/Header';
import NoteCard from '@components/NoteCard';
import FloatingActionButton from '@components/FloatingActionButton';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const notes = new Array(10).fill(null).map((_, index) => ({
  id: String(index),
  title: `Lecture notes ${index + 1}`,
  preview: 'Key concepts, formulas, and examples from today’s class.',
  timestamp: `${index + 1}d ago`
}));

const NotesListScreen: React.FC = () => {
  return (
    <Container>
      <Header title="My Notes" subtitle="All your notes in one place" />
      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <NoteCard title={item.title} preview={item.preview} timestamp={item.timestamp} />
        )}
        contentContainerStyle={{ paddingBottom: 96, paddingTop: 8 }}
      />
      <FloatingActionButton />
    </Container>
  );
};

export default NotesListScreen;

