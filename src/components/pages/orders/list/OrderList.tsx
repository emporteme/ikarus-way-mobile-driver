import { View, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import OrderCard from '@/components/pages/orders/card/OrderCard'
import EmptyOrders from '@/components/pages/orders/empty/Empty'
// import { orders } from '@/api/orders'
import styles from './list.style'
import { useSession } from '@/components/core/Context';

// Mock data of orders


const OrderList: React.FC<{ status: string }> = ({ status }) => {
    // Auth context
    const { jwtToken } = useSession(); // Destructure jwtToken from useSession

    // Data fetching
    const [orders, setOrders] = useState<any>([]);
    const apiURL = `https://app-test.prometeochain.io/api/v1/carrier/orders?filter=${status}`

    useEffect(() => {
        fetchOrders(jwtToken); // Pass jwtToken as parameter
    }, [jwtToken]); // Add jwtToken to dependency array

    const fetchOrders = async (jwtToken: string) => { // Accept jwtToken as parameter
        try {
            if (!jwtToken) {
                throw new Error('JWT token not found');
            }

            const response = await fetch(apiURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json(); // Parse response data
            setOrders(data.data); // Update state with fetched data
            console.log(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            alert('Failed to fetch orders data');
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