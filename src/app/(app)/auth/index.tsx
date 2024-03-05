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
import { Link, Stack, useRouter, Redirect, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Styles
import styles from '@/styles/auth.style';
import { FONT, icons } from '@/constants';

import { useSession } from '@/components/core/Context';


async function fetchAuth(email: string, password: string, signIn: (jwt: string, rt: string) => void) {
    const credentials = {
        email: email,
        password: password
    };

    try {
        const url = 'https://app-test.prometeochain.io/api/v1/auth/authenticate';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        if (!response.ok) {
            throw new Error('Failed to authenticate');
        }

        const json = await response.json();
        if (json.status === 'OK') {
            // Extract tokens from response and save
            const { jwt_token, rt_token } = json.data;

            // Call signIn function passed as parameter
            signIn(jwt_token, rt_token);
        }
        console.log(json);
        console.log(json.status);

        router.push('/orders');
    } catch (error) {
        console.error(error);
        alert('Failed to authenticate');
    }
}

// Main component
const Auth = () => {
    const { signIn } = useSession();

    // const router = useRouter();

    // useState constants for login page
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <SafeAreaView style={styles.page}>
            <Stack.Screen
                options={{
                    headerShown: false
                }}
            />
            <View style={styles.body}>
                <View style={styles.top}>
                    <Image source={icons.ikarus} style={styles.iconIkarus} />
                    <Text style={styles.regularText}>Welcome to</Text>
                    <Text style={styles.boldText}>IKARUS WAY</Text>
                </View>
                <View style={styles.middle}>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.emailText}
                    />
                    <View style={styles.passwordContainer}>
                        <TextInput
                            placeholder="Password"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            style={styles.passwordText}
                        />
                        <TouchableOpacity
                            // style={styles.eyeIconContainer}
                            onPress={togglePasswordVisibility}
                        >
                            <Image
                                source={
                                    showPassword ? icons.eyeOpened : icons.eyeClosed
                                }
                                style={styles.iconEye}
                            />
                        </TouchableOpacity>
                    </View>
                    <Link href={'/auth/forgot'} style={styles.forgot}>
                        <Text style={styles.forgotText}>Do not remember password?</Text>
                    </Link>
                </View>
                <View style={styles.bottom}>
                    {/* <Link href={'#'} asChild> */}
                    <Pressable
                        style={styles.button}
                        onPress={async () => {
                            await fetchAuth(email, password, signIn); // Call fetchAuth to get jwt and rt tokens
                            router.replace('/orders');
                        }}
                    >
                        <Text style={styles.buttonText}>LOGIN</Text>
                        <Image source={icons.arrow} style={styles.iconArrow} />
                    </Pressable>
                    {/* </Link> */}
                    <Text style={styles.bottomTextWrapper}>
                        <Text style={styles.bottomText}>By clicking on the "Login" button, you accept the terms of the </Text>
                        <Link href={'auth/privacy'}>
                            <Text style={styles.privacyText}> privacy policy</Text>
                        </Link>
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Auth;
