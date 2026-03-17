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
  font-size: ${({ theme }) => theme.typography.size.xl}px;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.lg}px;
`;

const Input = styled.TextInput`
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radii.md}px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.borderSoft};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const FooterText = styled.Text`
  margin-top: ${({ theme }) => theme.spacing.lg}px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Accent = styled.Text`
  color: ${({ theme }) => theme.colors.accent};
`;

const SignupScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Title>Create account</Title>
      <Input placeholder="Name" placeholderTextColor="#6E7280" />
      <Input placeholder="Email" placeholderTextColor="#6E7280" keyboardType="email-address" />
      <Input placeholder="Password" placeholderTextColor="#6E7280" secureTextEntry />
      <CustomButton label="Sign up" onPress={() => navigation.navigate('Main' as never)} />
      <FooterText>
        Already have an account?{' '}
        <Accent onPress={() => navigation.goBack()}>Login instead</Accent>
      </FooterText>
    </Container>
  );
};

export default SignupScreen;

