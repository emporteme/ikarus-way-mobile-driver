import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { MessageType } from '@/types';
import { icons, images } from '@/constants';
import styles from './single.style';

const MessageSingle: React.FC<any> = ({ id, Messages, Created, content }) => {
    // Function to truncate message content
    const truncateMessage = (text) => {
        if (!text) return ''; // Handle undefined or null values
        return text.length > 50 ? text.substring(0, 50) + '...' : text;
    };

    // Function to format timestamp
    const formatDate = (timestamp) => {
        if (!timestamp) return ''; // Handle undefined or null values
        const date = new Date(timestamp);
        return date.toLocaleDateString("en-US"); // Adjust locale and options as needed
    };

    return (
        <Link href={`/messages/${id}`} asChild>
            <Pressable style={styles.card}>
                <Image source={images.profile} style={styles.photo} />
                <View style={styles.content}>
                    <View style={styles.top}>
                        <Text style={styles.name}>Name</Text>
                        <View style={styles.statusContainer}>
                            <Image source={icons.check} style={styles.statusIcon} />
                            <Text style={styles.statusTime}>{formatDate(Created)}</Text>
                        </View>
                    </View>
                    <Text style={styles.contentText}>{truncateMessage(Messages)}</Text>
                </View>
            </Pressable>
        </Link>
    );
};

export default MessageSingle;
