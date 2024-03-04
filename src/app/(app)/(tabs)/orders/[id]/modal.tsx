import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams, Stack, Link } from 'expo-router';

const Modal = () => {
    return (
        <View>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: `YO`,
                    headerTitleAlign: 'center',
                    presentation: 'modal'
                }}
            />
            <Text>Modal</Text>
        </View>
    )
}

export default Modal