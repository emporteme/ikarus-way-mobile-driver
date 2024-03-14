import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import elliptic, { eddsa as EdDSA } from 'elliptic';
import { hexToUint8Array } from '@/components/core/utils';

const ec = new EdDSA('ed25519');

function toHex(arr: Uint8Array) {
    return elliptic.utils.toHex(arr).toLowerCase();
}

function fromHex(hex: string) {
    return elliptic.utils.toArray(hex.toLowerCase(), 'hex');
}

export default function App() {
    const [privateKey, setPrivateKey] = useState<string | null>(null);
    const [publicKey, setPublicKey] = useState<string | null>(null);
    const [devPubKey, setDevPubKey] = useState<string | null>(null);
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
        const storedPrivateKey = 'fe4a67b5b9a2a3e835880ba071eee6dd3ed4a6ff58458fa71cf777cfde6ea9a8'; // Replace with your method for loading private key
        const storedPublicKey = null; // Replace with your method for loading public key
        const storedDevKey = null; 

        // If private and public keys are not stored, generate a new key pair
        if (!storedPrivateKey || !storedPublicKey || !storedDevKey) {
            generateKeyPair();
        } else {
            setPrivateKey(storedPrivateKey);
            setPublicKey(storedPublicKey);
            setDevPubKey(storedDevKey)
        }
    };

    const generateKeyPair = () => {
        let secret = new Uint8Array(32);

        secret = hexToUint8Array('bb5a9e04a0baaf8cda5cd8718c18d113daa752a4b47dbf10a1c6684a496b241c')
        
        // if (window.crypto && window.crypto.getRandomValues) {
        //     secret = new Uint8Array(32);
        //     window.crypto.getRandomValues(secret);
        // } else {
        //     console.warn('Warning: Using insecure methods to generate private key');
        //     secret = [];
        //     for (let i = 0; i < 32; i++) {
        //         secret.push(Math.random() * 9007199254740991); // aka Number.MAX_SAFE_INTEGER
        //     }
        // }
        
        let devSecret = new Uint8Array(32);
        devSecret = hexToUint8Array('bb5a9e04a0baaf8cda5cd8718c18d113daa752a4b47dbf10a1c6684a496b241c')

        // if (window.crypto && window.crypto.getRandomValues) {
        //     devSecret = new Uint8Array(32);
        //     window.crypto.getRandomValues(devSecret);
        // } else {
        //     console.warn('Warning: Using insecure methods to generate private key');
        //     devSecret = [];
        //     for (let i = 0; i < 32; i++) {
        //         secret.devSecret(Math.random() * 9007199254740991); // aka Number.MAX_SAFE_INTEGER
        //     }
        // }

        const key = ec.keyFromSecret(secret);
        const privateKeyHex = toHex(key.getSecret());
        const publicKeyHex = toHex(key.getPublic());
        const devKeyHex = toHex(key.getPublic());

        // Save keys to secure storage
        // Replace with your method for saving private and public keys
        setPrivateKey(privateKeyHex);
        setPublicKey(publicKeyHex);
        setDevPubKey(devKeyHex);
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

            // Constructing the data object
            const dataToSend = {
                tx: {
                    pubkey: publicKey,
                    company_id: 1,
                    coords: {
                        accuracy: location.coords.accuracy,
                        altitude: location.coords.altitude,
                        altitudeAccuracy: location.coords.altitudeAccuracy,
                        heading: location.coords.heading,
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        speed: location.coords.speed,
                    },
                    devpubkey: devPubKey,
                    mocked: location.mocked,
                    timestamp: location.timestamp / 1000,
                },
                type: 'AA05',
            };

            console.log('------------------ DATA BEFORE: ', dataToSend);

            // Sign the 'tx' object without pubkey and signature
            const { signature, orderedData } = signData(dataToSend.tx, privateKey);

            // Update the 'tx' object with the signature and public key
            orderedData.signature = signature;
            dataToSend.tx = orderedData;

            console.log('------------------ ORDEREDDATA: ', orderedData);
            const tx = {
                pubkey: publicKey,
                ...orderedData,
                signature: signature
            }

            console.log('------------------ TX: ', tx);

            const sendToPool = {
                'tx': tx,
                'type': 'AA05'
            }

            const strigify = JSON.stringify(sendToPool)
            console.log('------------------ STRINGIFY: ', strigify);
            // Send data to API
            await sendToAPI(strigify);
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
                    'Content-Type': 'application/json',
                },
                body: dataToSend
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

    const signData = (data: any, privateKey: string) => {
        try {
            // Sort the keys in the data object
            const orderedData = sortObjectKeys(data);

            // Convert the ordered data object to a string
            const dataString = JSON.stringify(orderedData);

            // Convert the data string to an array of character codes
            //const messageArray = codifyMessage(dataString);
            const hexMessage = jsonToUnicodeHex(JSON.parse(dataString))
            // Import private key
            const key = ec.keyFromSecret(fromHex(privateKey));
            // Sign the message array with the private key
            const signature = toHex(key.sign(hexMessage).toBytes());

            return { signature, orderedData };
        } catch (error) {
            console.error('Error signing data:', error);
            throw error;
        }
    };

    const codifyMessage = (message: string) => {
        return message.split('').map((m) => m.charCodeAt(0));
    };

    return (
        <View style={styles.container}>
            <Text>Private Key: {privateKey}</Text>
            <Text>Public Key: {publicKey}</Text>
            <Text>Dev pub key Key: {devPubKey}</Text>
            <Text>Location: {location ? JSON.stringify(location) : 'Not available'}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 50,
        padding: 20,
    },
});

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