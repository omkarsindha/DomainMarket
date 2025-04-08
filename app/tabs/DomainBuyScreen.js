import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    TextInput,
    Alert,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = "http://localhost:8000";

const DomainBuyScreen = ({ route, navigation }) => {
    const domain = route?.params?.domain ?? {
        domain: "tararara.com",
        price: 10.0,
        min_duration: 1
    };

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
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

    const formatPhoneNumber = (text) => {
        // Remove all non-numeric characters
        const cleaned = text.replace(/\D/g, '');

        // Format: (XXX) XXX-XXXX
        let formatted = cleaned;
        if (cleaned.length > 0) {
            formatted = cleaned.substring(0, 10); // Limit to 10 digits

            if (formatted.length > 6) {
                formatted = `(${formatted.substring(0, 3)}) ${formatted.substring(3, 6)}-${formatted.substring(6)}`;
            } else if (formatted.length > 3) {
                formatted = `(${formatted.substring(0, 3)}) ${formatted.substring(3)}`;
            } else if (formatted.length > 0) {
                formatted = `(${formatted}`;
            }
        }

        return formatted;
    };

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                //const token = await AsyncStorage.getItem("access_token");
                const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvbWthciIsImV4cCI6MTc0NDA3MzUxMH0.mW3Atg-xTQPCQd908X1nLZ1a7OyS2X6q6hh7mDrqxqM";
                const response = await fetch(`${API_URL}/users/user_details`, {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${token}` },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user details");
                }

                const data = await response.json();
                if (data) {
                    if (data.phone_number) {
                        data.phone_number = formatPhoneNumber(data.phone_number);
                    }
                    setUserDetails(data);
                }
            } catch (error) {
                setErrorMessage(error.message);
            }
        };

        fetchUserDetails();
    }, []);

    const handleProceedToCheckout = () => {
        console.log('Button pressed - handleProceedToCheckout called');
        const requiredFields = ['first_name', 'last_name', 'phone_number', 'address', 'city', 'state', 'zip_code', 'country'];
        const missingFields = requiredFields.filter(field => !userDetails[field]);

        if (missingFields.length > 0) {
            setErrorMessage("Please fill in all required fields.");
            return;
        }

        // Clear any previous error message
        setErrorMessage('');

        // Proceed with navigation
        navigation.navigate('CheckoutScreen', {
            domain,
            userDetails
        });
    };

    const InputField = ({ label, value, onChangeText, placeholder, keyboardType = 'default', width = '100%' }) => (
        <View style={[styles.inputContainer, { width }]}>
            <Text style={styles.inputLabel}>{label}</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#c5c6c7"
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
            />
        </View>
    );

    return (
        <LinearGradient colors={['#0b0c10', '#1f2833']} style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.keyboardAvoid}
                >
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color="#66fcf1" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Register Domain</Text>
                        <View style={{ width: 24 }} />
                    </View>

                    <View style={styles.card}>
                        <View style={styles.headerContainer}>
                            <Ionicons name="globe-outline" size={24} color="#66fcf1" />
                            <Text style={styles.headerText}>Domain Details</Text>
                        </View>
                        <View style={styles.divider} />
                        <Text style={styles.domainName}>{domain.domain}</Text>
                        <Text style={styles.value}>Base Price: ${domain.price.toFixed(2)}/year</Text>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.headerContainer}>
                            <Ionicons name="person-outline" size={24} color="#66fcf1" />
                            <Text style={styles.headerText}>User Details</Text>
                        </View>
                        <View style={styles.divider} />

                        <View style={styles.rowContainer}>
                            <InputField
                                label="FIRST NAME"
                                value={userDetails.first_name}
                                onChangeText={(text) => setUserDetails({ ...userDetails, first_name: text })}
                                placeholder="First Name"
                                width="48%"
                            />
                            <InputField
                                label="LAST NAME"
                                value={userDetails.last_name}
                                onChangeText={(text) => setUserDetails({ ...userDetails, last_name: text })}
                                placeholder="Last Name"
                                width="48%"
                            />
                        </View>

                        <InputField
                            label="PHONE NUMBER"
                            value={userDetails.phone_number}
                            onChangeText={(text) => setUserDetails({ ...userDetails, phone_number: formatPhoneNumber(text) })}
                            placeholder="(XXX) XXX-XXXX"
                            keyboardType="phone-pad"
                        />

                        <InputField
                            label="ADDRESS"
                            value={userDetails.address}
                            onChangeText={(text) => setUserDetails({ ...userDetails, address: text })}
                            placeholder="Street Address"
                        />

                        <InputField
                            label="CITY"
                            value={userDetails.city}
                            onChangeText={(text) => setUserDetails({ ...userDetails, city: text })}
                            placeholder="City"
                        />

                        <View style={styles.rowContainer}>
                            <InputField
                                label="STATE"
                                value={userDetails.state}
                                onChangeText={(text) => setUserDetails({ ...userDetails, state: text })}
                                placeholder="State"
                                width="48%"
                            />
                            <InputField
                                label="ZIP CODE"
                                value={userDetails.zip_code}
                                onChangeText={(text) => setUserDetails({ ...userDetails, zip_code: text })}
                                placeholder="Zip Code"
                                keyboardType="numeric"
                                width="48%"
                            />
                        </View>

                        <InputField
                            label="COUNTRY"
                            value={userDetails.country}
                            onChangeText={(text) => setUserDetails({ ...userDetails, country: text })}
                            placeholder="Country"
                        />
                    </View>

                    {/* Error message display */}
                    {errorMessage ? (
                        <View style={styles.errorContainer}>
                            <Ionicons name="alert-circle" size={20} color="#ff5252" />
                            <Text style={styles.errorText}>{errorMessage}</Text>
                        </View>
                    ) : null}

                    <TouchableOpacity
                        style={[styles.proceedButton, loading && styles.buttonDisabled]}
                        onPress={handleProceedToCheckout}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#0b0c10" />
                        ) : (
                            <Text style={styles.proceedButtonText}>Proceed to Checkout</Text>
                        )}
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    safeArea: {
        flex: 1,
    },
    keyboardAvoid: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 20,
        color: '#66fcf1',
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: "#0b0c10",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#45a29e",
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
    },
    headerText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#66fcf1",
        marginLeft: 8
    },
    divider: {
        height: 1,
        backgroundColor: "#45a29e",
        marginVertical: 10
    },
    domainName: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#66fcf1",
        marginTop: 5
    },
    value: {
        fontSize: 14,
        color: "#c5c6c7"
    },
    inputContainer: {
        marginBottom: 10,
    },
    inputLabel: {
        fontSize: 12,
        color: '#66fcf1',
        marginBottom: 5,
    },
    input: {
        backgroundColor: "#1f2833",
        color: "#c5c6c7",
        padding: 10,
        borderRadius: 5
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 82, 82, 0.1)',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    errorText: {
        color: '#ff5252',
        marginLeft: 8,
        fontSize: 14,
    },
    proceedButton: {
        backgroundColor: "#66fcf1",
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: "center",
        marginTop: 5,
        zIndex: 10
    },
    proceedButtonText: {
        color: "#0b0c10",
        fontSize: 18,
        fontWeight: "bold"
    },
    buttonDisabled: {
        backgroundColor: "#45a29e",
        opacity: 0.7
    },
});

export default DomainBuyScreen;