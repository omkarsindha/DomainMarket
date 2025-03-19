import React, { useState } from "react";
import { 
  View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Image 
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("domain"); // State for active tab

  return (
    <LinearGradient 
      colors={['#212a31', '#2e3944', '#124e66', '#748d92', '#d3d9d4']} 
      style={styles.container}
    >
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput} 
          placeholder="Search domains..." 
          placeholderTextColor="#ccc"
        />
      </View>
      
      {/* ScrollView for domain cards */}
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
      </ScrollView>

    </LinearGradient>
  );
};

const domainDeals = [
  { name: "TechDomain.com", originalPrice: 199, salePrice: 99, logo: "https://via.placeholder.com/50" },
  { name: "ShopBest.com", originalPrice: 149, salePrice: 79, logo: "https://via.placeholder.com/50" },
  { name: "NextGenAI.io", originalPrice: 299, salePrice: 149, logo: "https://via.placeholder.com/50" },
  { name: "CloudHub.net", originalPrice: 189, salePrice: 89, logo: "https://via.placeholder.com/50" },
  { name: "CryptoWorld.xyz", originalPrice: 399, salePrice: 199, logo: "https://via.placeholder.com/50" },
  { name: "EcomGiant.biz", originalPrice: 249, salePrice: 125, logo: "https://via.placeholder.com/50" },
  { name: "AIRevolution.io", originalPrice: 499, salePrice: 250, logo: "https://via.placeholder.com/50" },
];

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 10 
  },
  searchContainer: { 
    marginVertical: 10, 
    paddingHorizontal: 10 , 
    paddingLeft: 6 
  },
  searchInput: {
    borderWidth: 1, 
    borderColor: "#bbb", 
    borderRadius: 8, 
    padding: 8, 
    fontSize: 16, 
    backgroundColor: "#fff",
  },
  scrollContainer: { 
    marginVertical: 10, 
    paddingLeft: 6,
  },
  domainCard: {
    width: 85, 
    height: 85, 
    backgroundColor: "#f8f8f8", 
    borderRadius: 12, 
    alignItems: "center", 
    justifyContent: "center", 
    marginRight: 10, 
    paddingVertical: 6, 
    paddingHorizontal: 4,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 4,
  },
  domainName: { 
    fontSize: 11, 
    fontWeight: "bold", 
    textAlign: "center" 
  },
  priceContainer: { 
    flexDirection: "column", 
    alignItems: "center", 
    marginTop: 2 
  },
  originalPrice: { 
    textDecorationLine: "line-through", 
    color: "#888", 
    fontSize: 9 
  },
  salePrice: { 
    fontSize: 11, 
    fontWeight: "bold", 
    color: "#E53935" 
  },
  

});

export default HomeScreen;
