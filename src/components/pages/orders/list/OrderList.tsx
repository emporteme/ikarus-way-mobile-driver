import { View, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSession } from '@/components/core/Context';
import OrderCard from '@/components/pages/orders/card/OrderCard'
import EmptyOrders from '@/components/pages/orders/empty/Empty'
import styles from './list.style'

const OrderList: React.FC<{ status: string[] }> = ({ status }) => {
    // Auth context
    const { jwtToken } = useSession(); // Destructure jwtToken from useSession

    // Data fetching
    const [orders, setOrders] = useState<any>([]);
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const apiURL = `${apiUrl}carrier/orders`  // For now will be 10 orders

    useEffect(() => {
        fetchOrders(jwtToken, status); // Pass jwtToken as parameter
    }, [jwtToken, status]); // Add jwtToken to dependency array

    const fetchOrders = async (jwtToken: string, status: string[]) => {
        try {
            if (!jwtToken) {
                throw new Error('JWT token not found');
            }
            console.log('status: ', JSON.stringify({ status_list: status }))
            const response = await fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
                },
                body: JSON.stringify({ status_list: status })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json(); // Parse response data

            // Update state with fetched data
            setOrders(data.data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            // Handle error
        }
    }

    return (
        <View style={styles.body}>
            {orders?.length > 0 ? (
                <FlatList
                    data={orders}
                    contentContainerStyle={styles.content}
                    renderItem={({ item }) => <OrderCard {...item} />}
                />
            ) : (
                <EmptyOrders />
            )}
        </View>
    )
}

export default OrderList