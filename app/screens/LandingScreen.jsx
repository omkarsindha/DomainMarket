import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Animated, Dimensions, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

const { height, width } = Dimensions.get('window');

const LandingScreen = ({ navigation }) => {
  const [showSplash, setShowSplash] = useState(true);

  const logoScale = useRef(new Animated.Value(2)).current; 
  const logoOpacity = useRef(new Animated.Value(0)).current; 
  const contentAnim = useRef(new Animated.Value(0)).current;
  const wavePosition = height * 0.32; 

  useEffect(() => {
    Animated.timing(logoScale, {
      toValue: 1, 
      duration: 800, 
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setShowSplash(false);
      Animated.timing(contentAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  return (
    <LinearGradient colors={['#000000', '#0b0c10']} style={styles.container}>
      {/* Left Static Wave */}
      <Animated.View style={{ position: 'absolute', left: 20, top: wavePosition, opacity: contentAnim }}>
        <Svg height={200} width={150} viewBox="0 0 100 100">
          <Path
            d="M10,0 C50,50 50,50 10,100 L0,100 L0,0 Z"
            fill="#66fcf1"
            opacity="0.8"
          />
        </Svg>
      </Animated.View>

      <Animated.View style={{ position: 'absolute', right: 20, top: wavePosition, opacity: contentAnim }}>
        <Svg height={200} width={150} viewBox="0 0 100 100">
          <Path
            d="M90,0 C50,50 50,50 90,100 L100,100 L100,0 Z"
            fill="#66fcf1"
            opacity="0.8"
          />
        </Svg>
      </Animated.View>

      {showSplash && (
        <Animated.View
          style={[
            styles.splashScreen,
            {
              opacity: logoOpacity, 
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <Text style={styles.splashText}>Domain Market</Text>
          <Image source={require('../../assets/images/logo.png')} style={styles.splashLogo} resizeMode="contain" />
        </Animated.View>
      )}

      {!showSplash && (
        <Animated.View style={{ opacity: contentAnim, alignItems: 'center' }}>
          <Text style={styles.heading}>Domain Market</Text>

          <Image source={require('../../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />

          <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>

          <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
        </Animated.View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashScreen: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
  },
  splashText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#66fcf1',
    marginBottom: 20,
    textAlign: 'center',
  },
  splashLogo: {
    width: 150,
    height: 150,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#c5c6c7',
    marginBottom: 20,
    textAlign: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#66fcf1',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: '#45a29e',
    transform: [{ scale: 0.97 }],
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LandingScreen;
