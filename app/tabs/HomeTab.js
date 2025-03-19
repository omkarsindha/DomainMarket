import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Footer from "../Components/Footer";
const HomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("domain");

  return (
    <LinearGradient
      colors={["#0b0c10", "#0b0c10", "#1f2833"]}
      style={styles.container}
    >
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search domains..."
          placeholderTextColor="#c5c6c7"
        />
      </View>

      {/* ScrollView for domain cards
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.scrollContainer}
      >
        {domainDeals.map((domain, index) => (
          <View key={index} style={styles.domainCard}>
            <Text style={styles.domainName}>{domain.name}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.originalPrice}>${domain.originalPrice}</Text> 
              <Text style={styles.salePrice}>${domain.salePrice}</Text>
            </View>
          </View>
        ))}
      </ScrollView> */}
    </LinearGradient>
  );
};

// const domainDeals = [
//   { name: "TechDomain.com", originalPrice: 199, salePrice: 99 },
//   { name: "ShopBest.com", originalPrice: 149, salePrice: 79 },
//   { name: "NextGenAI.io", originalPrice: 299, salePrice: 149 },
//   { name: "CloudHub.net", originalPrice: 189, salePrice: 89 },
//   { name: "CryptoWorld.xyz", originalPrice: 399, salePrice: 199 },
//   { name: "EcomGiant.biz", originalPrice: 249, salePrice: 125 },
//   { name: "AIRevolution.io", originalPrice: 499, salePrice: 250 },
// ];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingLeft: 6,
  },
  searchInput: {
    borderWidth: 2,
    borderColor: "#66fcf1",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#1f2833",
    color: "#66fcf1",
  },
  scrollContainer: {
    marginVertical: 10,
    paddingLeft: 6,
  },
  domainCard: {
    width: 100,
    height: 100,
    backgroundColor: "#1f2833",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: "#66fcf1",
  },
  domainName: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    color: "#66fcf1",
  },
  priceContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 2,
  },
  originalPrice: {
    textDecorationLine: "line-through",
    color: "#c5c6c7",
    fontSize: 10,
  },
  salePrice: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#45a29e",
  },
});

export default HomeScreen;
