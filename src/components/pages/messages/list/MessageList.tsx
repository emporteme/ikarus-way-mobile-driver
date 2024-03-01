import { View, Text, FlatList } from 'react-native'
import React from 'react'
import MessageSingle from '@/components/pages/messages/card/MessageSingle'
import Empty from '@/components/pages/messages/empty/Empty'
import { messages } from '@/api/messages'
import styles from './list.style'

const MessageList: React.FC = () => {
    return (
        <View style={styles.body}>
            {messages.length > 0 ? (
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
