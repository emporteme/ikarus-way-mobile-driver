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
import styles from '@/styles/newPassword.style';
import { icons } from '@/constants';

// Main component
const NewPassword = () => {

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
                    headerShown: true,
                    title: 'New password',
                    headerTitleAlign: 'center'
                }}
            />
            <View style={styles.body}>
                <View style={styles.middle}>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            placeholder="New password"
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
                    <View style={styles.passwordContainer}>
                        <TextInput
                            placeholder="Confirm password"
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
                </View>
                <View style={styles.bottom}>
                    <Link href={'/auth'} asChild>
                        <Pressable style={styles.button}>
                            <Text style={styles.buttonText}>SEND</Text>
                            <Image source={icons.arrow} style={styles.iconArrow} />
                        </Pressable>
                    </Link>
                    <Text style={styles.bottomText}>Proceed to set a new password by clicking the button above.</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default NewPassword;
