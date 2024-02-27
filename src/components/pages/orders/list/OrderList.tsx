import { View, FlatList } from 'react-native'
import React from 'react'
import { OrderCard, EmptyOrders } from '@/components'
import { orders } from '@/api/orders'
import styles from './list.style'

// Mock data of orders


const OrderList: React.FC = () => {
    return (
        <View style={styles.body}>
            {orders.length > 20 ? (
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