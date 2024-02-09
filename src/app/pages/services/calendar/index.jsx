import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';   // Was imported for testing title, and I already set it in service/_layout.jsx so here the Stack is okay. 

const CalendarPage = () => {
    return (
        <SafeAreaView>
            <Text>Calendar page</Text>
        </SafeAreaView>
    );
}

export default CalendarPage;
