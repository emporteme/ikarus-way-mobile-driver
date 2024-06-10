import { View, Text } from 'react-native'
import React from 'react'
import styles from './empty.style'

const EmptyOrders: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.textBlock}>
                <Text style={styles.text}>No orders found.</Text>
            </View>
        </View>
    )
}

export default EmptyOrders