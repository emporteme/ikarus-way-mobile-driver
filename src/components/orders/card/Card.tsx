import { View, Text } from 'react-native'
import React from 'react'
import { OrderType } from '@/types';

const Card = (order: OrderType) => {
    return (
        <View>
            <Text>{order.weight}</Text>
        </View>
    )
}

export default Card