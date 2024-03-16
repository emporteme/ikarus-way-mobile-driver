import React, { useState, useEffect } from 'react';
import { SafeAreaView, Alert, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useLocalSearchParams, Stack, Link, router } from 'expo-router';
import styles from '@/styles/otp.style';
import { useSession } from '@/components/core/Context';


const ExpensesPage: React.FC = () => {
    // Auth context
    const { jwtToken } = useSession(); // Destructure jwtToken from useSession
    const { id } = useLocalSearchParams();
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    // State
    const [offerId, setOfferId] = useState('');
    const [otp, setOTP] = useState('');
    // const [isPinReady, setIsPinReady] = useState(false);
    // const maximumCodeLength = 4;

    // Wait offer ID
    useEffect(() => {
        askOfferID(jwtToken);
    }, [jwtToken]);

    const askOfferID = async (jwtToken: string) => {
        try {
            if (!jwtToken) {
                throw new Error('JWT token not found');
            }

            const response = await fetch(`${apiUrl}carrier/orders/offersByOrderCarrierId/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
                },
            });

            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }

            const data = await response.json(); // Parse response data
            console.log("Offer ID:", data.data[0].id);
            setOfferId(data.data[0].id); // Update state with fetched data
        } catch (error) {
            console.error('Error fetching offer id:', error);
            alert('Failed to fetch offer id');
        }
    }

    // This --> useEffect() when page mounts to send an OTP code request to a client
    useEffect(() => {
        askOTP(jwtToken, offerId);
    }, [jwtToken, offerId]);

    const askOTP = async (jwtToken: string, offerId: string) => {
        try {
            if (!jwtToken) {
                throw new Error('JWT token not found');
            }

            const response = await fetch(`${apiUrl}carrier/orders/sendOTP/${offerId}?recipientType=SENDER`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
                },
            });

            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }

            const data = await response.json(); // Parse response data
            console.log("Asked otp data:", data);
            // setOTP(data.data); // Update state with fetched data

        } catch (error) {
            console.error('Error asking OTP: ', error);
            Alert.alert('Error', 'Failed to asking OTP');
        }
    }

    const handleOTPSubmit = async () => {
        try {
            if (!jwtToken) {
                throw new Error('JWT token not found');
            }

            const response = await fetch(`${apiUrl}carrier/orders/startDelivery/${offerId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
                },
                body: JSON.stringify({ otp: otp })
            });

            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }

            const data = await response.json(); // Parse response data
            console.log("Sent otp data:", data);
            router.back()
        } catch (error) {
            console.error('Error submitting OTP: ', error);
            Alert.alert('Error', 'Failed to submit OTP. Please try again later.');
        }
    };

    return (
        <SafeAreaView style={styles.body}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: `OTP code: ${id}`,
                    headerTitleAlign: 'center'
                }}
            />
            <>
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter OTP code here..."
                        keyboardType="numeric"
                        maxLength={6}
                        value={otp}
                        onChangeText={setOTP}
                        placeholderTextColor={'#000'}
                    />
                    <TouchableOpacity style={styles.submitButton} onPress={handleOTPSubmit}>
                        <Text style={styles.submitButtonText}>Send</Text>
                    </TouchableOpacity>
                </>
            </>
        </SafeAreaView>
    )
}

export default ExpensesPage;
