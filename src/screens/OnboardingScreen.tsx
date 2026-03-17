import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import CustomButton from '@components/CustomButton';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.xl}px;
  justify-content: center;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.size.display}px;
  font-weight: 800;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
`;

const Highlight = styled.Text`
  color: ${({ theme }) => theme.colors.accent};
`;

const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.size.md}px;
  margin-bottom: ${({ theme }) => theme.spacing.xxl}px;
`;

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Title>
        Note<Highlight>HUB</Highlight>
      </Title>
      <Subtitle>
        Capture, organize, and explore your notes with a beautiful, focused experience.
      </Subtitle>
      <CustomButton label="Get started" onPress={() => navigation.navigate('Login' as never)} />
    </Container>
  );
};

export default OnboardingScreen;

