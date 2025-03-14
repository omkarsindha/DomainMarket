import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome to Domain Market</Text>

      <TouchableOpacity onPress={() => navigation.navigate("Domain")}>
        <Text>Browse Domains</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};


export default HomeScreen; 
