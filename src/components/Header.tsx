import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import { ViewStyle } from 'react-native';

type Props = {
  title: string;
  subtitle?: string;
  showProfile?: boolean;
  style?: ViewStyle;
};

const Container = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px;
  padding-top: ${({ theme }) => theme.spacing.xl}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TitleBlock = styled.View``;

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.size.lg}px;
  font-weight: 700;
`;

const Subtitle = styled.Text`
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.size.sm}px;
`;

const ProfileCircle = styled.View`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: ${({ theme }) => theme.colors.surfaceAlt};
  align-items: center;
  justify-content: center;
`;

const Header: React.FC<Props> = ({ title, subtitle, showProfile = true, style }) => (
  <Container style={style}>
    <TitleBlock>
      <Title>{title}</Title>
      {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
    </TitleBlock>
    {showProfile && (
      <ProfileCircle>
        <Icon name="user" size={18} color="#fff" />
      </ProfileCircle>
    )}
  </Container>
);

export default Header;

