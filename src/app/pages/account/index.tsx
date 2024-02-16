// Main imports
import React from 'react';
import { Text, View, SafeAreaView, ScrollView, Pressable, Image } from "react-native";
import { Link } from 'expo-router';

// Import constants
import { icons } from '@/constants';


const AccountPage = () => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <View>
                        <View></View>
                        <Image source={icons.arrow} style={{ width: 24, height: 24 }} />
                    </View>
                </View>
            </ScrollView>
            <Link href={'#'}>
                <Pressable>
                    <Text>Technical support</Text>
                    <Image source={icons.arrow} style={{ width: 24, height: 24 }} />
                </Pressable>
            </Link>
        </SafeAreaView>
    );
}

export default AccountPage;
