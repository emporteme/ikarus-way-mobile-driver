import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import axios from 'axios';
import { useSession } from '@/components/core/Context';

const ChatPage = ({ route }) => {
    const { jwtToken } = useSession(); // Destructure jwtToken from useSession
    // const { receiverId } = route.params;
    const receiverId = 3; // Replace with the receiver ID from the route params
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('https://support-test.prometeochain.io/v1/company/chat/chats/all', {
                    params: { token: jwtToken, reciverid: receiverId },
                });
                const fetchedMessages = response.data.result.map((msg) => ({
                    _id: msg.message_id,
                    text: msg.message,
                    createdAt: new Date(msg.timestamp),
                    user: {
                        _id: msg.sender_id,
                    },
                }));
                setMessages(fetchedMessages);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMessages();
    }, [receiverId]);

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
        // Here you would also send the message to your backend
    }, []);

    return (
        <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
                _id: 1, // Your sender ID here
            }}
        />
    );
};

export default ChatPage;
