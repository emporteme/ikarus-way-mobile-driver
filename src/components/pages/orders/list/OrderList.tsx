import { View, FlatList } from 'react-native'
import React from 'react'
import OrderCard from '../card/OrderCard'
import { orders } from '@/api/orders'
import styles from './list.style'

// Mock data of orders


const OrderList: React.FC = () => {
    return (
        <View style={styles.body}>
            <FlatList
                data={orders}
                contentContainerStyle={styles.content}
                renderItem={({ item }) => <OrderCard {...item} />}
            />
        </View>
    )
}

export default OrderList