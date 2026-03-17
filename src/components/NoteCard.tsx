import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

type Props = {
  title: string;
  preview: string;
  timestamp: string;
};

const Card = styled.View`
  margin: 0 ${({ theme }) => theme.spacing.lg}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  padding: ${({ theme }) => theme.spacing.lg}px;
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  border-radius: ${({ theme }) => theme.radii.lg}px;
`;

const TitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.size.md}px;
  font-weight: 600;
`;

const MetaRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Preview = styled.Text`
  flex: 1;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.size.sm}px;
`;

const Timestamp = styled.Text`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.typography.size.xs}px;
  margin-left: ${({ theme }) => theme.spacing.md}px;
`;

const IconRow = styled.View`
  flex-direction: row;
  gap: 12px;
`;

const NoteCard: React.FC<Props> = ({ title, preview, timestamp }) => (
  <Card>
    <TitleRow>
      <Title>{title}</Title>
      <IconRow>
        <Icon name="share-2" size={16} color="#B0B3C0" />
        <Icon name="trash-2" size={16} color="#B0B3C0" />
      </IconRow>
    </TitleRow>
    <MetaRow>
      <Preview numberOfLines={2}>{preview}</Preview>
      <Timestamp>{timestamp}</Timestamp>
    </MetaRow>
  </Card>
);

export default NoteCard;

