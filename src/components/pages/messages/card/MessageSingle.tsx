import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import { MessageType } from '@/types';
import { icons, images } from '@/constants';
import styles from './single.style'

const MessageSingle: React.FC<MessageType> = (message) => {
    return (
        <Link href={`/messages/${message.id}`} asChild>
            <Pressable style={styles.card}>
                <Image source={images.profile} style={styles.photo} />
                <View style={styles.content}>
                    <View style={styles.top}>
                        <Text style={styles.name}>{message.name}</Text>
                        <View style={styles.statusContainer}>
                            <Image source={icons.check} style={styles.statusIcon} />
                            <Text style={styles.statusTime}>{message.time}</Text>
                        </View>
                    </View>
                    <Text style={styles.contentText}>{message.content}</Text>
                </View>
            </Pressable>
        </Link>
    )
}

export default MessageSingle