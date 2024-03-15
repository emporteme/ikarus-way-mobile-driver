import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, Pressable } from 'react-native';
import { Stack, router } from 'expo-router'
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';
import elliptic, { eddsa as EdDSA } from 'elliptic';
import { hexToUint8Array } from '@/components/core/utils';
import { COLORS, FONT } from '@/constants';

// Register a device functionality | Only god and me knows how it works... (and Yeskendir)
const ec = new EdDSA('ed25519');

function toHex(arr: Uint8Array) {
    return elliptic.utils.toHex(arr).toLowerCase();
}

function fromHex(hex: string) {
    return elliptic.utils.toArray(hex.toLowerCase(), 'hex');
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


const Privkey = () => {
    const [privateKey, setPrivateKey] = useState<string | null>(null);
    const [publicKey, setPublicKey] = useState<string | null>(null);
    const [devPubKey, setDevPubKey] = useState<string | null>(null);
    const [isDevKeyRegistered, setIsDevKeyRegistered] = useState(false);
    const [location, setLocation] = useState<any>(null);

    useEffect(() => {
        // Load private key from secure storage when the component mounts
        loadPrivateKey();
    }, []);

    // useEffect(() => {
    //     if (privateKey && !isDevKeyRegistered) {
    //         signDevkey(devPubKey, privateKey);
    //         setIsDevKeyRegistered(true);
    //     }
    // }, [privateKey, isDevKeyRegistered, devPubKey]);

    const loadPrivateKey = async () => {
        // Load private key from secure storage
        const storedPrivateKey = privateKey;
        const storedPublicKey = null;

        // If private and public keys are not stored, generate a new key pair
        if (!storedPrivateKey || !storedPublicKey) {
            generateKeyPair();
        } else {
            setPrivateKey(storedPrivateKey);
            setPublicKey(storedPublicKey);
        }
    };

    const generateKeyPair = () => {
        let secret = new Uint8Array(32);

        secret = hexToUint8Array('d1cbd84a79f3b9deea82548d80a96a98a4b6d837b2e5572984d8c40b80a97b46')

        let devSecret;
        function getRandomString(n: number): string {
            const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            const charactersLength = characters.length;
            for (let i = 0; i < n; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
        devSecret = getRandomString(64);
        // Example usage:
        console.log(getRandomString(64));
        console.log('DEV PUB KEYYY: ', devSecret);

        const key = ec.keyFromSecret(secret);
        const privateKeyHex = toHex(key.getSecret());
        const publicKeyHex = toHex(key.getPublic());
        const devKeyHex = devSecret;

        // Save keys to secure storage
        // Replace with your method for saving private and public keys
        setPrivateKey(privateKeyHex);
        setPublicKey(publicKeyHex);
        setDevPubKey(devKeyHex);
    };

    const signDevkey = async (devpubkey, privateKey) => {
        const API_URL = 'http://pool.prometeochain.io/node/get_from_ledger';

        // Get current location
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.error('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        const DEVREG_SC = {
            data: {
                name: "Если ты это читаешь... ты Bcrfylth",
                devpubkey: devpubkey,
                pubkey: publicKey,
                sw: 'true',
                timestamp: location.timestamp / 1000,
            },
            tx_type: "BB00"
        }

        console.log('ONE TIME DATA: ', DEVREG_SC);

        try {
            // Sign the 'data' object
            const { signature, orderedData } = signData(DEVREG_SC.data, privateKey);

            // Add the signature to the 'data' object
            orderedData.signature = signature;

            // Update the 'tx' object with the signature and public key
            orderedData.signature = signature;
            DEVREG_SC.data = orderedData;

            console.log('------------------ ORDEREDDATA: ', orderedData);
            const data = {
                pubkey: publicKey,
                ...orderedData,
                signature: signature
            }

            console.log('------------------ data: ', data);

            const sendToPool = {
                'tx': data,
                'type': 'BB00'
            }

            const strigify = JSON.stringify(sendToPool)
            console.log('------------------ STRINGIFY: ', strigify);

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: strigify
            });

            console.log('RESPONSE: ', response);

            if (!response.ok) {
                throw new Error('Some error occurred');
            }

            console.log('Device key registered successfully');
        } catch (error) {
            console.error('Error registering device key:', error);
        }
    }

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

    // For user
    const handleSavePrivateKey = async () => {
        try {
            // await SecureStore.setItemAsync('privateKey', privateKey);
            if (privateKey && !isDevKeyRegistered) {
                signDevkey(devPubKey, privateKey);
                setIsDevKeyRegistered(true);
            }
            Alert.alert('Success', 'Private key saved successfully');
            // router.back()
        } catch (error) {
            Alert.alert('Error', 'Failed to save private key');
        }
    };

    return (
        <>
            <Stack.Screen options={{ title: 'Private Key', headerTitleAlign: 'center' }} />
            <View style={{ padding: 20 }}>
                <TextInput
                    style={{
                        borderWidth: 2,
                        borderColor: COLORS.primary,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        marginBottom: 20,
                        borderRadius: 8,
                        fontSize: 14,
                        fontFamily: FONT.medium,
                    }}
                    onChangeText={text => setPrivateKey(text)}
                    value={privateKey}
                    placeholder="Enter your private key"
                />
                <Pressable
                    onPress={handleSavePrivateKey}
                    style={{
                        backgroundColor: COLORS.primary,
                        paddingVertical: 14,
                        paddingHorizontal: 20,
                        borderRadius: 8,
                        alignItems: 'center',
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.white,
                            fontFamily: FONT.medium,
                            fontSize: 16
                        }}
                    >
                        Save Private Key
                    </Text>
                </Pressable>
            </View >
        </>
    );
};

export default Privkey;