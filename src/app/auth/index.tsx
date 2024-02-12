// Main imports for jsx
import React, { useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TextInput
} from 'react-native';

// Nagivation imports
import { Link, Stack, useRouter } from 'expo-router';

// Styles
import styles from '../../style/auth.style';
import { FONT } from '@/constants';

// Main component
const Auth = () => {

    // useState constants for login page
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // router
    const router = useRouter()

    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerShown: false
                }}
            />
            {/* <View style={styles.auth}>
                <Text style={{
                    color: '#13161C',
                    fontFamily: FONT.bold,
                    fontSize: 32,
                    letterSpacing: 1.28,
                    // marginTop: 150,
                    marginBottom: 40
                }}>
                    Login
                </Text>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.inputText}
                />

                <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.inputText}
                />

                <Link
                    href={'/auth/forgot'}
                    style={{
                        marginTop: 10,
                        marginBottom: 60
                    }}
                >
                    <Text style={styles.rememberText}>Do not remember password?</Text>
                </Link>

                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.loginButton}
                        onPress={() => {
                            router.push('/pages')
                        }}
                    >
                        <Text
                            style={styles.loginText}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.policyText}>By clicking on the "Login" button, you accept the terms of the <Text style={styles.policyBoldText}>privacy policy</Text></Text>
            </View> */}
        </SafeAreaView>
    );
}

export default Auth;
