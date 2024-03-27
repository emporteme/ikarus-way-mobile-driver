import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { useSession } from '@/components/core/Context';

const ChatPage = ({ route }) => {
    const { jwtToken } = useSession();
    const receiverId = 4; // Example receiver ID, replace with actual data from route.params
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null);

    useEffect(() => {
        // WebSocket connection initialization
        const socket = new WebSocket(`wss://support-test.prometeochain.io/v1/company/chat/ws?token=${jwtToken}&reciverid=${receiverId}`);

        socket.onopen = () => {
            console.log('WebSocket Connected');
        };

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            // Process the message and update state as needed
        };

        socket.onerror = (error) => {
            console.log('WebSocket Error: ', error);
        };

        socket.onclose = () => {
            console.log('WebSocket Disconnected');
        };

        setWs(socket);

        // Clean up function to close the WebSocket connection when the component unmounts
        return () => {
            socket.close();
        };
    }, [jwtToken, receiverId]);

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
        // Send the message through WebSocket
        if (ws) {
            const messageToSend = JSON.stringify(messages[0].text); // Adjust based on how your API expects the message
            ws.send(messageToSend);
        }
    }, [ws]);

    return (
        <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
                _id: 453, // Your sender ID
            }}
        />
    );
};

export default ChatPage;
