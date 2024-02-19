import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Platform, Button, Image } from 'react-native';
import { useLocalSearchParams, Stack, Link } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
// import * as DocumentPicker from 'expo-document-picker';
import { icons } from '@/constants';
import { CustomDropdown } from '@/components';
import { FileInput } from '@/components';
import styles from '@/style/orderDetails.style';

interface DropdownProps {
    options: string[];
    selectedOption: string;
    onSelect: (option: string) => void;
}

const Expenses: React.FC = () => {
    const [email, setEmail] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [selectedFile, setSelectedFile] = useState<string | null>(null);
    const [selectedOption, setSelectedOption] = useState<string>('Option 1');
    const options = ['Option 1', 'Option 2', 'Option 3'];

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

    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: `Expenses`,
                    headerTitleAlign: 'center',
                    headerRight: () => (

                        // Maybe I need to use router.back(), but for now this logic fits well.
                        // router.push('/pages/services')}
                        <View style={styles.status}>
                            <Text style={styles.statusText}>Status</Text>
                        </View>
                    ),
                }}
            />
            <ScrollView>
                <CustomDropdown
                    options={['Expense 1', 'Expense 2', 'Expense 3']}
                    selectedOption={selectedOption}
                    onSelect={setSelectedOption}
                />
                <FileInput onSelectFile={(fileUri) => setSelectedFile(fileUri)} />
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        style={{ flex: 1}}
                    />
                    <CustomDropdown
                        options={['Expense 1', 'Expense 2', 'Expense 3']}
                        selectedOption={selectedOption}
                        onSelect={setSelectedOption}
                    />
                </View>
                <View style={{ padding: 10 }}>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TouchableOpacity onPress={showTimePicker}>
                        <Text>Selected Time: {selectedTime.toLocaleTimeString()}</Text>
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
                    <TouchableOpacity onPress={showDatePicker}>
                        <Text>Selected Date: {selectedDate.toDateString()}</Text>
                    </TouchableOpacity>
                    {isDatePickerVisible && (
                        <DateTimePicker
                            value={selectedDate}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                        />
                    )}
                    <Button title="Submit" onPress={() => console.log('Form submitted')} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Expenses;
