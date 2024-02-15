import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// Routing imports
import { Stack, Link } from "expo-router";

const MessagesPage = () => {
    return (
        <View>
            <Text>Messages page</Text>
            <Link href={'/onboarding'} style={{ marginTop: 50 }}>
                <Text>Onboarding page (Just for now) </Text>
            </Link>
            <Link href={'/auth'} style={{ marginTop: 50 }}>
                <Text>Login page (Just for now) </Text>
            </Link>
            <Link href={'/qr'} style={{ marginTop: 50 }}>
                <Text>QR scan (Just for now) </Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({})

export default MessagesPage;
