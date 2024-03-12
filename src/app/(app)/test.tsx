import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { generatePrivateKey, generatePublicKey, sign, verify } from '@/components/core/sign';
import { bytesToHex, hexToBytes } from '@noble/hashes/utils';

export default function App() {
    const [privateKey, setPrivateKey] = useState<Uint8Array | null>(null);
    const [publicKey, setPublicKey] = useState<Uint8Array | null>(null);
    const [location, setLocation] = useState<any>(null);

    useEffect(() => {
        // Generate private key and public key when the component mounts
        const newPrivateKey = generatePrivateKey();
        const newPublicKey = generatePublicKey(newPrivateKey);
        setPrivateKey(newPrivateKey);
        setPublicKey(newPublicKey);
    }, []);

    useEffect(() => {
        // Start sending location data every 10 seconds once privateKey and publicKey are available
        if (privateKey && publicKey) {
            const intervalId = setInterval(signLocation, 10 * 1000);

            // Clear interval on component unmount
            return () => clearInterval(intervalId);
        }
    }, [privateKey, publicKey]);

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
                    devpubkey: bytesToHex(publicKey!),
                    mocked: location.mocked,
                    timestamp: location.timestamp,
                },
                type: "AA05"
            };

            console.log('------------------ DATA BEFORE: ', dataToSend);

            // Sign the 'tx' object without pubkey and signature
            const { signature, orderedData } = await signData(dataToSend.tx, privateKey!, publicKey!);

            // Update the 'tx' object with the signature and public key
            const updatedData = {
                ...orderedData,
                pubkey: bytesToHex(publicKey!),
                signature: signature,
                coords: {
                    accuracy: dataToSend.tx.coords.accuracy,
                    altitude: dataToSend.tx.coords.altitude,
                    altitudeAccuracy: dataToSend.tx.coords.altitudeAccuracy,
                    heading: dataToSend.tx.coords.heading,
                    latitude: dataToSend.tx.coords.latitude,
                    longitude: dataToSend.tx.coords.longitude,
                    speed: dataToSend.tx.coords.speed
                },
                devpubkey: dataToSend.tx.devpubkey
            };
            dataToSend.tx = updatedData;

            // Send data to API
            await sendToAPI(dataToSend);
        } catch (error) {
            console.error('Error signing location:', error);
        }
    };

    const sendToAPI = async (dataToSend: any) => {
        try {
            const response = await fetch('https://api.example.com/location', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });

            if (response.ok) {
                console.log('Location data sent successfully');
            } else {
                console.error('Error sending location data:', response.status);
            }
        } catch (error) {
            console.error('Error sending location data:', error);
        }
    };

    const signData = async (data: any, privateKey: Uint8Array, publicKey: Uint8Array) => {
        // Convert data to string and then to bytes
        const dataString = JSON.stringify(data);
        const dataBytes = new TextEncoder().encode(dataString);

        // Sign the data using the private key
        const signature = bytesToHex(sign(dataBytes, privateKey));

        // Order the data according to the API requirements
        const orderedData = {
            accuracy: data.coords.accuracy,
            altitude: data.coords.altitude,
            altitudeAccuracy: data.coords.altitudeAccuracy,
            company_id: data.company_id,
            heading: data.coords.heading,
            latitude: data.coords.latitude,
            longitude: data.coords.longitude,
            mocked: data.mocked,
            speed: data.coords.speed,
            timestamp: data.timestamp,
        };

        return { signature, orderedData };
    };

    return (
        <View style={styles.container}>
            <Text>Private Key: {privateKey ? bytesToHex(privateKey) : 'Loading...'}</Text>
            <Text>Public Key: {publicKey ? bytesToHex(publicKey) : 'Loading...'}</Text>
            <Text>Location: {location ? JSON.stringify(location) : 'Loading...'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});