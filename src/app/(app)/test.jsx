import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import nacl from 'tweetnacl';
import { decodeUTF8, encodeUTF8, encodeBase64 } from 'tweetnacl-util';

export default function App() {
    const [privateKey, setPrivateKey] = useState < Uint8Array | null > (null);
    const [location, setLocation] = useState < any > (null);

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
        setPrivateKey(nacl.util.decodeUTF8(storedPrivateKey));
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
            const publicKey = await getPublicKeyFromPrivateKey(privateKey);

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

            console.log('Start');
            console.log(dataToSend.tx);

            // Sign the 'tx' object without pubkey and signature
            const { signature, orderedData } = await signData(dataToSend.tx, privateKey, publicKey);

            // Update the 'tx' object with the signature and public key
            orderedData.pubkey = publicKey;
            orderedData.signature = signature;
            dataToSend.tx = orderedData;

            // Send data to API
            await sendToAPI(dataToSend);
        } catch (error) {
            console.error('Error signing location:', error);
        }
    };

    const sendToAPI = async (dataToSend) => {
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

    return (
        <View style={styles.container}>
            <Text>Private Key: {privateKey ? nacl.util.encodeBase64(privateKey) : 'Not available'}</Text>
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

async function getPublicKeyFromPrivateKey(privateKey) {
    try {
        const publicKeyBytes = nacl.sign.keyPair.fromSeed(privateKey).publicKey;
        return nacl.util.encodeBase64(publicKeyBytes);
    } catch (error) {
        console.error('Error generating public key:', error);
        throw error;
    }
}

async function signData(data, privateKey, publicKey) {
    try {
        // Sort the keys in the data object
        const orderedData = sortObjectKeys(data);

        // Convert the ordered data object to a string
        const dataString = JSON.stringify(orderedData);

        // Convert the data string to a Uint8Array
        const dataBytes = encodeUTF8(dataString);

        // Sign the data bytes with the private key
        const signedMessage = nacl.sign(dataBytes, privateKey);

        // Extract the signature from the signed message
        const signature = nacl.util.encodeBase64(signedMessage.slice(0, nacl.sign.signatureLength));

        return { signature, orderedData };
    } catch (error) {
        console.error('Error signing data:', error);
        throw error;
    }
}

const sortObjectKeys = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(sortObjectKeys);
    }

    const sortedObj = {};
    Object.keys(obj)
        .sort()
        .forEach((key) => {
            sortedObj[key] = sortObjectKeys(obj[key]);
        });

    return sortedObj;
};