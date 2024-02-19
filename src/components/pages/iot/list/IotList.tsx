import { View, FlatList } from 'react-native'
import React from 'react'
import IotCard from '../card/IotCard'
import { iots } from '@/api/iot'
import styles from './list.style'


const IotList: React.FC = () => {
    return (
        <View style={styles.body}>
            <FlatList
                data={iots}
                contentContainerStyle={styles.content}
                columnWrapperStyle={styles.column}
                numColumns={2}
                renderItem={({ item }) => <IotCard {...item} />}
            />
        </View>
    )
}

export default IotList