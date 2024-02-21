import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const DetailMessage: React.FC<{}> = () => {
    const { id } = useLocalSearchParams();
    return (
        <View>
            <Text>DetailMessage with id: {id}</Text>
        </View>
    )
}

export default DetailMessage