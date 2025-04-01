import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Footer from "../Components/Footer"; // Footer component
import FontAwesome from "react-native-vector-icons/FontAwesome";

const HomeTab = ({ navigation }) => {
  const [likedDomains, setLikedDomains] = useState([]);

  const domainList = [
    { id: 1, name: "example.com", price: "$10", salePrice: "$8", discount: 20 },
    { id: 2, name: "domain.net", price: "$15", salePrice: "$12", discount: 15 },
    {
      id: 3,
      name: "mydomain.org",
      price: "$20",
      salePrice: "$18",
      discount: 10,
    },
    { id: 4, name: "tech.io", price: "$25", salePrice: "$20", discount: 20 },
    { id: 5, name: "aiworld.ai", price: "$30", salePrice: "$25", discount: 15 },
    {
      id: 6,
      name: "startup.dev",
      price: "$40",
      salePrice: "$35",
      discount: 10,
    },
    {
      id: 7,
      name: "finance.app",
      price: "$35",
      salePrice: "$30",
      discount: 14,
    },
    { id: 8, name: "cool.co", price: "$12", salePrice: "$10", discount: 17 },
  ];

  const popularExtensions = [
    ".com",
    ".io",
    ".ai",
    ".net",
    ".org",
    ".dev",
    ".app",
    ".co",
    ".us",
    ".info",
    ".xyz",
    ".abc",
  ];

  const toggleLike = (id) => {
    setLikedDomains((prevLiked) =>
      prevLiked.includes(id)
        ? prevLiked.filter((item) => item !== id)
        : [...prevLiked, id]
    );
  };

  return (
    <LinearGradient
      colors={["#0b0c10", "#0b0c10", "#1f2833"]}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Domain Market</Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Trending Domains</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {domainList.map((domain) => (
            <View key={domain.id} style={styles.domainCard}>
              <Text style={styles.domainName}>{domain.name}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.originalPrice}>{domain.price}</Text>
                <Text style={styles.salePrice}>{domain.salePrice}</Text>
              </View>
              <TouchableOpacity
                onPress={() => toggleLike(domain.id)}
                style={styles.favButton}
              >
                <FontAwesome
                  name={likedDomains.includes(domain.id) ? "heart" : "heart-o"}
                  size={18}
                  color={
                    likedDomains.includes(domain.id) ? "#ff6b6b" : "#c5c6c7"
                  }
                />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Popular Extensions */}
        <Text style={styles.sectionTitle}>Popular Extensions</Text>
        <View style={styles.extensionContainer}>
          {popularExtensions.map((ext, index) => (
            <View key={index} style={styles.extensionBox}>
              <Text style={styles.extensionText}>{ext}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  logo: {
    width: 200,
    height: 80,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#66fcf1",
    marginLeft: 10,
  },
  scrollContainer: {
    marginVertical: 10,
    paddingLeft: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#66fcf1",
    marginVertical: 10,
  },
  domainCard: {
    width: 100,
    height: 100,
    backgroundColor: "#1f2833",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderWidth: 2,
    borderColor: "#66fcf1",
  },
  domainName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#66fcf1",
  },
  priceContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 4,
  },
  originalPrice: {
    textDecorationLine: "line-through",
    color: "#c5c6c7",
    fontSize: 12,
  },
  salePrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#45a29e",
  },
  favButton: {
    marginTop: 5,
  },
  extensionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  extensionBox: {
    width: "23%",
    backgroundColor: "#1f2833",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#66fcf1",
  },
  extensionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#66fcf1",
  },
});

export default HomeTab;