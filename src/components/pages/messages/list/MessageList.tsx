import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import MessageSingle from '@/components/pages/messages/card/MessageSingle';
import Empty from '@/components/pages/messages/empty/Empty';
import { useSession } from '@/components/core/AuthContext';
import styles from './list.style';

const MessageList: React.FC = () => {
    const { jwtToken } = useSession(); // Destructure jwtToken from useSession
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                if (!jwtToken) {
                    throw new Error('JWT token not found');
                }
                const response = await fetch(`https://support-test.prometeochain.io/v1/company/chat?token=${jwtToken}`, {
                    method: 'GET',
                    headers: {
                        // 'Authorization': 'Bearer ' + jwtToken,
                        'Content-Type': 'application/json',
                    },
                });

                // if (!response.ok) {
                //     throw new Error('Network response was not ok');
                // }

                const data = await response.json();
                console.log("DATA: ", data);
                setMessages([...data.result].reverse()); // Reverse the array before setting the state
                // setMessages(data.result); // Adjust this path based on your actual API response
            } catch (error) {
                console.error('Failed to fetch messages:', error);
                // Optionally, handle errors more gracefully in your UI
            }
        };

        fetchMessages();

        const intervalId = setInterval(fetchMessages, 10 * 60 * 1000); // Refresh messages every 15 seconds

        return () => clearInterval(intervalId);
    }, []);

    return (
        <View style={styles.body}>
            {messages.length > 0 ? (
                <FlatList
                    data={messages}
                    contentContainerStyle={styles.content}
                    renderItem={({ item }) => <MessageSingle {...item} />}
                // keyExtractor={item => item.id.toString()} // Ensure your messages have a unique 'id' property
                />
            ) : (
                <Empty />
            )}
        </View>
    );
};

export default MessageList;
