import { View, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSession } from '@/components/core/Context';
import OrderCard from '@/components/pages/orders/card/OrderCard';
import EmptyOrders from '@/components/pages/orders/empty/Empty';
import styles from './list.style';

const OrderList: React.FC<{ status: string[] }> = ({ status }) => {
    const { jwtToken } = useSession();
    const [orders, setOrders] = useState<any>([]);
    const [page, setPage] = useState(1); // New state for tracking the page
    const [loading, setLoading] = useState(false); // State to track loading status
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const apiURL = `${apiUrl}carrier/orders?page=${page}`; // Include the page in the API URL

    useEffect(() => {
        fetchOrders(jwtToken, status, page); // Include page in the dependencies
    }, [jwtToken, status, page]);

    const fetchOrders = async (jwtToken: string, status: string[], page: number) => {
        setLoading(true); // Set loading to true when fetch starts
        try {
            if (!jwtToken) {
                throw new Error('JWT token not found');
            }
            const response = await fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
                },
                body: JSON.stringify({ status_list: status })
            });

            const data = await response.json();
            setOrders(prevOrders => [...prevOrders, ...data.data]); // Append new orders to existing orders
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false); // Set loading to false when fetch completes
        }
    }

    return (
        <View style={styles.body}>
            {orders.length > 0 ? (
                <FlatList
                    data={[...orders].reverse()} // Create a reversed copy of the orders array
                    contentContainerStyle={styles.content}
                    renderItem={({ item }) => <OrderCard {...item} />}
                    onEndReached={() => setPage(prevPage => prevPage + 1)}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={loading ? <ActivityIndicator /> : null}
                />
            ) : (
                <EmptyOrders />
            )}
        </View>
    );
}

export default OrderList;
