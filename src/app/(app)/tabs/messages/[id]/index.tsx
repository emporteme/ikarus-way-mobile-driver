import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams, Stack } from 'expo-router';

const DetailMessage: React.FC<{}> = () => {
    const { id } = useLocalSearchParams();
    return (
        <>
            <Stack.Screen options={{ title: 'ID ' + id }} />
            <View>
                <Text>DetailMessage with id: {id}</Text>
            </View>
        </>
    )
}

export default DetailMessage