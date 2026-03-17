import React from 'react';
import styled from 'styled-components/native';

import Header from '@components/Header';
import SearchBar from '@components/SearchBar';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Placeholder = styled.Text`
  margin-top: ${({ theme }) => theme.spacing.xl}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const SearchScreen: React.FC = () => {
  return (
    <Container>
      <Header title="Search" subtitle="Find any note instantly" />
      <SearchBar />
      <Placeholder>Start typing to search through your notes.</Placeholder>
    </Container>
  );
};

export default SearchScreen;

