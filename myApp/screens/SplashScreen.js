import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { colors } from '../styles/colors';

export default function SplashScreen() {
  const scaleAnim = React.useRef(new Animated.Value(0.5)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        <View style={styles.logo}>
          <Text style={styles.logoText}>NH</Text>
        </View>
      </Animated.View>

      <Animated.Text style={[styles.title, { opacity: opacityAnim }]}>NoteHub</Animated.Text>
      <Animated.Text style={[styles.subtitle, { opacity: opacityAnim }]}>
        Share & Discover Study Materials
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    backgroundColor: colors.background,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.primary,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.background,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#E0D7FF',
    marginTop: 8,
  },
});