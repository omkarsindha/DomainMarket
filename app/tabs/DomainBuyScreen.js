import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    TextInput,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "http://localhost:8000";  // ✅ Change this to your actual backend API

const DomainBuyScreen = ({ route, navigation }) => {
    const { domain } = route.params;
    const [duration, setDuration] = useState(domain.min_duration);
    const [loading, setLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(domain.price);
    const [userDetails, setUserDetails] = useState({
        phone_number: '',
        first_name: '',
        last_name: '',
        address: '',
        city: '',
        state: '',
        zip_code: '',
        country: '',
    });

    useEffect(() => {
        setTotalPrice(parseFloat((domain.price * duration).toFixed(2)));
    }, [duration, domain.price]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = await AsyncStorage.getItem("access_token");
                const response = await fetch(`${API_URL}/users/user_details`, {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${token}` },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user details");
                }

                const data = await response.json();
                if (data) {
                    setUserDetails(data);
                }
            } catch (error) {
                Alert.alert("Error", error.message);
            }
        };

        fetchUserDetails();
    }, []);

    // this handles the register button
    const handleProceed = async () => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem("access_token");
    
            // Save user details to DB
            const saveResponse = await fetch(`${API_URL}/users/user_details`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(userDetails),
            });
    
            const saveResult = await saveResponse.json();
            if (!saveResponse.ok) {
                throw new Error(saveResult.message || "Failed to save user details");
            }
    
            // Register the domain via backend (send domain and years as query params)
            const registerResponse = await fetch(
                `${API_URL}/domains/register?domain=${domain.domain}&years=${duration}`,
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );
    
            const registerResult = await registerResponse.json();
            if (!registerResponse.ok) {
                throw new Error(registerResult.message || "Domain registration failed");
            }
    
            Alert.alert("Success", "Domain successfully registered!");
            navigation.goBack(); git 
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setLoading(false);
        }
    };
    
    

    return (
        <LinearGradient colors={['#0b0c10', '#1f2833']} style={styles.container}>
            <ScrollView 
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.scrollContent} 
                showsVerticalScrollIndicator={true}
            >
                <View style={styles.card}>
                    <View style={styles.headerContainer}>
                        <Ionicons name="globe-outline" size={24} color="#66fcf1" />
                        <Text style={styles.headerText}>Domain Details</Text>
                    </View>
                    <View style={styles.divider} />
                    <Text style={styles.domainName}>{domain.domain}</Text>
                    <Text style={styles.value}>Base Price: ${domain.price.toFixed(2)}/year</Text>
                    <Text style={styles.value}>Min Duration: {domain.min_duration} years</Text>
                </View>

                <View style={styles.card}>
                    <View style={styles.headerContainer}>
                        <Ionicons name="time-outline" size={24} color="#66fcf1" />
                        <Text style={styles.headerText}>Registration Period</Text>
                    </View>
                    <View style={styles.divider} />
                    <Text style={styles.durationValue}>{duration} {duration === 1 ? "Year" : "Years"}</Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={domain.min_duration}
                        maximumValue={7}
                        step={1}
                        value={duration}
                        onValueChange={setDuration}
                        minimumTrackTintColor="#66fcf1"
                        maximumTrackTintColor="#1f2833"
                        thumbTintColor="#66fcf1"
                    />
                </View>

                <View style={styles.card}>
                    <View style={styles.headerContainer}>
                        <Ionicons name="person-outline" size={24} color="#66fcf1" />
                        <Text style={styles.headerText}>User Details</Text>
                    </View>
                    <View style={styles.divider} />
                    {Object.keys(userDetails).map((key) => (
                        <TextInput
                            key={key}
                            style={styles.input}
                            placeholder={key.replace("_", " ").toUpperCase()}
                            placeholderTextColor="#c5c6c7"
                            value={userDetails[key]}
                            onChangeText={(text) => setUserDetails({ ...userDetails, [key]: text })}
                        />
                    ))}
                </View>

                <View style={styles.card}>
                    <View style={styles.headerContainer}>
                        <Ionicons name="receipt-outline" size={24} color="#66fcf1" />
                        <Text style={styles.headerText}>Order Summary</Text>
                    </View>
                    <View style={styles.divider} />
                    <Text style={styles.value}>Domain: {domain.domain}</Text>
                    <Text style={styles.value}>Period: {duration} {duration === 1 ? "year" : "years"}</Text>
                    <View style={styles.divider} />
                    <Text style={styles.totalValue}>Total: ${totalPrice.toFixed(2)}</Text>
                </View>

                <TouchableOpacity
                    style={[styles.proceedButton, loading && styles.buttonDisabled]}
                    onPress={handleProceed}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#0b0c10" />
                    ) : (
                        <Text style={styles.proceedButtonText}>Register Domain</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: {
        flexGrow: 1, // Ensures ScrollView is scrollable when content exceeds screen size
        paddingBottom: 16, 
    },
    card: {
        backgroundColor: "#0b0c10",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#45a29e",
    },
    headerContainer: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
    headerText: { fontSize: 18, fontWeight: "bold", color: "#66fcf1", marginLeft: 8 },
    divider: { height: 1, backgroundColor: "#45a29e", marginVertical: 10 },
    domainName: { fontSize: 22, fontWeight: "bold", color: "#66fcf1", marginTop: 5 },
    value: { fontSize: 14, color: "#c5c6c7" },
    durationValue: { fontSize: 20, fontWeight: "bold", color: "#66fcf1", textAlign: "center", marginVertical: 10 },
    input: { backgroundColor: "#1f2833", color: "#c5c6c7", padding: 10, marginVertical: 5, borderRadius: 5 },
    proceedButton: { backgroundColor: "#66fcf1", paddingVertical: 16, borderRadius: 30, alignItems: "center" },
    proceedButtonText: { color: "#0b0c10", fontSize: 18, fontWeight: "bold" },
    buttonDisabled: { backgroundColor: "#45a29e", opacity: 0.7 },
});

export default DomainBuyScreen;
