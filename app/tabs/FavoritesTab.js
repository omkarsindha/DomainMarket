import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

const FavoritesTab = ({ route }) => {
  const { favorites = [] } = route?.params || {};

  const toggleFavorite = (item) => {
    console.log("Toggling favorite for", item);
  };

  const renderItem = ({ item }) => {
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
    <LinearGradient colors={["#0b0c10", "#1f2833"]} style={styles.container}>
      {" "}
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No favorites yet</Text>
        }
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
    color: "#c5c6c7",
    textAlign: "center",
    marginTop: 20,
  },
});

export default FavoritesTab;
