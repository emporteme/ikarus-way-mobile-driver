import { View, Text, FlatList } from 'react-native'
import React from 'react'
// import { IotCard } from '@/components'
import { messages } from '@/api/messages'
import styles from './list.style'

const MessageList: React.FC = () => {
    return (
        <View style={styles.body}>
            <FlatList
                data={messages}
                contentContainerStyle={styles.content}
                renderItem={({ item }) => <Text> Yo </Text>}
            />
        </View>
    )
}

export default MessageList