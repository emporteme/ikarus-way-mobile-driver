// Main imports
import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ScrollView, Pressable, Image, Alert } from "react-native";
import { Link } from 'expo-router';
import { icons, images } from '@/constants';
import styles from './profile.style';
import { useSession } from '@/components/core/Context';
import * as SecureStore from 'expo-secure-store';

const Profile: React.FC = () => {
    const { signOut, jwtToken } = useSession();
    const [profileData, setProfileData] = useState<any>(null);
    const [privateKey, setPrivateKey] = useState<string | null>(null);

    useEffect(() => {
        fetchProfile(jwtToken);
        loadPrivateKey();
    }, [jwtToken]);

    const fetchProfile = async (jwtToken: string) => {
        const apiUrl = process.env.EXPO_PUBLIC_API_URL;

        try {
            if (!jwtToken) {
                throw new Error('JWT token not found');
            }

            const response = await fetch(`${apiUrl}users/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setProfileData(data.data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching profile:', error);
            alert('Failed to fetch profile data');
        }
    }

    const loadPrivateKey = async () => {
        const storedPrivateKey = await SecureStore.getItemAsync('privateKey');
        if (storedPrivateKey) {
            setPrivateKey(storedPrivateKey);
        }
    };

    const clearPrivateKey = async () => {
        try {
            await SecureStore.deleteItemAsync('privateKey');
            setPrivateKey(null);
            Alert.alert('Success', 'Private key cleared successfully');
        } catch (error) {
            console.error('Error clearing private key:', error);
            Alert.alert('Error', 'Failed to clear private key');
        }
    };

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView style={styles.scroll}>
                <View style={styles.page}>
                    <View style={styles.body}>
                        <>
                            <View style={styles.head}>
                                <View style={styles.profile}>
                                    <Image source={images.profile} style={styles.image} />
                                    <View style={styles.column}>
                                        <Text style={styles.name}>{profileData?.first_name}</Text>
                                        <Text style={styles.role}>{profileData?.currentRole?.name}</Text>
                                    </View>
                                </View>
                                <Link href={'/auth'} asChild>
                                    <Pressable
                                        onPress={() => {
                                            // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
                                            signOut();
                                        }}
                                    >
                                        <Image source={icons.logOut} style={styles.iconOut} />
                                    </Pressable>
                                </Link>
                            </View>
                        </>
                        <>
                            <View style={styles.footer}>
                                <View style={styles.detail}>
                                    <Text style={styles.label}>First name</Text>
                                    <Text style={styles.value}>{profileData?.first_name}</Text>
                                </View>
                                <View style={styles.detail}>
                                    <Text style={styles.label}>Last name</Text>
                                    <Text style={styles.value}>{profileData?.last_name}</Text>
                                </View>
                                <View style={styles.detail}>
                                    <Text style={styles.label}>Email</Text>
                                    <Text style={styles.value}>{profileData?.email}</Text>
                                    {/* <Text style={styles.value}>antonio@email.com</Text> */}
                                </View>
                                <View style={styles.detail}>
                                    <Text style={styles.label}>Mobile</Text>
                                    <Text style={styles.value}>{profileData?.phone_number}</Text>
                                </View>
                                <View style={styles.detail}>
                                    <View>
                                        <Text style={styles.label}>Company</Text>
                                        <Text style={styles.labelType}>(type)</Text>
                                    </View>
                                    <View style={styles.companyWrapper}>
                                        <Text style={styles.valueCompany}>{profileData?.company_name}</Text>
                                        <Text style={styles.valueType}>{profileData?.company_type}</Text>
                                    </View>
                                </View>
                                {profileData?.department ?
                                    <View style={styles.detail}>
                                        <Text style={styles.label}>Department</Text>
                                        <Text style={styles.value}>{profileData?.department}</Text>
                                    </View>
                                    : <></>}
                            </View>
                        </>
                    </View>
                </View>
                {/* Render link to Privkey page only if private key is not set */}
                {!privateKey && (
                    <Link href={'/privkey'} asChild>
                        <Pressable style={styles.button}>
                            <Text style={styles.buttonText}>Set Private Key</Text>
                        </Pressable>
                    </Link>
                )}
                {/* <Pressable onPress={clearPrivateKey}>
                    <Text>Clear Private Key</Text>
                </Pressable> */}
            </ScrollView>
        </SafeAreaView>
    );
}

export default Profile;
