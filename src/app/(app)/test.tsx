import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Location from 'expo-location';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';

export default function App() {
    const [privateKey, setPrivateKey] = useState<string | null>(null);
    const [location, setLocation] = useState<any>(null);

    useEffect(() => {
        // Load private key from secure storage when the component mounts
        loadPrivateKey();
    }, []);

    useEffect(() => {
        // Start sending location data every 10 seconds once privateKey is available
        if (privateKey) {
            const intervalId = setInterval(signLocation, 10000);

            // Clear interval on component unmount
            return () => clearInterval(intervalId);
        }
    }, [privateKey]);

    const loadPrivateKey = async () => {
        // Load private key from secure storage
        const storedPrivateKey = await SecureStore.getItemAsync('privateKey');
        setPrivateKey(storedPrivateKey);
    };

    const signLocation = async () => {
        try {
            // Get current location
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            // Constructing the data object to match the expected structure
            const dataToSend = {
                data: {
                    coords: {
                        accuracy: location.coords.accuracy,
                        altitude: location.coords.altitude,
                        altitudeAccuracy: location.coords.altitudeAccuracy,
                        heading: location.coords.heading,
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        speed: location.coords.speed
                    },
                    mocked: location.mocked,
                    timestamp: location.timestamp
                },
                tx_type: "AA05" // Assuming this is the transaction type you want to include
            };

            // Convert location data to string for signing
            const locationData = JSON.stringify(dataToSend);

            // Sign location data with private key
            const signature = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256,
                locationData + privateKey
            );

            // Send signed location data to API
            await sendToAPI(dataToSend, signature);
        } catch (error) {
            console.error('Error signing location:', error);
        }
    };

    const sendToAPI = async (location: any, signature: string) => {
        // Send location and signature to API
        const API_URL = 'http://pool.prometeochain.io/node/get_from_ledger';
        const data = {
            location,
            signature
        };

        console.log('Data being sent to API:', data); // Logging the data being sent

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to send data to API');
            }

            console.log('Location sent successfully');
        } catch (error) {
            console.error('Error sending data to API:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Private Key: {privateKey}</Text>
            {/* <Button title="Save Private Key" onPress={() => savePrivateKey('bb5a9e04a0baaf8cda5cd8718c18d113daa752a4b47dbf10a1c6684a496b241c')} /> */}
            {/* <Button title="Sign Location and Send to API" onPress={signLocation} /> */}
            <Text>Location: {location ? JSON.stringify(location) : 'Not available'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 50
    },
});
