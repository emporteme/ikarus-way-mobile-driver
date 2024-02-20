import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { MessageSingle } from '@/components'
import { messages } from '@/api/messages'
import styles from './list.style'

const MessageList: React.FC = () => {
    return (
        <View style={styles.body}>
            <FlatList
                data={messages}
                contentContainerStyle={styles.content}
                renderItem={({ item }) => <MessageSingle {...item} />}
            />
        </View>
    )
}

export default MessageList