// Basic imports
import React from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    SafeAreaView,
    ScrollView
} from 'react-native';

// Navigation imports
import { Link, Stack } from 'expo-router';

// Components
import ServiceList from '@/components/services/list/ServiceList';
import ServiceHeader from '@/components/services/header/ServiceHeader';

const ServicesPage = () => {
    return (
        <SafeAreaView style={{ flex: 1, marginTop: 50, marginLeft: 20, marginRight: 20 }}>
            <Stack.Screen
                options={{
                    headerShown: false,
                    title: 'Services'
                }}
            />
            <ScrollView>
                <View>
                    <ServiceHeader />
                    <ServiceList />
                    {/* <ServiceButtons /> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default ServicesPage;
