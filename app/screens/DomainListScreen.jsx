import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, FlatList } from 'react-native';
import axios from 'axios';

const API_URL = "http://10.0.0.138:8000"; // Your backend IP

const DomainListScreen = () => {
  const [domain, setDomain] = useState('');
  const [checkResult, setCheckResult] = useState(null);
  const [trendingTlds, setTrendingTlds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch trending TLDs when the page loads
  useEffect(() => {
    fetchTrendingTlds();
  }, []);

  // Fetch trending TLDs
  const fetchTrendingTlds = async () => {
    setLoading(true);
    setError(null); 
    setCheckResult(null); 

    try {
      const response = await axios.get(`${API_URL}/domains/trending_tlds`);
      if (response.data && Array.isArray(response.data)) {
        setTrendingTlds(response.data);
      } else {
        setError('Failed to fetch trending TLDs.');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch trending TLDs. Please try again.');
    }
    setLoading(false);
  };
  // const checkDomainAvailability = async () => {
  //   if (!domain.trim()) {
  //     setError("Please enter a domain name.");
  //     return;
  //   }

  //   setLoading(true);
  //   setError(null);  
  //   setCheckResult(null);  

  //   try {
  //     const response = await axios.get(`${API_URL}/domains/check`, {
  //       params: { domains: [domain] },
  //     });

  //     if (response.data.error) {
  //       setError(response.data.error);
  //     } else {
  //       setCheckResult(`${domain} availability: ${JSON.stringify(response.data[domain], null, 2)}`);
  //     }
  //   } catch (err) {
  //     console.error('Error fetching data:', err);
  //     setError('Failed to fetch domain data. Please try again.');
  //   }
  //   setLoading(false);
  // };
  const checkDomainAvailability = async () => {
    if (!domain.trim()) {
      setError("Please enter a domain name.");
      return;
    }
  
    setLoading(true);
    setError(null);  
    setCheckResult(null);  
  
    try {
      const response = await axios.get(`${API_URL}/domains/check`, {
        params: { domains: [domain] },
      });
  
      // Debugging log: Check the full API response
      console.log("API Response:", response.data);  // Log the entire response to inspect
  
      // Inspect if the domain's availability data is present in the response
      if (response.data && response.data[domain] !== undefined) {
        const domainAvailability = response.data[domain];
        setCheckResult(`${domain} availability: ${domainAvailability ? 'Available' : 'Not Available'}`);
      } else {
        setError('No availability data found for this domain.');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch domain data. Please try again.');
    }
    setLoading(false);
  };
  
  
  
  

  return (
    <View style={{ padding: 20 }}>
      {/* Domain Search and Availability Check Section */}
      <Text>Enter Domain Name to Check Availability:</Text>
      <TextInput 
        value={domain} 
        onChangeText={setDomain} 
        placeholder="example.com" 
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <Button title="Check Availability" onPress={checkDomainAvailability} />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {checkResult && <Text style={{ marginTop: 20 }}>{checkResult}</Text>}
      {error && <Text style={{ color: 'red', marginTop: 20 }}>{error}</Text>}

      {/* Trending TLDs Section */}
      <Text style={{ marginTop: 30 }}>Trending Top-Level Domains:</Text>
      {loading && !checkResult && <ActivityIndicator size="large" color="#0000ff" />}
      
      {trendingTlds.length > 0 && (
        <FlatList
          data={trendingTlds}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 5 }}>
              <Text>{item}</Text>
            </View>
          )}
        />
      )}

      {!loading && trendingTlds.length === 0 && !checkResult && (
        <Text>No trending domains available.</Text>
      )}
    </View>
  );
};

export default DomainListScreen;
