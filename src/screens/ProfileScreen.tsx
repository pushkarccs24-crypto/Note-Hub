import React from 'react';
import styled from 'styled-components/native';

import Header from '@components/Header';
import CustomButton from '@components/CustomButton';

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Content = styled.View`
  padding: 0 ${({ theme }) => theme.spacing.lg}px;
`;

const SectionTitle = styled.Text`
  margin-top: ${({ theme }) => theme.spacing.lg}px;
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.typography.size.md}px;
  font-weight: 600;
`;

const SettingRow = styled.View`
  padding-vertical: ${({ theme }) => theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.borderSoft};
`;

const SettingLabel = styled.Text`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.size.sm}px;
`;

const ProfileScreen: React.FC = () => {
  return (
    <Container>
      <Header title="Profile" subtitle="Manage your account and settings" />
      <Content>
        <SectionTitle>Preferences</SectionTitle>
        <SettingRow>
          <SettingLabel>Dark theme</SettingLabel>
        </SettingRow>
        <SettingRow>
          <SettingLabel>Notifications</SettingLabel>
        </SettingRow>

        <SectionTitle>Account</SectionTitle>
        <SettingRow>
          <SettingLabel>Email</SettingLabel>
        </SettingRow>
        <SettingRow>
          <SettingLabel>Password</SettingLabel>
        </SettingRow>

        <SectionTitle>Danger zone</SectionTitle>
        <CustomButton label="Log out" variant="secondary" />
      </Content>
    </Container>
  );
};

export default ProfileScreen;

