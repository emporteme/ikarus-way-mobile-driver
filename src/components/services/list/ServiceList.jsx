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
const ServiceList = () => {
    return (
        <View style={styles.container}>
            <View style={styles.quick}>

                {/* Use asChild to customize by props */}
                <Link href='/pages/qr' asChild>
                    <TouchableOpacity style={styles.action}>
                        <Image source={icons.qr} style={styles.iconImage} />
                        <Text style={styles.action_name}>Ikarus QR</Text>
                    </TouchableOpacity>
                </Link>
                <Link href='/pages/services/orders' asChild>
                    <TouchableOpacity style={styles.action}>
                        <Image source={icons.orders} style={styles.iconImage} />
                        <Text style={styles.action_name}>Orders</Text>
                    </TouchableOpacity>
                </Link>
                <Link href='/pages/services/products' asChild>
                    <TouchableOpacity style={styles.action}>
                        <Image source={icons.products} style={styles.iconImage} />
                        <Text style={styles.action_name}>Products</Text>
                    </TouchableOpacity>
                </Link>
                <Link href='/pages/services/calendar' asChild>
                    <TouchableOpacity style={styles.action}>
                        <Image source={icons.calendar} style={styles.iconImage} />
                        <Text style={styles.action_name}>Calendar</Text>
                    </TouchableOpacity>
                </Link>
            </View>
            <View style={styles.quick}>
                <Link href='/pages/services/stock' asChild>
                    <TouchableOpacity style={styles.action}>
                        <Image source={icons.stock} style={styles.iconImage} />
                        <Text style={styles.action_name}>Stock</Text>
                    </TouchableOpacity>
                </Link>
                <Link href='/pages/services/history' asChild>
                    <TouchableOpacity style={styles.action}>
                        <Image source={icons.history} style={styles.iconImage} />
                        <Text style={styles.action_name}>History</Text>
                    </TouchableOpacity>
                </Link>
                
                {/* Use asChild to customize by props */}
                <Link href='/pages/messages' asChild>
                    <TouchableOpacity style={styles.action}>
                        <Image source={icons.messages} style={styles.iconImage} />
                        <Text style={styles.action_name}>Messages</Text>
                    </TouchableOpacity>
                </Link>
                <Link href='/pages/services/map' asChild>
                    <TouchableOpacity style={styles.action}>
                        <Image source={icons.map} style={styles.iconImage} />
                        <Text style={styles.action_name}>Map</Text>
                    </TouchableOpacity>
                </Link>
            </View>
            <View style={styles.quick}>
                <Link href='/pages/services/team' asChild>
                    <TouchableOpacity style={styles.action}>
                        <Image source={icons.team} style={styles.iconImage} />
                        <Text style={styles.action_name}>Team</Text>
                    </TouchableOpacity>
                </Link>
                <Link href='/pages/services/reports' asChild>
                    <TouchableOpacity style={styles.action}>
                        <Image source={icons.reports} style={styles.iconImage} />
                        <Text style={styles.action_name}>Reports</Text>
                    </TouchableOpacity>
                </Link>
                <Link href='/pages/services/guides' asChild>
                    <TouchableOpacity style={styles.action}>
                        <Image source={icons.guides} style={styles.iconImage} />
                        <Text style={styles.action_name}>Guides</Text>
                    </TouchableOpacity>
                </Link>
                <Link href='/pages/services/profile' asChild>
                    <TouchableOpacity style={styles.action}>
                        <Image source={icons.profile} style={styles.iconImage} />
                        <Text style={styles.action_name}>Profile</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    );
}

export default ServiceList;
