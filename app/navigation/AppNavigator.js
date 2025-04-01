import React from "react";
import FooterTabNavigator from "./FooterTabNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import DomainListScreen from "../screens/DomainListScreen";
import HomeTab from "../tabs/HomeTab";
import LandingScreen from "../screens/LandingScreen";
import SignUpScreen from "../screens/SignUpScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeTab"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Start" component={LandingScreen} />
        <Stack.Screen name="HomeTab" component={FooterTabNavigator} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Domain" component={DomainListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
