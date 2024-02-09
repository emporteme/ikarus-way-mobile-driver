// Basic imports
import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking,
    Pressable,
} from 'react-native';

// Navigation
import { Stack, Link } from "expo-router";

// Constant imports
import { COLORS, icons } from '@/constants';

// Styles
import styles from './list.style'

// Main component
const ProfileList = () => {
    return (
        <View style={styles.container}>
            <View style={styles.flexH}>
                <Text style={styles.title}>First name</Text>
                <Text style={styles.value}>Gabriela</Text>
            </View>
            <View style={styles.lineH} />
            <View style={styles.flexH}>
                <Text style={styles.title}>Last name</Text>
                <Text style={styles.value}>Bryndal</Text>
            </View>
            <View style={styles.lineH} />
            <View style={styles.flexH}>
                <Text style={styles.title}>Email</Text>
                <Text style={styles.value}>gaba@email.com</Text>
            </View>
            <View style={styles.lineH} />
            <View style={styles.flexH}>
                <Text style={styles.title}>Mobile number</Text>
                <Text style={styles.value}>+7 (747) 066 45 12</Text>
            </View>
            <View style={styles.lineH} />
            <View style={styles.flexH}>
                <Text style={styles.title}>Warehouse</Text>
                <Text style={styles.value}>WMS1</Text>
            </View>
            <View style={styles.lineH} />
            <View style={styles.flexH}>
                <Text style={styles.title}>Company</Text>
                <Text style={styles.value}>Prometeo</Text>
            </View>
        </View>
    );
}

export default ProfileList;
