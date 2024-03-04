// Main imports
import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ScrollView, Pressable, Image } from "react-native";
import { Link } from 'expo-router';

// Import constants
import { icons, images } from '@/constants';

// Import styles
import styles from './profile.style';

import { useSession } from '@/components/core/Context';

const Profile: React.FC = () => {
    // Auth context
    const { signOut, jwtToken } = useSession(); // Destructure jwtToken from useSession

    // Data fetching
    const [profileData, setProfileData] = useState<any>(null);

    useEffect(() => {
        fetchProfile(jwtToken); // Pass jwtToken as parameter
    }, [jwtToken]); // Add jwtToken to dependency array

    const fetchProfile = async (jwtToken: string) => { // Accept jwtToken as parameter
        try {
            if (!jwtToken) {
                throw new Error('JWT token not found');
            }

            const response = await fetch('https://app-test.prometeochain.io/api/v1/users/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json(); // Parse response data
            setProfileData(data.data); // Update state with fetched data
            console.log(data);
        } catch (error) {
            console.error('Error fetching profile:', error);
            alert('Failed to fetch profile data');
        }
    }

    // console.log(jwtToken)

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
            </ScrollView>
            <Link href={'#'} asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Technical support</Text>
                    <Image source={icons.arrow} style={styles.buttonIcon} />
                </Pressable>
            </Link>
        </SafeAreaView>
    );
}

export default Profile;
