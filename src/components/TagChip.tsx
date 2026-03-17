import React from 'react';
import styled from 'styled-components/native';

type Props = {
  label: string;
  active?: boolean;
};

const Chip = styled.View<{ active: boolean }>`
  padding: 6px 12px;
  border-radius: 999px;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.accentSoft : theme.colors.surface};
  border-width: 1px;
  border-color: ${({ theme, active }) =>
    active ? theme.colors.accent : theme.colors.borderSoft};
`;

const Label = styled.Text<{ active: boolean }>`
  color: ${({ theme, active }) =>
    active ? theme.colors.accent : theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.size.xs}px;
`;

const TagChip: React.FC<Props> = ({ label, active = false }) => (
  <Chip active={active}>
    <Label active={active}>{label}</Label>
  </Chip>
);

export default TagChip;

