// Import React hooks and React Native components
import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    StatusBar,
    Image
} from 'react-native';

// Import router for navigation
import { router, Stack } from 'expo-router';

// Import styles
import styles from '@/style/onboarding.style';

// Get device width and height
const { width, height } = Dimensions.get('window')

// Array of slides data
const slides = [
    {
        id: '1',
        image: require('../../../assets/images/onboarding_1.png'),
        title: 'Discover Ikarus Stock',
        subText: 'Explore the Warehouse Logistics System Control with our intuitive app',
    },
    {
        id: '2',
        image: require('../../../assets/images/onboarding_2.png'),
        title: 'Effortless Quality Checks',
        subText: 'Ensure accuracy and enhance your workflow effortlessly',
    },
    {
        id: '3',
        image: require('../../../assets/images/onboarding_3.png'),
        title: 'QR Code Integration',
        subText: 'Experience the convenience of our QR code system, revolutionizing task management for all workers',
    },
]

// Component to render each slide 
const Slide = ({ item }) => {
    return (
        // Delete height: 300
        <View style={{ alignItems: 'center', width: width - 50, overflow: 'hidden' }}>
            <Image
                source={item?.image}
                style={{ height: '70%', width: width, resizeMode: 'cover', borderWidth: 0 }}
            />
            <View style={{ width: '100%', alignItems: 'center' }}>
                <Text style={styles.title}>{item?.title}</Text>
                <Text style={styles.subtitle}>{item?.subText}</Text>
            </View>
        </View>
    )
}

// Main component
const OnboardingPage = ({ navigation }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const ref = useRef();
    const updateCurrentSlideIndex = e => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentSlideIndex(currentIndex);
    };

    const goToNextSlide = () => {
        const nextSlideIndex = currentSlideIndex + 1;
        if (nextSlideIndex != slides.length) {
            const offset = nextSlideIndex * width * 0.86;
            ref?.current.scrollToOffset({ offset });
            setCurrentSlideIndex(currentSlideIndex + 1);
        }
    };

    const skip = () => {
        const lastSlideIndex = slides.length - 1;
        const offset = lastSlideIndex * width;
        ref?.current.scrollToOffset({ offset });
        setCurrentSlideIndex(lastSlideIndex);
    };

    const Footer = () => {
        return (
            <View
                style={{
                    justifyContent: 'space-between',
                    paddingHorizontal: 0,
                }}>
                {/* Indicator container */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 10,
                        marginBottom: 80,
                    }}>
                    {/* Render indicator */}
                    {slides.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.indicator,
                                currentSlideIndex == index && {
                                    backgroundColor: '#138AEF',
                                    width: 25,
                                },
                            ]}
                        />
                    ))}
                </View>

                {/* Render buttons */}
                <View style={{ marginBottom: 20 }}>
                    {currentSlideIndex == slides.length - 1 ? (
                        <View style={{ height: 52 }}>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => { router.replace('/pages') }}
                            >
                                <Text style={styles.btn__text}>
                                    GET STARTED
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={goToNextSlide}
                                style={styles.btn}>
                                <Text
                                    style={styles.btn__text}>
                                    NEXT
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        );
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingTop: 80, paddingBottom: 25, paddingRight: 25, paddingLeft: 25 }}>
            <Stack.Screen
                options={{
                    headerShown: false
                }}
            />
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={skip}>
                <Text
                    style={styles.skip}>
                    Skip
                </Text>
            </TouchableOpacity>
            <FlatList
                ref={ref}
                onMomentumScrollEnd={updateCurrentSlideIndex}
                showsHorizontalScrollIndicator={false}           // Potom na false pomenyat
                horizontal
                data={slides}
                pagingEnabled
                contentContainerStyle={{ paddingHorizontal: 0 }}
                renderItem={({ item }) => <Slide item={item} />}
                style={{ flex: 1 }}
            />
            <Footer />
            <StatusBar backgroundColor="#fff" />
        </SafeAreaView>
    );
}

export default OnboardingPage;
