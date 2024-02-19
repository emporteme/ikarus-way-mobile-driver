import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Platform, Button, Image } from 'react-native';
import { useLocalSearchParams, Stack, Link } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
// import * as DocumentPicker from 'expo-document-picker';
import { icons } from '@/constants';
import { FileInput } from '@/components';
import styles from '@/style/expenses.style';
import { OuterDropdown, InnerDropdown } from '@/components';

// const Expenses: React.FC = () => {
//     const [email, setEmail] = useState('');
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//     const [selectedTime, setSelectedTime] = useState(new Date());
//     const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
//     const [selectedFile, setSelectedFile] = useState<string | null>(null);
//     const [selectedOption, setSelectedOption] = useState<string>('Option 1');
//     const options = ['Option 1', 'Option 2', 'Option 3'];

//     const showDatePicker = () => {
//         setDatePickerVisibility(true);
//     };

//     const hideDatePicker = () => {
//         setDatePickerVisibility(false);
//     };

//     const handleDateChange = (event: any, selectedDate: Date) => {
//         if (selectedDate) {
//             setSelectedDate(selectedDate);
//         }
//         hideDatePicker();
//     };

//     const showTimePicker = () => {
//         setTimePickerVisibility(true);
//     };

//     const hideTimePicker = () => {
//         setTimePickerVisibility(false);
//     };

//     const handleTimeChange = (event: any, selectedTime: Date) => {
//         if (selectedTime) {
//             setSelectedTime(selectedTime);
//         }
//         hideTimePicker();
//     };

//     return (
//         <SafeAreaView>
//             <ScrollView>
//                 <CustomDropdown
//                     options={['Expense 1', 'Expense 2', 'Expense 3']}
//                     selectedOption={selectedOption}
//                     onSelect={setSelectedOption}
//                 />
//                 <FileInput onSelectFile={(fileUri) => setSelectedFile(fileUri)} />
//                 <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
//                     <TextInput
//                         placeholder="Email"
//                         value={email}
//                         onChangeText={(text) => setEmail(text)}
//                         style={{ flex: 1 }}
//                     />
//                     <CustomDropdown
//                         options={['Expense 1', 'Expense 2', 'Expense 3']}
//                         selectedOption={selectedOption}
//                         onSelect={setSelectedOption}
//                     />
//                 </View>
//                 <View style={{ padding: 10 }}>
//                     <TextInput
//                         placeholder="Email"
//                         value={email}
//                         onChangeText={(text) => setEmail(text)}
//                     />
//                     <TouchableOpacity onPress={showTimePicker}>
//                         <Text>Selected Time: {selectedTime.toLocaleTimeString()}</Text>
//                     </TouchableOpacity>
//                     {isTimePickerVisible && (
//                         <DateTimePicker
//                             value={selectedTime}
//                             mode="time"
//                             is24Hour={true}
//                             display="default"
//                             onChange={handleTimeChange}
//                         />
//                     )}
//                     <TouchableOpacity onPress={showDatePicker}>
//                         <Text>Selected Date: {selectedDate.toDateString()}</Text>
//                     </TouchableOpacity>
//                     {isDatePickerVisible && (
//                         <DateTimePicker
//                             value={selectedDate}
//                             mode="date"
//                             display="default"
//                             onChange={handleDateChange}
//                         />
//                     )}
//                     <Button title="Submit" onPress={() => console.log('Form submitted')} />
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// };
const ExpensesPage: React.FC = () => {
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

    return (
        <SafeAreaView style={styles.body}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: 'Expenses',
                    headerTitleAlign: 'center',
                    headerRight: () => (
                        <View style={styles.status}>
                            <Text style={styles.statusText}>Status</Text>
                        </View>
                    ),
                }}
            />
            <ScrollView>
                <View style={styles.scroll}>
                    <Text>Yo</Text>
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
                            <Text style={styles.dateText}>Selected Date: {selectedDate.toDateString()}</Text>
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
                            <Text style={styles.dateText}>Selected Time: {selectedTime.toLocaleTimeString()}</Text>
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

                    </>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default ExpensesPage;
