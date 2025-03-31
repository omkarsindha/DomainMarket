import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  RefreshControl,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

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

const SearchTab = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleFavorite = (domain) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some(
        (item) => item.id === domain.id
      );

      if (isAlreadyFavorite) {
        return prevFavorites.filter((item) => item.id !== domain.id);
      } else {
        Alert.alert("Success", "Added to Favorites!");
        return [...prevFavorites, domain];
      }
    });
  };

  useEffect(() => {
    if (favorites.length > 0) {
      navigation.navigate("Favorites", { favorites });
    }
  }, [favorites]);

  const filteredDomains = placeholderDomains.filter((domain) =>
    domain.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const DomainCard = ({ item }) => {
    const isFavorite = favorites.some((fav) => fav.id === item.id);

    return (
      <View style={styles.domainCard}>
        <View style={styles.domainInfo}>
          <Text style={styles.domainName}>{item.name}</Text>
          <Text style={styles.salePrice}>{item.price}</Text>
        </View>
        <TouchableOpacity onPress={() => toggleFavorite(item)}>
          <FontAwesome
            name={isFavorite ? "heart" : "heart-o"}
            size={24}
            color={isFavorite ? "red" : "white"}
          />
        </TouchableOpacity>
      </View>
    );
  };

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
          value={searchQuery}
          onChangeText={setSearchQuery}
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
  domainInfo: {
    flexDirection: "column",
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
    textAlign: "center",
    color: "#c5c6c7",
    marginTop: 10,
  },
  favoritesButton: {
    backgroundColor: "#66fcf1",
    padding: 10,
    marginTop: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  favoritesButtonText: {
    color: "#0b0c10",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SearchTab;
