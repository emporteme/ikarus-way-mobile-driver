// Main imports for jsx
import React, { useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    Image,
    Pressable
} from 'react-native';

// Nagivation imports
import { Link, Stack, useRouter } from 'expo-router';

// Styles
import styles from '@/styles/forgotPassword.style';
import { FONT, icons } from '@/constants';

// Main component
const ForgotPage = () => {

    // useState constants for login page
    const [email, setEmail] = useState('');

    // router
    const router = useRouter()

    return (
        <SafeAreaView style={styles.page}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: 'Forgot password',
                    headerTitleAlign: 'center'
                }}
            />
            <View style={styles.body}>
                <View style={styles.middle}>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.emailText}
                    />
                </View>
                <View style={styles.bottom}>
                    <Link href={'/auth/new'} asChild>
                        <Pressable style={styles.button}>
                            <Text style={styles.buttonText}>SEND</Text>
                            <Image source={icons.arrow} style={styles.iconArrow} />
                        </Pressable>
                    </Link>
                    <Text style={styles.bottomText}>
                        You'll get an OTP code in your email. Enter it on the next page to proceed.
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default ForgotPage;
