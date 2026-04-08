import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    Pressable,
    ActivityIndicator
} from 'react-native';
import { Link } from 'expo-router';
import styles from '@/styles/onboarding.style';
import { images, icons } from '@/constants';

const OnboardingPage = () => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <ImageBackground
            source={images.onboarding1}
            style={styles.backgroundImage}
            onLoad={() => setImageLoaded(true)} // Set imageLoaded to true when image is loaded
        >
            {!imageLoaded && (
                <View>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}
            {imageLoaded && (
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
                            <Link href={'/onboarding/second'} asChild>
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
            )}
        </ImageBackground>
    );
}

export default OnboardingPage;
