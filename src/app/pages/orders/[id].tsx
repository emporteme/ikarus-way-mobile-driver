import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useLocalSearchParams, Stack } from 'expo-router';
import { orders } from '@/components/orders/list/data'
import { OrderType } from '@/types'

const OrderDetail = () => {
    const { id } = useLocalSearchParams();

    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: `Order #${id}`,
                    headerTitleAlign: 'center'
                }}
            />
            <Text style={{ marginHorizontal: 'auto' }}>{id} USD</Text>
        </SafeAreaView >
    );
}

export default OrderDetail