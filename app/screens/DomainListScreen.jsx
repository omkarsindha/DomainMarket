import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  TextInput,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
  Animated
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; 
import { Card } from "react-native-paper"; 

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

const DomainListScreen = () => {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [loading, setLoading] = useState(false); 

  
  const filteredDomains = placeholderDomains.filter(domain =>
    domain.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <LinearGradient colors={["#ffdead", "#f5fffa"]} style={styles.gradientBackground}>
      <View style={styles.container}>
        
        <TextInput
          style={styles.searchBar}
          placeholder="🔍 Search domains..."
          placeholderTextColor="black"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

       
        <FlatList
          data={filteredDomains}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => <DomainCard item={item} index={index} />}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={handleRefresh} tintColor="white" />}
          ListEmptyComponent={!loading && <Text style={styles.emptyText}>No domains found</Text>}
        />
      </View>
    </LinearGradient>
  );
};


const DomainCard = ({ item, index }) => {
  const fadeAnim = new Animated.Value(0); 
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 500,
    delay: index * 100, 
    useNativeDriver: true,
  }).start();

  return (
    <Animated.View style={[styles.animatedContainer, { opacity: fadeAnim }]}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => alert(`Selected: ${item.name}`)}>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.domainName}>{item.name}</Text>
            <Text style={styles.domainPrice}>{item.price}</Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    </Animated.View>
  );
};


const styles = StyleSheet.create({
  gradientBackground: { flex: 1 },
  container: { flex: 1, padding: 16 },
  searchBar: {
    padding: 14,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    marginBottom: 12,
    color: "white",
    fontSize: 16,
  },
  animatedContainer: { marginBottom: 10 },
  card: {
    backgroundColor: "#fffafa",
    borderRadius: 12,
    padding: 10,
    elevation: 4, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    
  },
  domainName: { fontSize: 20, fontWeight: "bold", color: "#333" },
  domainPrice: { fontSize: 14, color: "green" },
  emptyText: { textAlign: "center", marginTop: 20, fontSize: 16, color: "white" },
});

export default DomainListScreen;
