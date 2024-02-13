import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Card from '../card/Card'
import { orders } from './data'
import styles from './list.style'

// Mock data of orders


const List = () => {
    return (
        <View style={styles.body}>
            <FlatList
                data={orders}
                contentContainerStyle={styles.content}
                columnWrapperStyle={styles.column}
                renderItem={({ item }) => <Card order={item} />}
            />
        </View>
    )
}

export default List