import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

export default function StatBox({ icon, value, label, color = colors.surface }) {
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    flex: 1,
  },
  icon: {
    fontSize: 24,
    marginBottom: 8,
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  label: {
    fontSize: 10,
    color: colors.textLight,
    marginTop: 4,
  },
});