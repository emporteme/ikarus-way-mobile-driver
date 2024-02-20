// Main imports
import React from 'react';
import { Text, View, SafeAreaView, ScrollView, Pressable, Image } from "react-native";
import { Link } from 'expo-router';

// Import constants
import { icons, images } from '@/constants';

// Import styles
import styles from './vehicle.style';


const Vehicle: React.FC = () => {
    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView style={styles.scroll}>
                <View style={styles.page}>
                    <View style={styles.body}>
                        <>
                        <View style={styles.head}>
                            <Image />
                        </View>
                        </>
                        <>
                            <View style={styles.footer}>
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

export default Vehicle;
