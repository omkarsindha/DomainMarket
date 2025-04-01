import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const FavoritesTab = ({ route, navigation }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (route.params?.favorites) {
      console.log("Favorites received:", route.params.favorites);

      setFavorites((prevFavorites) => {
        const newFavorites = route.params.favorites.filter(
          (fav) =>
            !prevFavorites.some((existing) => existing.domain === fav.domain)
        );
        return [...prevFavorites, ...newFavorites];
      });
    }
  }, [route.params?.favorites]);

  const toggleFavourite = (domainName) => {
    const updatedFavorites = favorites.filter(
      (fav) => fav.domain !== domainName
    );
    setFavorites(updatedFavorites);
    navigation.setParams({ favorites: updatedFavorites });
  };

  const renderItem = ({ item }) => (
    <View style={styles.domainCard}>
      <Text style={styles.domainName}>{item.domain}</Text>
      <TouchableOpacity onPress={() => toggleFavourite(item.domain)}>
        <FontAwesome name="heart" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient colors={["#0b0c10", "#1f2833"]} style={styles.container}>
      <Text style={styles.header}>My Favorite Domains</Text>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorites yet!</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#c5c6c7",
    textAlign: "center",
    marginBottom: 10,
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
  },
  domainName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#c5c6c7",
  },
  emptyText: {
    color: "#c5c6c7",
    textAlign: "center",
    marginTop: 20,
  },
});

export default FavoritesTab;
