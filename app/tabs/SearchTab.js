import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const API_URL = "http://localhost:8000";

const getToken = () => {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyYW1uaWsiLCJleHAiOjE3NDcwNzg2NzV9.ZuCVk3XSMFjLljArJ6OeNLxqSu4iS_0SRpBbUTet0gM";
};

const DomainCard = ({ item }) => {
  const [favorites, setFavorites] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);
  const navigation = useNavigation();

  const toggleFavourite = () => {
    setIsFavourite(!isFavourite);

    if (!isFavourite) {
      navigation.navigate("Favorites", { favorites: [...favorites, item] });
    } else {
      const updatedFavorites = favorites.filter((fav) => fav.id !== item.id);
      // navigation.navigate("Favorites", { favorites: updatedFavorites });
    }
  };

  return (
    <View style={styles.domainCard}>
      <View style={styles.domainHeader}>
        <Text style={styles.domainName}>{item.domain}</Text>
        <TouchableOpacity onPress={toggleFavourite}>
          <FontAwesome
            name={isFavourite ? "heart" : "heart-o"}
            size={20}
            color={isFavourite ? "red" : "#c5c6c7"}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.salePrice}>Regular Price: ${item.regular_price}</Text>
      <Text style={styles.salePrice}>Sale Price: ${item.sale_price}</Text>
      <Text style={styles.salePrice}>
        Discount: {item.sale_percentage}% off
      </Text>
    </View>
  );
};

const SearchTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [checkResult, setCheckResult] = useState(null);
  const [trendingTlds, setTrendingTlds] = useState([]);
  const [suggestedDomains, setSuggestedDomains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrendingTlds();
  }, []);

  const fetchTrendingTlds = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/domains/trending_tlds`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setTrendingTlds(response.data || []);
    } catch (err) {
      setError("Failed to fetch trending TLDs.");
    }
    setLoading(false);
  };

  const searchDomainDetails = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a domain name.");
      return;
    }
    setLoading(true);
    setError(null);
    setSuggestedDomains([]);
    try {
      const response = await axios.get(`${API_URL}/domains/check`, {
        params: { domain: searchQuery },
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (response.data?.domain?.is_available === false) {
        setCheckResult(null);
        setError("Domain Unavailable.");
        setSuggestedDomains(response.data.suggestions || []);
      } else {
        setCheckResult(response.data.domain);
        setSuggestedDomains(response.data.suggestions || []);
      }
    } catch (err) {
      setError("Failed to fetch domain data.");
    }
    setLoading(false);
  };

  return (
    <LinearGradient colors={["#0b0c10", "#1f2833"]} style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search domains..."
          placeholderTextColor="#c5c6c7"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={searchDomainDetails}
          returnKeyType="search"
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={searchDomainDetails}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator size="large" color="#66fcf1" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <ScrollView>
        {checkResult && !loading && !error && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Searched Domain:</Text>
            <DomainCard item={checkResult} />
          </View>
        )}
        {checkResult === null && error === "Domain Unavailable." && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Domain Unavailable:</Text>
            <Text style={styles.errorText}>
              Unfortunately, the domain you searched for is unavailable.
            </Text>
          </View>
        )}
        {suggestedDomains.length > 0 && !loading && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Suggested Domains:</Text>
            <FlatList
              data={suggestedDomains}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <DomainCard item={item} />}
            />
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#66fcf1",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#1f2833",
    color: "#66fcf1",
  },
  searchButton: {
    backgroundColor: "#66fcf1",
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  buttonText: {
    color: "#0b0c10",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#66fcf1",
  },
  domainCard: {
    backgroundColor: "#0b0c10",
    borderRadius: 12,
    padding: 10,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#45a29e",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  domainName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#c5c6c7",
  },
  salePrice: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#45a29e",
  },
  domainHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default SearchTab;
