import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { orders } from '@/components/orders/list/data'
import { OrderType } from '@/types'

const OrderDetail = () => {
    const { id } = useLocalSearchParams();

    return (
        <View>
            <Text>{id} USD</Text>
        </View>
    );
}

export default OrderDetail