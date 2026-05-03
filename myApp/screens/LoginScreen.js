import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { colors } from '../styles/colors';

export default function LoginScreen({ navigation, route }) {
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { role, onBackRole } = route.params;

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);
    const success = await login(email, password);
    setLoading(false);

    if (success) {
      navigation.reset({
        index: 0,
        routes: [{ name: role === 'admin' ? 'AdminApp' : 'UserApp' }],
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={onBackRole} style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <View style={styles.logoSmall}>
          <Text style={styles.logoText}>NH</Text>
        </View>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue to NoteHub</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="your@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            editable={!loading}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
          />
        </View>

        <TouchableOpacity style={styles.forgotButton}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.demoBox}>
        <Text style={styles.demoTitle}>Demo Credentials:</Text>
        {role === 'admin' ? (
          <Text style={styles.demoText}>admin@notehub.com / admin123</Text>
        ) : (
          <>
            <Text style={styles.demoText}>user@notehub.com / user123</Text>
            <Text style={styles.demoText}>Or create a new account below</Text>
          </>
        )}
      </View>

      {role !== 'admin' && (
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.switchLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F1F5',
    paddingTop: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  backButtonText: {
    fontSize: 20,
    color: colors.text,
  },
  header: {
    alignItems: 'center',
    marginVertical: 30,
  },
  logoSmall: {
    width: 80,
    height: 80,
    backgroundColor: colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textLight,
  },
  form: {
    paddingHorizontal: 20,
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 14,
    backgroundColor: colors.background,
  },
  forgotButton: {
    alignSelf: 'flex-end',
  },
  forgotText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  demoBox: {
    marginTop: 24,
    marginHorizontal: 20,
    backgroundColor: '#DBEAFE',
    borderRadius: 12,
    padding: 12,
  },
  demoTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1E3A8A',
    marginBottom: 4,
  },
  demoText: {
    fontSize: 12,
    color: '#1E3A8A',
    marginVertical: 2,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  switchText: {
    fontSize: 14,
    color: colors.textLight,
  },
  switchLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
});