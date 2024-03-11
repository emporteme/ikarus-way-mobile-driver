import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import * as Crypto from 'expo-crypto';
import { derivePath, getPublicKey } from 'ed25519-hd-key';

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
        const storedPrivateKey = "bb5a9e04a0baaf8cda5cd8718c18d113daa752a4b47dbf10a1c6684a496b241c"; // Replace with your method for loading private key
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

            // Generate key pair from private key
            // const keypair = await getkeyPair(privateKey);

            // Constructing the data object
            const dataToSend = {
                tx: {
                    pubkey: "40f18e72241580c95000fc9f5e6bf2c97f0da8a482ff5e8f6e6f18e6a3055876",
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
                    devpubkey: "40f18e72241580c95000fc9f5e6bf2c97f0da8a482ff5e8f6e6f18e6a3055876",
                    mocked: location.mocked,
                    timestamp: location.timestamp,
                    signature: '' // Placeholder for signature
                },
                type: "AA05"
            };

            // Convert data to string for signing
            const dataString = JSON.stringify(dataToSend.tx);

            // Sign data with private key
            const signature = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256,
                dataString + privateKey
            );

            // Update the signature in the data object
            dataToSend.tx.signature = signature;

            // Send data to API
            await sendToAPI(dataToSend);
        } catch (error) {
            console.error('Error signing location:', error);
        }
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

// export async function getkeyPair(seed: string) {
//     let privateKey: string;
//     let publicKey: string;
//     let privatekeyBit: Uint8Array;
//     let publicKeyBit: Uint8Array;

//     privateKey = seed;
//     var bytes = new Uint8Array(Math.ceil(privateKey.length / 2));
//     for (var i = 0; i < bytes.length; i++)
//         bytes[i] = parseInt(privateKey.substr(i * 2, 2), 16);

//     privatekeyBit = bytes;

//     publicKeyBit = getPublicKey(Buffer.from(privatekeyBit));
//     publicKey = publicKeyBit.toString('hex').substring(2);

//     return {
//         privateKey: privateKey,
//         publicKey: publicKey,
//         privatekeyBit: privatekeyBit,
//         publicKeyBit: publicKeyBit
//     };
// }