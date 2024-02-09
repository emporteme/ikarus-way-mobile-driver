// Basic imports
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

// Navigation 
import { Link } from 'expo-router';

// @expo/vector-icons
import { Feather, Ionicons } from '@expo/vector-icons';

// Styles
import styles from './account.style'

// Main component
const Account = () => {
    return (
        <View style={styles.account}>
            <Link href='/pages/services/profile' asChild>
                <TouchableOpacity style={styles.left}>
                    <View style={styles.profile}>
                        <Feather name="user" size={30} color="black" />
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.name}>Gabriela Bryndal</Text>
                        <Text style={styles.role}>Dispatcher</Text>
                    </View>
                </TouchableOpacity>
            </Link>
            <Link href='/pages/messages' asChild>
                <TouchableOpacity style={styles.notification}>
                    <Ionicons name="notifications-outline" size={20} color="#138AEF" />
                </TouchableOpacity>
            </Link>
        </View>
    );
}

export default Account;
