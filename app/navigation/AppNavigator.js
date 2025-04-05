import React from "react";
import FooterTabNavigator from "./FooterTabNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import HomeTab from "../tabs/HomeTab";
import LandingScreen from "../screens/LandingScreen";
import SignUpScreen from "../screens/SignUpScreen";
import DomainBuyScreen from "../tabs/DomainBuyScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Start" component={LandingScreen} />
        <Stack.Screen name="HomeTab" component={FooterTabNavigator} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="DomainBuy" component={DomainBuyScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
