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
import styles from '../../style/auth.style';
import { FONT, icons } from '@/constants';

// Main component
const Auth = () => {

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
                    <Link href={'/pages'} asChild>
                        <Pressable style={styles.button}>
                            <Text style={styles.buttonText}>LOGIN</Text>
                            <Image source={icons.arrow} style={styles.iconArrow} />
                        </Pressable>
                    </Link>
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
