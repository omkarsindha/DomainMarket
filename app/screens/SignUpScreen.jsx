
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = () => {
    console.log('Signing up with:', firstName, lastName, email, password);
  };

  return (
    <LinearGradient
      colors={['#212a31', '#2e3944', '#124e66', '#748d92', '#d3d9d4']} 
      style={styles.container}
    >
      <View style={styles.content}>

        <Image
          source={require('../../assets/images/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />

      <Text style={styles.title}>Create an Account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            placeholderTextColor="#aaa"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#aaa"
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#666"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed
          ]}
          onPress={handleSignUp}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

  
        <View style={styles.footer}>
          <Text style={{ color: '#d3d9d4', fontSize: 14 }}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}> Login</Text>
          </TouchableOpacity>
        </View>
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
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    padding: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6, 
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 15,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, 
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#fff',
  },
  icon: {
    marginRight: 10,
    color: '#bbb',
  },
  button: {
    backgroundColor: '#124e66',
    paddingVertical: 16,
    paddingHorizontal: 45,
    borderRadius: 30,
    marginVertical: 12,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonPressed: {
    backgroundColor: '#1d6a86',
    transform: [{ scale: 0.97 }],
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
  },
  linkText: {
    color: '#d3d9d4',
    fontSize: 14,
  },
});

export default SignUpScreen;
