import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 

const LandingScreen = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#212a31', '#2e3944', '#124e66', '#748d92', '#d3d9d4']} 
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.heading}>Domain Market</Text>
        
        <Image 
             source={require('../../assets/images/logo.png')}
             style={styles.logo}
             resizeMode="contain"
        />
        <Pressable 
            style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
         ]}
        onPress={() => navigation.navigate('Login')}
        >
        <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Pressable 
            style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed, 
        ]}
        onPress={() => navigation.navigate('SignUp')}
        >
        <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>

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
    width: '80%',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    borderRadius: 10,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#124e66',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#1d6a86', 
    transform: [{ scale: 0.97 }],
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LandingScreen;
