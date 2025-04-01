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

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    // Reset error message
    setErrorMessage('');

    // Validation
    if (!username || !password) {
      setErrorMessage('Please enter both username and password');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Invalid username or password');
      }

      // Save token to AsyncStorage
      await AsyncStorage.setItem('access_token', data.access_token);

      console.log('Login successful:', username);
      navigation.replace('HomeTab');

    } catch (error) {
      console.error('Login error:', error);
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

      <Text style={styles.title}>Welcome Back</Text>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : (
        <Text style={styles.subtitle}>Sign in to continue</Text>
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
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#66fcf1" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.linkText}>Create Account</Text>
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
    justifyContent: 'space-between',
    width: '85%',
    marginTop: 15,
  },
  linkText: {
    color: '#c5c6c7',
    fontSize: 14,
  },
});

export default LoginScreen;