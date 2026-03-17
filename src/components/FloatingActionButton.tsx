import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import { GestureResponderEvent } from 'react-native';

type Props = {
  onPress?: (event: GestureResponderEvent) => void;
};

const FabContainer = styled.TouchableOpacity`
  position: absolute;
  right: ${({ theme }) => theme.spacing.xl}px;
  bottom: ${({ theme }) => theme.spacing.xl}px;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: ${({ theme }) => theme.colors.accent};
  align-items: center;
  justify-content: center;
  elevation: 6;
`;

const FloatingActionButton: React.FC<Props> = ({ onPress }) => (
  <FabContainer activeOpacity={0.9} onPress={onPress}>
    <Icon name="plus" size={24} color="#000" />
  </FabContainer>
);

export default FloatingActionButton;

