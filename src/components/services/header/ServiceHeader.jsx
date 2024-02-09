// React native imports
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

// Styles
import styles from './header.style';

const ServiceHeader = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>Services</Text>
            <TouchableOpacity style={styles.languages}>
                <View style={styles.inActive}>
                    <Text style={styles.text}>Рус</Text>
                </View>
                <View style={styles.active}>
                    <Text style={styles.textActive}>Eng</Text>
                </View >
            </TouchableOpacity>
        </View>
    );
}

export default ServiceHeader;
