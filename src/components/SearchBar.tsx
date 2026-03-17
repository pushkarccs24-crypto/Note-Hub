import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import { TextInputProps } from 'react-native';

const Container = styled.View`
  margin: 0 ${({ theme }) => theme.spacing.lg}px;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
  padding: 0 ${({ theme }) => theme.spacing.md}px;
  height: 44px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.borderSoft};
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const Input = styled.TextInput`
  flex: 1;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.size.sm}px;
`;

type Props = TextInputProps & {
  placeholder?: string;
};

const SearchBar: React.FC<Props> = ({ placeholder = 'Search notes...', ...rest }) => (
  <Container>
    <Icon name="search" size={18} color="#6E7280" />
    <Input
      placeholder={placeholder}
      placeholderTextColor="#6E7280"
      returnKeyType="search"
      {...rest}
    />
  </Container>
);

export default SearchBar;

