import React from 'react';
import styled from 'styled-components/native';
import { GestureResponderEvent } from 'react-native';

type Variant = 'primary' | 'secondary' | 'ghost';

type Props = {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: Variant;
  fullWidth?: boolean;
};

const ButtonContainer = styled.TouchableOpacity<{
  variant: Variant;
  fullWidth: boolean;
}>`
  padding: 12px 18px;
  border-radius: ${({ theme }) => theme.radii.lg}px;
  background-color: ${({ theme, variant }) =>
    variant === 'primary'
      ? theme.colors.accent
      : variant === 'secondary'
      ? theme.colors.surfaceAlt
      : 'transparent'};
  border-width: ${({ variant }) => (variant === 'ghost' ? 0 : 1)}px;
  border-color: ${({ theme, variant }) =>
    variant === 'primary' ? theme.colors.accent : theme.colors.borderSoft};
  align-items: center;
  justify-content: center;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
`;

const ButtonLabel = styled.Text<{ variant: Variant }>`
  font-size: ${({ theme }) => theme.typography.size.md}px;
  font-weight: 600;
  color: ${({ theme, variant }) =>
    variant === 'primary' ? '#000' : theme.colors.textPrimary};
`;

const CustomButton: React.FC<Props> = ({
  label,
  onPress,
  variant = 'primary',
  fullWidth = true
}) => (
  <ButtonContainer activeOpacity={0.9} onPress={onPress} variant={variant} fullWidth={fullWidth}>
    <ButtonLabel variant={variant}>{label}</ButtonLabel>
  </ButtonContainer>
);

export default CustomButton;

