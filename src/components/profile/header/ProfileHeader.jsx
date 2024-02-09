// React native imports
import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

// @expo/vector-icons
import { Feather } from '@expo/vector-icons';

// Styles
import styles from './header.style';
import { icons } from '@/constants';

// Main component
const ProfileHeader = () => {
    return (
        <View style={styles.header}>
            <View style={styles.flexH}>
                <Feather name="user" size={40} color="black" />
                <View style={styles.flexV}>
                    <Text style={styles.name}>Gabriela Bryndal</Text>
                    <Text style={styles.role}>Dispatcher</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.settings}>
                <Image source={icons.settings} styles={styles.settingsImage} />
            </TouchableOpacity>
        </View>
    );
}

export default ProfileHeader;
