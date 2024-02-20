import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import { MessageType } from '@/types';
import { icons } from '@/constants';
import styles from './single.style'

const MessageSingle: React.FC<MessageType> = (message) => {
    return (
        <Link href={`/pages/messages/${message.id}`} asChild>
            <Pressable style={styles.card}>
                <Text>{message.id}</Text>
                <Text>{message.photo}</Text>
            </Pressable>
        </Link>
    )
}

export default MessageSingle