import { View, FlatList } from 'react-native'
import React from 'react'
import OrderCard from '@/components/pages/orders/card/OrderCard'
import EmptyOrders from '@/components/pages/orders/empty/Empty'
import { orders } from '@/api/orders'
import styles from './list.style'

// Mock data of orders


const OrderList: React.FC = () => {
    return (
        <View style={styles.body}>
            {orders.length > 0 ? (
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