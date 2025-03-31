import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const FavoritesTab = ({ route }) => {
  const { favorites } = route.params; // Get favorites from route params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorites added</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.domainCard}>
              <Text style={styles.domainName}>{item.name}</Text>
              <Text style={styles.salePrice}>{item.price}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#1f2833",
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#66fcf1",
    marginBottom: 10,
  },
  emptyText: {
    textAlign: "center",
    color: "#c5c6c7",
    marginTop: 10,
  },
  domainCard: {
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
  salePrice: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#45a29e",
  },
});

export default FavoritesTab;
