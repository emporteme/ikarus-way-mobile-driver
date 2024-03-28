import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { useSession } from '@/components/core/AuthContext';

const ChatPage = ({ route }) => {
    const { jwtToken } = useSession();
    const receiverId = 7; // For now mock data, then replace to props --> route.params
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null);

    const fetchPreviousMessages = async (token, receiverId) => {
        const response = await fetch(`https://support-test.prometeochain.io/v1/company/chat/chats/all?token=${token}&reciverid=${receiverId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        return data.result.map((msg) => ({
            _id: msg.message_id,
            text: msg.message,
            createdAt: new Date(msg.timestamp),
            user: {
                _id: msg.sender_id,
            },
        }));
    };

    useEffect(() => {
        fetchPreviousMessages(jwtToken, receiverId)
            .then((fetchedMessages) => {
                setMessages(fetchedMessages);
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        const webSocket = new WebSocket(`wss://support-test.prometeochain.io/v1/company/chat/ws?token=${jwtToken}&reciverid=${receiverId}`);

        webSocket.onmessage = (e) => {
            const message = JSON.parse(e.data);
            console.log("Received message:", message);
            setMessages((previousMessages) => GiftedChat.append(previousMessages, [{
                _id: message.message_id,
                text: message.Messages,
                createdAt: new Date(message.timestamp),
                user: {
                    _id: message.sender_id,
                },
            }]));
        };

        webSocket.onopen = () => {
            console.log('WebSocket Connected');
        };

        webSocket.onerror = (e) => {
            console.log('WebSocket Error', e);
        };

        webSocket.onclose = (e) => {
            console.log('WebSocket Disconnected', e.reason);
        };

        setWs(webSocket);

        return () => {
            ws.close();
        };
    }, []);


    // const onSend = (newMessages = []) => {
    //     ws.send(JSON.stringify(newMessages[0])); // Adjust as needed for your API
    //     setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
    // };

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
        // Send the message through WebSocket
        if (ws) {
            const messageToSend = JSON.stringify({ message: messages[0].text });
            console.log("Sending message: ", messageToSend);
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
