// Main imports
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text } from "react-native";

// Routing imports
import { Stack, Link } from "expo-router";

// Components
import Account from '@/components/home/account/Account';
import QuickActions from '@/components/home/quick/Quick';

const HomePage = () => {
    return (
        <SafeAreaView style={{ flex: 1, marginTop: 50, marginLeft: 20, marginRight: 20 }}>
            <Stack.Screen
                options={{
                    // headerShadowVisible: false,
                    // headerLeft: () => (
                    //     <Feather name="notifications-outline" size={24} color="black" />
                    // ),
                    // headerRight: () => (
                    //     <Ionicons name="notifications-outline" size={24} color="black" />
                    // ),
                    headerShown: false,
                    title: 'Home'
                }}
            />
            <ScrollView>
                <View>
                    <Account />
                    <QuickActions />
                </View>
                <Link href={'/onboarding'} style={{ marginTop: 50 }}>
                    <Text>Onboarding page (Just for now) </Text>
                </Link>
                <Link href={'/auth'} style={{ marginTop: 50 }}>
                    <Text>Login page (Just for now) </Text>
                </Link>
            </ScrollView>
        </SafeAreaView>
        // <View>
        //     <Text>Home page</Text>
        //     <Link href={'/pages/services/calendar'}>
        //         <Pressable>
        //             <Text>Calendar Page</Text>
        //         </Pressable>
        //     </Link>

        //     <Link href={'/auth'}>
        //         <Text>Auth page</Text>
        //     </Link>

        //     <Link href={'/onboarding'}>
        //         <Text>Onboarding page</Text>
        //     </Link>
        // </View>
    );
}

export default HomePage;
