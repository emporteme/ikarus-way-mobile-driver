// Main imports
import React from 'react';
import { Text, View, SafeAreaView, ScrollView, Pressable, Image } from "react-native";
import { Link } from 'expo-router';

// Import constants
import { icons, images } from '@/constants';

// Import styles
import styles from '@/style/account.style';


const Profile: React.FC = () => {
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
                                        <Text style={styles.name}>Anton Antonovich</Text>
                                        <Text style={styles.role}>Driver</Text>
                                    </View>
                                </View>
                                <Link href={'/auth'} asChild>
                                    <Pressable>
                                        <Image source={icons.logOut} style={styles.iconOut} />
                                    </Pressable>
                                </Link>
                            </View>
                        </>
                        <>
                            <View style={styles.footer}>
                                <View style={styles.detail}>
                                    <Text style={styles.label}>First name</Text>
                                    <Text style={styles.value}>Anton</Text>
                                </View>
                                <View style={styles.detail}>
                                    <Text style={styles.label}>Last name</Text>
                                    <Text style={styles.value}>Antonovich</Text>
                                </View>
                                <View style={styles.detail}>
                                    <Text style={styles.label}>Email</Text>
                                    <Text style={styles.value}>antonio@email.com</Text>
                                </View>
                                <View style={styles.detail}>
                                    <Text style={styles.label}>Mobile</Text>
                                    <Text style={styles.value}>+7 (747) 066 45 12</Text>
                                </View>
                                <View style={styles.detail}>
                                    <View>
                                        <Text style={styles.label}>Company</Text>
                                        <Text style={styles.labelType}>(type)</Text>
                                    </View>
                                    <Text style={styles.value}>Logistics LTD</Text>
                                </View>
                                <View style={styles.detail}>
                                    <Text style={styles.label}>Department</Text>
                                    <Text style={styles.value}>Driver</Text>
                                </View>
                                <View style={styles.detail}>
                                    <Text style={styles.label}>Truck plate</Text>
                                    <Text style={styles.value}>KZ411ABX15</Text>
                                </View>
                                <View style={styles.detail}>
                                    <Text style={styles.label}>IoT devices</Text>
                                    <Text style={styles.value}>x 12</Text>
                                </View>
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
