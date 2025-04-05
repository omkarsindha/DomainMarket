import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    // Reset error message
    setErrorMessage('');

    // Validation
    if (!username || !email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    // Password validation (you can customize these requirements)
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Registration failed');
      }

      // Save token to AsyncStorage
      await AsyncStorage.setItem('access_token', data.access_token);

      console.log('Registration successful:', username);
      navigation.replace('Login');

    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#0b0c10', '#0b0c10', '#1f2833']}
      style={styles.container}
    >
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Create an Account</Text>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : (
        <Text style={styles.subtitle}>Sign up to get started</Text>
      )}

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#66fcf1" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          placeholderTextColor="#c5c6c7"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#66fcf1" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#c5c6c7"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#66fcf1" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholderTextColor="#c5c6c7"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#66fcf1"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
          loading && styles.buttonDisabled
        ]}
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#66fcf1" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={{ color: '#c5c6c7', fontSize: 14 }}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}> Login</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#66fcf1',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#c5c6c7',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#ff3b30',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    backgroundColor: '#1f2833',
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 15,
    height: 50,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#66fcf1',
  },
  icon: {
    marginRight: 10,
    color: '#66fcf1',
  },
  button: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#66fcf1',
    paddingVertical: 16,
    paddingHorizontal: 45,
    borderRadius: 30,
    marginVertical: 12,
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    backgroundColor: '#45a29e',
  },
  buttonDisabled: {
    borderColor: '#45a29e',
    opacity: 0.7,
  },
  buttonText: {
    color: '#66fcf1',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '85%',
    marginTop: 15,
  },
  linkText: {
    color: '#66fcf1',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;