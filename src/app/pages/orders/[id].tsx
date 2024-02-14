import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { useLocalSearchParams, Stack } from 'expo-router';
import { orders } from '@/components/orders/list/data'
import { OrderType } from '@/types'
import styles from '@/style/orderDetails.style';

const OrderDetail = () => {
    const { id } = useLocalSearchParams();

    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: `Order #${id}`,
                    headerTitleAlign: 'center',
                    headerRight: () => (

                        // Maybe I need to use router.back(), but for now this logic fits well.
                        // router.push('/pages/services')}
                        <View style={styles.status}>
                            <Text style={styles.statusText}>Edit</Text>
                        </View>
                    ),
                }}
            />
            <Text style={{ marginHorizontal: 'auto' }}>{id} USD</Text>
            <ScrollView>
                <View>
                    <Text>Pickup</Text>
                    <View></View>
                    <View></View>
                    <View></View>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

export default OrderDetail