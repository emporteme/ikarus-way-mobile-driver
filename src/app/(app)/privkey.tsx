import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, Pressable } from 'react-native';
import { Stack, router } from 'expo-router'
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';
import elliptic, { eddsa as EdDSA } from 'elliptic';
import { hexToUint8Array } from '@/components/core/utils';
import { COLORS, FONT } from '@/constants';

const Privkey = () => {
    const [privateKey, setPrivateKey] = useState('');

    const handleSavePrivateKey = async () => {
        try {
            await SecureStore.setItemAsync('privateKey', privateKey);
            Alert.alert('Success', 'Private key saved successfully');
            router.back()
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