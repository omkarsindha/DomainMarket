import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  RefreshControl,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

const placeholderDomains = [
  { id: "1", name: "trendy.io", price: "$1,500" },
  { id: "2", name: "startup.net", price: "$2,800" },
  { id: "3", name: "nextbigthing.com", price: "$3,200" },
  { id: "4", name: "futuretech.ai", price: "$1,900" },
  { id: "5", name: "fastmoney.xyz", price: "$900" },
  { id: "6", name: "businessgrowth.co", price: "$1,200" },
  { id: "7", name: "investpro.com", price: "$4,500" },
  { id: "8", name: "web3explore.io", price: "$3,000" },
];

const DomainCard = ({ item }) => (
  <View style={styles.domainCard}>
    <Text style={styles.domainName}>{item.name}</Text>
    <Text style={styles.salePrice}>{item.price}</Text>
  </View>
);

const SearchTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestedDomains, setSuggestedDomains] = useState([]);
  const [error, setError] = useState(null);

  const filteredDomains = placeholderDomains.filter((domain) =>
    domain.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const searchDomainDetails = async () => {
    setLoading(true);
    setError(null);
    setSuggestedDomains([]);

    try {
      const response = await axios.get(`${API_URL}/domains/check`, {
        params: { domain: searchQuery },
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      if (response.data?.domain?.is_available === false) {
        setSuggestedDomains(response.data.suggestions || []);
        setError("Domain Unavailable.");
      } else {
        setSuggestedDomains(response.data.suggestions || []);
      }
    } catch (err) {
      setError("Failed to fetch domain data.");
    }
    setLoading(false);
  };

  const handleRefresh = async () => {
    setLoading(true);
    await searchDomainDetails();
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
          onSubmitEditing={searchDomainDetails} // Calls the searchDomainDetails function
          returnKeyType="search"
        />
        <FlatList
          data={filteredDomains}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <DomainCard item={item} />}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={handleRefresh}
              tintColor="white"
            />
          }
          ListEmptyComponent={
            !loading && <Text style={styles.emptyText}>No domains found</Text>
          }
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
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
  domainCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  emptyText: {
    color: "#c5c6c7",
    textAlign: "center",
    marginTop: 20,
  },
});

export default SearchTab;
