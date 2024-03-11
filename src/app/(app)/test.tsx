import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import * as Crypto from 'expo-crypto';
import { sign } from 'tweetnacl';
import { encodeBase64, decodeUTF8 } from 'tweetnacl-util';

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
            const intervalId = setInterval(signAndSendLocation, 10000);

            // Clear interval on component unmount
            return () => clearInterval(intervalId);
        }
    }, [privateKey]);

    const loadPrivateKey = async () => {
        // Load private key from secure storage
        const storedPrivateKey = "bb5a9e04a0baaf8cda5cd8718c18d113daa752a4b47dbf10a1c6684a496b241c"; // Replace with your method for loading private key
        setPrivateKey(storedPrivateKey);
    };

    const signAndSendLocation = async () => {
        try {
            // Get current location
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            // Sign location data with private key
            const signature = await signLocationData(location, privateKey);

            // Construct the data object to send to API
            const dataToSend = {
                tx: {
                    pubkey: '', // Replace with your public key
                    company_id: 1,
                    coords: {
                        accuracy: location.coords.accuracy,
                        altitude: location.coords.altitude,
                        altitudeAccuracy: location.coords.altitudeAccuracy,
                        heading: location.coords.heading,
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        speed: location.coords.speed
                    },
                    devpubkey: '', // Replace with your public key
                    mocked: location.mocked,
                    timestamp: location.timestamp,
                    signature: encodeBase64(signature) // Encode the signature to base64
                },
                type: "AA05"
            };

            // Send data to API
            await sendToAPI(dataToSend);
        } catch (error) {
            console.error('Error signing and sending location:', error);
        }
    };

    const signLocationData = async (location: any, privateKey: string) => {
        // Convert location data to string
        const dataString = JSON.stringify(location);

        // Convert private key string to Uint8Array
        const privateKeyUint8 = decodeUTF8(privateKey);

        // Sign the data with private key
        return sign(decodeUTF8(dataString), privateKeyUint8);
    };

    const sendToAPI = async (dataToSend: any) => {
        // Send data to API
        // Replace API_URL with your actual API endpoint
        const API_URL = 'https://example.com/api/location';

        console.log('DATA TO SEND: ', dataToSend)

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
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
            <Text>Location: {location ? JSON.stringify(location) : 'Not available'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
