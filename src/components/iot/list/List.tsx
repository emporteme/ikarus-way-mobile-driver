import { View, FlatList } from 'react-native'
import React from 'react'
import Card from '../card/Card'
import { iots } from '../../../api/iot'
import styles from './list.style'


const List = () => {
    return (
        <View style={styles.body}>
            <FlatList
                data={iots}
                contentContainerStyle={styles.content}
                columnWrapperStyle={styles.column}
                numColumns={2}
                renderItem={({ item }) => <Card {...item} />}
            />
        </View>
    )
}

export default List