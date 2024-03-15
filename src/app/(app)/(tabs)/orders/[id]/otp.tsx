import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Platform, Button, Image, Pressable, FlatList } from 'react-native';
import { useLocalSearchParams, Stack, Link, router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { icons } from '@/constants';
import styles from '@/styles/expenses.style';
import { OuterDropdown, InnerDropdown } from '@/components';
import { useSession } from '@/components/core/Context';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import * as DocumentPicker from 'expo-document-picker';
import Constants from 'expo-constants';


const ExpensesPage: React.FC = () => {
    // Auth context
    const { jwtToken } = useSession(); // Destructure jwtToken from useSession
    const { id } = useLocalSearchParams();
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    const fetchSubmit = async () => {

        try {

        } catch (error) {

        }
    };

    return (
        <SafeAreaView style={styles.body}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: `Order: ${id}`,
                    headerTitleAlign: 'center'
                }}
            />
            <ScrollView>
               
            </ScrollView>
        </SafeAreaView>
    )
}

export default ExpensesPage;
