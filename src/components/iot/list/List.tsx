import { View, FlatList } from 'react-native'
import React from 'react'
import Card from '../card/Card'
import { orders } from './data'
import styles from './list.style'


const List = () => {
    return (
        <View style={styles.body}>
            <FlatList
                data={orders}
                contentContainerStyle={styles.content}
                renderItem={({ item }) => <Card {...item} />}
            />
        </View>
    )
}

export default List