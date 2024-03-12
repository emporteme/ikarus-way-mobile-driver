import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import * as Crypto from 'expo-crypto';
import * as ed from 'noble-ed25519';

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
            const intervalId = setInterval(signLocation, 10 * 1000);

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

            // console.log('------------------ DATA BEFORE: ', dataToSend);
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
        gap: 50
    },
});
// import {getPublicKey} from 'ed25519-hd-key'

async function getPublicKeyFromPrivateKey(privateKey: string): Promise<string> {
    // let privateKey: string;
    let publicKey: string;
    let privatekeyBit: Uint8Array;
    let publicKeyBit: Uint8Array;
    try {
        console.log('CHECK')
        console.log('CHECK 2')
        const { getPublicKey } = require('ed25519-hd-key');
        console.log('CHECK 3')
        var bytes = new Uint8Array(Math.ceil(privateKey.length / 2));
        for (var i = 0; i < bytes.length; i++)
            bytes[i] = parseInt(privateKey.substr(i * 2, 2), 16);
        console.log(bytes);

        privatekeyBit = bytes
        console.log('private key bits', privatekeyBit)

        publicKeyBit = getPublicKey(privatekeyBit);
        publicKey = getPublicKey(privatekeyBit).toString('hex').substring(2);
        console.log("PUBLICK KEY", publicKey);
        // publicKey = ""

        return publicKey;
    } catch (error) {
        console.error('Error generating public key:', error);
        throw error;
    }
}

async function signData(data: any, privateKey: any, publicKey: string) {
    try {
        // Sort the keys in the data object
        const orderedData = sortObjectKeys(data);
        console.log('------------------ DATA AFTER ORDER: ', orderedData);

        // Convert the ordered data object to a string
        const dataString = JSON.stringify(orderedData);
        console.log('------------------ DATA AFTER STRINGIFY: ', dataString);

        // Convert the data string to a hex string
        const hexMessage = jsonToUnicodeHex(JSON.parse(dataString));
        console.log('------------------ DATA AFTER HEX: ', hexMessage);

        // Sign the hex message with the private key

        const signature = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            hexMessage + privateKey
        );

        console.log('------------------ SIGNATURE: ', signature);

        return { signature, orderedData };
    } catch (error) {
        console.error('Error signing data:', error);
        throw error;
    }
}

const sortObjectKeys = (obj: any): any => {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(sortObjectKeys) as any;
    }

    const sortedObj = {} as { [key: string]: any };
    Object.keys(obj)
        .sort()
        .forEach((key) => {
            sortedObj[key] = sortObjectKeys(obj[key]);
        });

    return sortedObj as any;
};

function jsonToUnicodeHex(json: object): string {
    let jsonString = JSON.stringify(json);

    let unicodeString = '';
    for (let i = 0; i < jsonString.length; i++) {
        let charCode = jsonString.charCodeAt(i);
        if (charCode > 127) {  // Non-Latin characters
            unicodeString += '\\u' + ('0000' + charCode.toString(16)).slice(-4);
        } else {
            unicodeString += jsonString[i];
        }
    }

    // Now convert to hex
    let hexString = '';
    for (let i = 0; i < unicodeString.length; i++) {
        hexString += unicodeString.charCodeAt(i).toString(16);
    }

    return hexString;
}