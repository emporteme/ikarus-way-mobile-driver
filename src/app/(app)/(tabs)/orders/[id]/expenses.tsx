import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Image, Pressable, FlatList } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import Constants from 'expo-constants';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { icons } from '@/constants';
import { OuterDropdown, InnerDropdown } from '@/components';
import { useSession } from '@/components/core/Context';
import styles from '@/styles/expenses.style';


const ExpensesPage: React.FC = () => {
    // const { id } = useLocalSearchParams();
    const id = 35
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

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
            const apiUrl = process.env.EXPO_PUBLIC_API_URL;

            const response = await fetch(`${apiUrl}carrier/orders/${id}`, {
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
            // alert('Failed to fetch order data');
        }
    }

    const [selectedOption, setSelectedOption] = useState<string>('Select an expenses');
    const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
    const [cost, setCost] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<any[]>([]); // State to store selected files

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };


    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleDateChange = (event: any, selectedDate: Date) => {
        if (selectedDate) {
            setSelectedDate(selectedDate);
        }
        hideDatePicker();
    };

    const handleTimeChange = (event: any, selectedTime: Date | undefined) => {
        const currentTime = selectedTime || new Date();
        setSelectedTime(currentTime);
        hideTimePicker();
    };

    const pickSomething = async () => {
        try {
            const docRes = await DocumentPicker.getDocumentAsync({
                type: "*/*",
                multiple: true, // Allow selecting multiple files
            });

            const formData = new FormData();
            const assets = docRes.assets;
            if (!assets) return;

            assets.forEach(file => {
                const audioFile: any = {
                    name: file.name.split(".")[0],
                    uri: file.uri,
                    type: file.mimeType,
                    size: file.size,
                };
                formData.append("audioFiles[]", audioFile); // Append each file to FormData array
            });

            console.log("NICEEE: FILES SELECTED", formData.getAll('audioFiles[]'));
            setSelectedFiles([...selectedFiles, ...assets]); // Update selectedFiles state

        } catch (error) {
            console.log("Error while selecting files: ", error);
        }
    };


    const fetchSubmit = async () => {
        const date = new Date(selectedDate);
        date.setHours(selectedTime.getHours());
        date.setMinutes(selectedTime.getMinutes());
        const timestamp = date.getTime();
        console.log('Combined Timestamp:', timestamp);

        const credentials = {
            receiptType: selectedOption,
            price: cost,
            currency: selectedCurrency,
            timestamp: timestamp,
            files: selectedFiles.map(file => file.uri),
        };
        console.log(credentials);

        const formData = new FormData();
        formData.append('receiptType', credentials.receiptType);
        formData.append('price', credentials.price);
        formData.append('currency', credentials.currency);
        formData.append('timestamp', credentials.timestamp.toString());

        // Append selected files to FormData
        credentials.files.forEach((uri, index) => {
            const fileExtension = uri.split('.').pop();
            const filename = `file_${index}.${fileExtension}`;
            const fileData: any = {
                uri,
                name: filename,
                type: `application/${fileExtension}`,
            };
            formData.append('files', fileData);
        });

        console.log('Form data:', formData);

        try {
            const url = `${apiUrl}receipts/${id}`;
            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + jwtToken,
                },
                data: formData
            });

            const json = response.data;
            console.log(json);
            console.log(json.status);
        } catch (error) {
            console.error(error);
            // alert('Failed to submit expenses');
        }
    };

    const renderFileItem = ({ item }) => {
        const handleFilePress = async () => {
            try {
                const destinationUri = `${FileSystem.documentDirectory}${item.name}`;
                await FileSystem.copyAsync({ from: item.uri, to: destinationUri });

                const contentUri = `${Constants.expoPublicDirectoryUri}/${item.name}`;
                const shareResponse = await IntentLauncher.startActivityAsync(
                    'android.intent.action.VIEW',
                    {
                        type: 'application/pdf', // Replace with the appropriate MIME type
                        data: contentUri,
                        flags: 1,
                    }
                );
            } catch (error) {
                console.error('Error opening file:', error);
            }
        };

        return (
            <>
                <TouchableOpacity onPress={handleFilePress} style={styles.fileItem}>
                    <Image source={icons.attach} style={styles.fileIcon} />
                    <Text style={styles.fileText}>{item.name}</Text>
                </TouchableOpacity>
            </>
        );
    };

    return (
        <SafeAreaView style={styles.body}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: `Order: ${id}`,
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
                        options={[
                            'Fuel',
                            'Food',
                            'Lodging',
                            'Vehicle maintenance',
                            'Toll fees',
                            'Parking fees',
                            'Vehicle rental',
                            'Vehicle insurance',
                            'Vehicle registration',
                            'Vehicle inspection',
                            'Vehicle cleaning',
                            'Vehicle repairs',
                            'Roadside assistance',
                            'Vehicle accessories',
                            'Personal protective equipment (PPE)',
                            'Mobile phone expenses',
                            'Internet expenses',
                            'GPS/navigation system',
                            'Vehicle leasing',
                            'Vehicle depreciation',
                            'Vehicle loan payments',
                            'Health insurance',
                            'Vehicle permits/licenses',
                            'Training/certification fees',
                            'Uniform expenses',
                            'Office supplies',
                            'Communication expenses',
                            'Entertainment expenses',
                            'Miscellaneous expenses',
                            'Other (specify)'
                        ]}
                        selectedOption={selectedOption}
                        onSelect={setSelectedOption}
                    />
                    <View style={styles.costContainer}>
                        <TextInput
                            placeholder="Cost..."
                            keyboardType="numeric"
                            value={cost}
                            onChangeText={(text) => setCost(text)}
                            style={styles.costText}
                        />
                        <InnerDropdown
                            options={[
                                'AUD', 'EUR', 'AZN', 'ALL', 'DZD', 'XCD', 'AOA', 'ARS', 'AMD', 'AWG', 'AFN', 'BSD', 'BDT', 'BBD', 'BHD', 'BYR', 'BYN', 'BZD', 'XOF', 'BMD', 'BGN', 'BOB', 'BAM', 'BWP', 'BRL', 'BND', 'BIF', 'BTN', 'VUV', 'GBP', 'HUF', 'VEB', 'IDR', 'VND', 'XAF', 'HTG', 'GYD', 'GMD', 'GHC', 'GTQ', 'GNF', 'GIP', 'HNL', 'HKD', 'GEL', 'DKK', 'DJF', 'DOP', 'EGP', 'ZMK', 'ZWD', 'ILS', 'INR', 'JOD', 'IQD', 'IRR', 'ISK', 'YER', 'CVE', 'KZT', 'KYD', 'KHR', 'CAD', 'QAR', 'KES', 'CYP', 'KGS', 'CNY', 'KPW', 'COP', 'KMF', 'CDF', 'CRC', 'CUP', 'KWD', 'LAK', 'LVL', 'LSL', 'ZAR', 'LRD', 'LBP', 'LYD', 'LTL', 'CHF', 'MUR', 'MRO', 'MGA', 'MOP', 'MKD', 'MWK', 'MYR', 'MVR', 'MTL', 'MAD', 'XDR', 'MXN', 'MZN', 'MDL', 'MNT', 'MMK', 'NAD', 'NPR', 'NGN', 'ANG', 'NIO', 'NZD', 'NOK', 'AED', 'OMR', 'SHP', 'PKR', 'PAB', 'PGK', 'PYG', 'PEN', 'PLN', 'RUB', 'RWF', 'RON', 'WST', 'STD', 'SAR', 'SZL', 'SCR', 'CSD', 'SGD', 'SYP', 'SKK', 'SIT', 'SBD', 'SOS', 'SDD', 'SRD', 'USD', 'SLL', 'TJS', 'THB', 'TWD', 'TZS', 'TOP', 'TTD', 'TND', 'TMM', 'TRY', 'UGX', 'UZS', 'UAH', 'UYU', 'FJD', 'PHP', 'FKP', 'XPF', 'HRK', 'CZK', 'CLP', 'SEK', 'LKR', 'ERN', 'EEK', 'ETB', 'YUM', 'KRW', 'JMD', 'JPY', 'XAG', 'XAU', 'XBA', 'XBB', 'XBC', 'XBD', 'XFO', 'XFU', 'XPD', 'XPT', 'XTS', 'XXX', 'TOKEN', 'NONE'
                            ]}
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
                        <Text style={styles.autoText}>Will be filled automatically </Text>
                        {isDatePickerVisible && (
                            <DateTimePicker
                                value={selectedDate}
                                mode="date"
                                // display="default"
                                display="spinner"
                                onChange={handleDateChange}
                            />
                        )}
                        {/* Time input */}
                        <TouchableOpacity onPress={showTimePicker} style={styles.dateContainer}>
                            <Text style={styles.dateText}>{selectedTime.toLocaleTimeString()}</Text>
                            <Image source={icons.time} style={styles.icon} />
                        </TouchableOpacity>
                        <Text style={styles.autoText}>Will be filled automatically </Text>
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
                        <TouchableOpacity onPress={pickSomething} style={styles.fileContainer}>
                            <Text style={styles.dateText}>Select File</Text>
                            <Image source={icons.attach} style={styles.icon} />
                        </TouchableOpacity>
                    </>
                    <>
                        {/* <View style={styles.fileContainer}> */}
                        <FlatList
                            data={selectedFiles}
                            renderItem={renderFileItem}
                            keyExtractor={(item) => item.uri}
                        />
                        {/* </View> */}
                    </>
                    <Pressable
                        style={styles.button}
                        onPress={async () => {
                            await fetchSubmit();
                            router.push(`/orders/${id}`);
                        }}
                    >
                        <Text style={styles.buttonText}>Submit</Text>
                        {/* <Image source={icons.arrow} style={styles.iconArrow} /> */}
                    </Pressable>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default ExpensesPage;
