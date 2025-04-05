import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeTab = () => {
  const [trendingDomains, setTrendingDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchTrendingDomains = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        
        if (!token) {
          setErrorMessage('No access token found.');
          return;
        }

        const response = await fetch('http://localhost:8000/domains/trending_domains', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setErrorMessage(data.detail || 'Error fetching trending domains');
          return;
        }

        setTrendingDomains(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingDomains();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.domainItem}>
      <View style={styles.domainTextContainer}>
        <Text style={styles.domainText}>{item.domain}</Text>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.domainPrice}>${item.price.price}</Text>
        <Text style={styles.domainDuration}>
          Min Duration: {item.price.min_duration} {item.price.duration_type}
        </Text>
      </View>

      <Ionicons name="checkmark-circle" size={20} color="#66fcf1" />
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#66fcf1" />
      ) : errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : (
        <>
          <Text style={styles.title}>Trending Domains</Text>
          <FlatList
            data={trendingDomains}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.list}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f2833',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#66fcf1',
    marginBottom: 15,
  },
  list: {
    width: '100%',
  },
  domainItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#0b0c10',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#66fcf1',
    alignItems: 'center',
    minHeight: 80, // Ensure all items have the same minimum height
  },
  domainTextContainer: {
    flex: 1, // Take up remaining space
    justifyContent: 'center', 
  },
  domainText: {
    fontSize: 18,
    color: '#c5c6c7',
    flexWrap: 'wrap', // Allow the text to wrap to the next line if it's too long
    width: '60%', // Limit width of the domain name so price and duration align better
  },
  priceContainer: {
    justifyContent: 'center', // Align text vertically
    alignItems: 'flex-end',  // Align to the right
    width: '30%',  // Restrict the width of price and duration
  },
  domainPrice: {
    fontSize: 16,
    color: '#66fcf1',
  },
  domainDuration: {
    fontSize: 14,
    color: '#c5c6c7',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HomeTab;
