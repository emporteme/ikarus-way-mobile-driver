import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Stack } from 'expo-router';
import styles from '@/styles/account.style';
import { images } from '@/constants';

export default () => {
    const [isEnglish, setIsEnglish] = useState(true);

    const toggleLanguage = () => {
        setIsEnglish(!isEnglish);
    };

    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerShadowVisible: true,
                title: 'Account',
                headerTitleAlign: 'center',
                // headerLeft: () => (
                //     <View>
                //         <Image source={images.logo_dark} style={styles.logo} />
                //     </View>
                // ),
                // headerRight: () => (
                //     <TouchableOpacity onPress={toggleLanguage} style={styles.languages}>
                //         <View>
                //             <Text style={!isEnglish ? styles.active : styles.inActive}>Рус</Text>
                //         </View>
                //         <View>
                //             <Text style={isEnglish ? styles.active : styles.inActive}>Eng</Text>
                //         </View>
                //     </TouchableOpacity>
                // ),
            }}
        />
    );
};
