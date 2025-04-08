import React, { useState, useEffect } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet, ActivityIndicator,
    TextInput, Alert, SafeAreaView, ScrollView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    CardElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';

const API_URL = "http://localhost:8000";
const STRIPE_PUBLISHABLE_KEY = "pk_test_51R9XAeGHJspoiet77Q8Lw53Ccvl2Pj3U6MUVs2F1m1mK87XOBWxfw8ulHV1zMQneOF61BACZsKTh0lqGr3eCeuxZ000i9C7cWH";
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const CheckoutScreen = ({ route, navigation }) => {
    const { domain, userDetails } = route?.params || {};
    const [duration, setDuration] = useState(domain?.min_duration || 1);
    const [loading, setLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(domain?.price || 0);
    const [errorMessage, setErrorMessage] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');

    useEffect(() => {
        if (domain?.price) {
            setTotalPrice(parseFloat((domain.price * duration).toFixed(2)));
        }
    }, [duration, domain?.price]);

    const StripePaymentForm = () => {
        const stripe = useStripe();
        const elements = useElements();

        const handleSubmit = async () => {
            if (!stripe || !elements) {
                setErrorMessage("Payment service loading..."); return;
            }
            if (!nameOnCard.trim()) {
                setErrorMessage("Please enter the name on the card.");
                Alert.alert("Input Required", "Please enter the name on the card."); return;
            }

            const cardElement = elements.getElement(CardElement);
            if (!cardElement) {
                setErrorMessage("Payment field not ready."); console.error("CardElement not found"); return;
            }

            setLoading(true);
            setErrorMessage('');

            try {
                console.log("Creating Payment Method...");
                const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
                    type: 'card',
                    card: cardElement,
                    billing_details: {
                        name: nameOnCard,
                        email: userDetails?.email,
                    },
                });

                if (pmError) { throw new Error(pmError.message || "Failed to validate card details."); }

                console.log("Payment Method Created:", paymentMethod.id);

                // const token = await AsyncStorage.getItem("access_token");
                const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvbWthciIsImV4cCI6MTc0NDA3MzUxMH0.mW3Atg-xTQPCQd908X1nLZ1a7OyS2X6q6hh7mDrqxqM"; // Example
                if (!token) throw new Error("Authentication required.");

                console.log("Sending payment details to backend...");
                const response = await fetch(`${API_URL}/domains/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                    body: JSON.stringify({
                        domain: domain.domain,
                        years: duration,
                        paymentMethodId: paymentMethod.id,
                        amount: totalPrice,
                    }),
                });
                const result = await response.json();
                if (!response.ok) throw new Error(result.error || `Server error: ${response.status}`);

                console.log("Backend registration successful:", result);
                Alert.alert("Registration Initiated!", `Processing registration for ${domain?.domain}.`);
                navigation.navigate('Home');

            } catch (err) {
                console.error("Payment Process Error:", err);
                setErrorMessage(err.message || 'An unexpected error occurred.');
                Alert.alert("Payment Error", err.message || 'An unexpected error occurred.');
            } finally {
                setLoading(false);
            }
        };

        const cardElementOptions = {
            hidePostalCode: true,
            style: {
                base: {
                    color: '#c5c6c7',
                    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto, Open Sans, Segoe UI, sans-serif',
                    fontSize: '16px',
                    '::placeholder': { color: '#aab7c4' },
                },
                invalid: { color: '#ff5252', iconColor: '#ff5252' },
            },
        };

        return (
            <View>
                <Text style={styles.inputLabel}>Name on Card</Text>
                <TextInput
                    placeholder="John M. Doe"
                    value={nameOnCard}
                    onChangeText={setNameOnCard}
                    style={styles.input}
                    placeholderTextColor="#aab7c4"
                    autoCapitalize="words"
                    autoCorrect={false}
                />

                <Text style={styles.inputLabel}>Card Details</Text>
                <View style={styles.elementContainer}>
                    <CardElement options={cardElementOptions} />
                </View>

                <TouchableOpacity
                    style={[styles.payButton, loading && styles.buttonDisabled]}
                    onPress={handleSubmit}
                    disabled={loading || !stripe || !elements}
                >
                    {loading ? (<ActivityIndicator color="#0b0c10" />)
                        : (<Text style={styles.payButtonText}>Pay ${totalPrice.toFixed(2)}</Text>)}
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="#66fcf1" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Checkout</Text>
                    <View style={{ width: 24 }} />
                </View>
                <View style={styles.card}>
                    <View style={styles.headerContainer}>
                        <Ionicons name="globe-outline" size={20} color="#66fcf1" />
                        <Text style={styles.headerText}>Domain Details</Text>
                    </View>
                    <View style={styles.divider} />
                    <Text style={styles.value}>Domain: {domain?.domain || 'N/A'}</Text>
                    <Text style={styles.durationValue}>{duration} Year{duration > 1 ? 's' : ''}</Text>
                    <Slider
                        minimumValue={domain?.min_duration || 1}
                        maximumValue={7}
                        step={1}
                        value={duration}
                        onValueChange={setDuration}
                        style={styles.slider}
                        minimumTrackTintColor="#66fcf1"
                        maximumTrackTintColor="#45a29e"
                        thumbTintColor="#66fcf1"
                    />
                    <View style={styles.divider} />
                    <Text style={styles.totalValue}>Total: ${totalPrice.toFixed(2)}</Text>
                </View>
                <View style={styles.card}>
                    <View style={styles.headerContainer}>
                        <Ionicons name="card-outline" size={20} color="#66fcf1" />
                        <Text style={styles.headerText}>Payment Details</Text>
                    </View>
                    <View style={styles.divider} />
                    <Elements stripe={stripePromise}>
                        <StripePaymentForm />
                    </Elements>
                </View>

                {errorMessage ? (
                    <View style={styles.errorContainer}>
                        <Ionicons name="alert-circle-outline" size={18} color="#ff5252" />
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    </View>
                ) : null}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#1f2833" },
    scrollView: { paddingBottom: 40 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, paddingHorizontal: 16, paddingTop: Platform.OS === 'android' ? 25 : 16 },
    backButton: { padding: 8 },
    headerTitle: { fontSize: 20, color: '#66fcf1', fontWeight: 'bold' },
    card: { backgroundColor: "#0b0c10", borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: "#45a29e", marginHorizontal: 16 },
    headerContainer: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
    headerText: { fontSize: 18, fontWeight: "bold", color: "#66fcf1", marginLeft: 8 },
    divider: { height: 1, backgroundColor: "#45a29e", marginVertical: 12 },
    value: { fontSize: 15, color: "#c5c6c7", marginBottom: 8, lineHeight: 22 },
    durationValue: { fontSize: 20, fontWeight: "bold", color: "#66fcf1", textAlign: "center", marginVertical: 10 },
    slider: { marginVertical: 10, height: 40 },
    totalValue: { fontSize: 20, fontWeight: "bold", color: "#66fcf1", textAlign: "right", marginTop: 8 },
    inputLabel: { color: '#c5c6c7', fontSize: 14, marginBottom: 6, marginLeft: 2 },
    input: { backgroundColor: "#1f2833", color: "#c5c6c7", paddingHorizontal: 12, paddingVertical: 12, borderRadius: 8, height: 48, marginBottom: 16, fontSize: 16, borderWidth: 1, borderColor: "#45a29e" },
    elementContainer: {
        backgroundColor: '#1f2833',
        paddingHorizontal: 12,
        paddingVertical: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#45a29e',
        height: 48,
        justifyContent: 'center',
        marginBottom: 20,
    },
    payButton: { backgroundColor: "#66fcf1", paddingVertical: 15, borderRadius: 30, alignItems: "center", marginTop: 10, minHeight: 50, justifyContent: 'center' },
    payButtonText: { color: "#0b0c10", fontSize: 18, fontWeight: "bold" },
    buttonDisabled: { backgroundColor: "#45a29e", opacity: 0.7 },
    errorContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 82, 82, 0.15)', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8, marginHorizontal: 16, marginBottom: 16, borderLeftWidth: 3, borderLeftColor: '#ff5252' },
    errorText: { color: '#ff8a8a', marginLeft: 10, fontSize: 14, flex: 1 },
});

export default CheckoutScreen;