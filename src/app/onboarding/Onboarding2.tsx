// Import React hooks and React Native components
import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    Pressable
} from 'react-native';

// Import router for navigation
import { Link } from 'expo-router';

// Import styles
import styles from '@/style/onboarding.style';
import { images, icons } from '@/constants';


// Main component
const Onboarding2Page = () => {
    return (
        <ImageBackground
            source={images.onboarding1}
            style={styles.backgroundImage}
        >
            <View style={styles.pageContent}>
                <Image
                    source={images.logo_light}
                    style={styles.logo}
                />
                <View style={styles.footer}>
                    <Text style={styles.title}>Efficient Logistics at Your Fingertips</Text>
                    <Text style={styles.description}>Watch your delivery journey on the map in real-time, from the warehouse to your doorstep</Text>
                    <View style={styles.buttonRow}>
                        <View style={styles.progress}>
                            <View style={styles.active} />
                            <View style={styles.inActive} />
                            <View style={styles.inActive} />
                        </View>
                        <Link href={'/pages'} asChild>
                            <Pressable style={styles.button}>
                                <Text style={styles.buttonText}>Next</Text>
                                <Image
                                    source={icons.arrow}
                                    style={styles.icon}
                                />
                            </Pressable>
                        </Link>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}

export default Onboarding2Page;
