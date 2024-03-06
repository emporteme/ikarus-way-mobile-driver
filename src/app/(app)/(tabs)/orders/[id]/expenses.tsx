import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Platform, Button, Image } from 'react-native';
import { useLocalSearchParams, Stack, Link } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
// import * as DocumentPicker from 'expo-document-picker';
import { icons } from '@/constants';
import styles from '@/styles/expenses.style';
import { OuterDropdown, InnerDropdown } from '@/components';
import { useSession } from '@/components/core/Context';
import * as ImagePicker from 'expo-image-picker';


const ExpensesPage: React.FC = () => {
    const { id } = useLocalSearchParams();

    // Auth context
    const { jwtToken } = useSession(); // Destructure jwtToken from useSession

    // Data fetching
    const [orderData, setOrderData] = useState<any>(null);

    useEffect(() => {
        fetchOrder(jwtToken); // Pass jwtToken as parameter
    }, [jwtToken]); // Add jwtToken to dependency array

    const fetchOrder = async (jwtToken: string) => { // Accept jwtToken as parameter
        try {
            if (!jwtToken) {
                throw new Error('JWT token not found');
            }

            const response = await fetch(`http://13.40.95.183:442/api/v1/carrier/orders/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
                },
            });

            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }

            const data = await response.json(); // Parse response data
            setOrderData(data.data); // Update state with fetched data
            console.log(data);
        } catch (error) {
            console.error('Error fetching order:', error);
            alert('Failed to fetch order data');
        }
    }

    const [selectedOption, setSelectedOption] = useState<string>('Select an expenses');
    const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
    const [cost, setCost] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateChange = (event: any, selectedDate: Date) => {
        if (selectedDate) {
            setSelectedDate(selectedDate);
        }
        hideDatePicker();
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleTimeChange = (event: any, selectedTime: Date) => {
        if (selectedTime) {
            setSelectedTime(selectedTime);
        }
        hideTimePicker();
    };

    const selectFile = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (permissionResult.granted === false) {
                alert("Permission to access camera roll is required!");
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });
            console.log(result);
            // // THIS PART IS NOT WORKING || FIND A SOLUTION

            // if (!result.cancelled) {
            //     // Here you can do something with the selected image
            //     console.log(result.uri);
            // }
        } catch (error) {
            console.log('Error picking image: ', error);
        }
    };


    return (
        <SafeAreaView style={styles.body}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: `Order #${id}`,
                    headerTitleAlign: 'left',
                    headerRight: () => (
                        <View style={styles.status}>
                            <Text style={styles.statusText}>{orderData?.status}</Text>
                        </View>
                    ),
                }}
            />
            <ScrollView>
                <View style={styles.scroll}>
                    <OuterDropdown
                        options={['Food', 'Hotel', 'Heating']}
                        selectedOption={selectedOption}
                        onSelect={setSelectedOption}
                    />
                    <View style={styles.costContainer}>
                        <TextInput
                            placeholder="Cost..."
                            value={cost}
                            onChangeText={(text) => setCost(text)}
                            style={styles.costText}
                        />
                        <InnerDropdown
                            options={['USD', 'RUB', 'EUR']}
                            selectedOption={selectedCurrency}
                            onSelect={setSelectedCurrency}
                        />
                    </View>
                    <>
                        {/* Date input */}
                        <TouchableOpacity onPress={showDatePicker} style={styles.dateContainer}>
                            <Text style={styles.dateText}>{selectedDate.toDateString()}</Text>
                            <Image source={icons.calendar} style={styles.icon} />
                        </TouchableOpacity>
                        {isDatePickerVisible && (
                            <DateTimePicker
                                value={selectedDate}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}
                        {/* Time input */}
                        <TouchableOpacity onPress={showTimePicker} style={styles.dateContainer}>
                            <Text style={styles.dateText}>{selectedTime.toLocaleTimeString()}</Text>
                            <Image source={icons.time} style={styles.icon} />
                        </TouchableOpacity>
                        {isTimePickerVisible && (
                            <DateTimePicker
                                value={selectedTime}
                                mode="time"
                                is24Hour={true}
                                display="default"
                                onChange={handleTimeChange}
                            />
                        )}
                        {/* File input */}
                        <TouchableOpacity onPress={selectFile} style={styles.dateContainer}>
                            <Text style={styles.dateText}>Select File</Text>
                            <Image source={icons.attach} style={styles.icon} />
                        </TouchableOpacity>
                    </>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default ExpensesPage;
