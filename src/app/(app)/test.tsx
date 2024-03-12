import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { sign, getPublicKey } from '@noble/ed25519';

export default function App() {
    const [privateKey, setPrivateKey] = useState<Uint8Array | null>(null);
    const [location, setLocation] = useState<any>(null);

    useEffect(() => {
        // Load private key from secure storage when the component mounts
        loadPrivateKey();
    }, []);

    useEffect(() => {
        // Start sending location data every 10 seconds once privateKey is available
        if (privateKey) {
            const intervalId = setInterval(signLocation, 10 * 1000);

            // Clear interval on component unmount
            return () => clearInterval(intervalId);
        }
    }, [privateKey]);

    const loadPrivateKey = async () => {
        // Load private key from secure storage
        const storedPrivateKey = "bb5a9e04a0baaf8cda5cd8718c18d113daa752a4b47dbf10a1c6684a496b241c"; // Replace with your method for loading private key
        const privateKeyBytes = hexToBytes(storedPrivateKey);
        setPrivateKey(privateKeyBytes);
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

            // Generate public key from private key
            const publicKey = bytesToHex(getPublicKey(privateKey));

            // Constructing the data object
            const dataToSend = {
                tx: {
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
                    devpubkey: publicKey,
                    mocked: location.mocked,
                    timestamp: location.timestamp,
                },
                type: "AA05"
            };

            console.log('------------------ DATA BEFORE: ', dataToSend);

            // Convert tx object to string for signing
            const txString = JSON.stringify(dataToSend.tx);

            // Sign tx with private key
            const signature = bytesToHex(sign(txString, privateKey));

            // Create a new object with the tx properties and the signature
            const signedTx = {
                ...dataToSend.tx,
                signature
            };

            // Update the dataToSend object
            dataToSend.tx = signedTx;

            // Send data to API
            await sendToAPI(dataToSend);
        } catch (error) {
            console.error('Error signing location:', error);
        }
    };

    const sendToAPI = async (dataToSend: any) => {
        // Send data to API
        // Replace API_URL with your actual API endpoint
        const API_URL = 'http://pool.prometeochain.io/node/get_from_ledger';

        console.log('------------------ DATA TO SEND: ', dataToSend);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });

            console.log('RESPONSE: ', response);

            if (!response.ok) {
                throw new Error('Some shit gone wrong');
            }

            console.log('Location sent successfully');
        } catch (error) {
            console.error('Error sending data to API:', error);
        }
    };

    // Helper functions for converting between hex strings and byte arrays
    function hexToBytes(hex: string): Uint8Array {
        const bytes = new Uint8Array(hex.length / 2);
        for (let i = 0; i < hex.length; i += 2) {
            bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
        }
        return bytes;
    }

    function bytesToHex(bytes: Uint8Array): string {
        return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
    }

    return (
        <View style={styles.container}>
            <Text>Private Key: {privateKey ? bytesToHex(privateKey) : 'Not available'}</Text>
            <Text>Location: {location ? JSON.stringify(location) : 'Not available NOW'}</Text>
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