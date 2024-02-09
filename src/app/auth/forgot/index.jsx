// Basic imports
import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';

// Navigation system imports
import { Stack, Link, useRouter } from 'expo-router';

// Styles
import styles from '@/style/forgotPassword.style';

// Main component
const ForgotPage = () => {

    // useState constants for login page
    const [email, setEmail] = useState('');

    // router
    const router = useRouter()

    return (
        <SafeAreaView style={styles.root}>
            <Stack.Screen
                options={{
                    headerShown: false
                }}
            />
            <View style={styles.forgot}>
                <Text style={styles.title}>Password recovery</Text>
                <Text style={styles.description}>Enter your email address or phone number and we will send you a link to reset your password</Text>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.inputText}
                />
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.submitButton}
                        onPress={() => {
                            router.push('/auth')
                        }}
                    >
                        <Text
                            style={styles.submitText}>
                            Send
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default ForgotPage;
