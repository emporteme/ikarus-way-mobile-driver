import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { MessageSingle, Empty } from '@/components'
import { messages } from '@/api/messages'
import styles from './list.style'

const MessageList: React.FC = () => {
    return (
        <View style={styles.body}>
            {messages.length > 20 ? (
                <FlatList
                    data={messages}
                    contentContainerStyle={styles.content}
                    renderItem={({ item }) => <MessageSingle {...item} />}
                />
            ) : (
                <Empty />
            )}
        </View>
    )
}

export default MessageList
