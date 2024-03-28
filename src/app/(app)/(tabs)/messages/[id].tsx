import React, { useState, useEffect, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { useSession } from '@/components/core/AuthContext';

const ChatPage = ({ route }) => {
    const { jwtToken } = useSession();
    const receiverId = 9; // For now mock data, then replace to props --> route.params
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null);

    const fetchPreviousMessages = async (token, receiverId) => {
        const response = await fetch(`https://support-test.prometeochain.io/v1/company/chat/chats/all?token=${token}&reciverid=${receiverId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        console.log("Prev data: ", data);
        return data.result.map((msg) => ({
            _id: msg.Id,
            text: msg.Messages,
            createdAt: new Date(msg.Created * 1000),
            user: {
                _id: msg.SenderId,
                // _id: msg.from ? msg.ReciverId : msg.SenderId,
                // name: msg.from ? msg.SenderId :  msg.ReciverId,
            },
        }));
    };

    useEffect(() => {
        fetchPreviousMessages(jwtToken, receiverId)
            .then((fetchedMessages) => {
                setMessages(fetchedMessages.reverse());
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        const webSocket = new WebSocket(`wss://support-test.prometeochain.io/v1/company/chat/ws?token=${jwtToken}&reciverid=${receiverId}`);

        webSocket.onmessage = (e) => {
            const message = JSON.parse(e.data);
            console.log("Received message:", message);

            // setMessages((previousMessages) => GiftedChat.append(previousMessages, [{
            //     _id: message.Id,
            //     text: message.Messages,
            //     createdAt: new Date(message.Created * 1000),
            //     user: {
            //         _id: message.SenderId,
            //         // _id: message.from ? message.SenderId : message.ReciverId,
            //     },
            // }]));

            setMessages((previousMessages) => {
                // Remove the pending message if it exists
                const messagesWithoutPending = previousMessages.filter(m => !m.pending);

                // Append the confirmed message from the server
                const newMessage = {
                    _id: message.Id,
                    text: message.Messages,
                    createdAt: new Date(message.Created * 1000),
                    user: {
                        _id: message.SenderId,
                    },
                };

                return GiftedChat.append(messagesWithoutPending, [newMessage]);
            });
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

    // const onSend = useCallback((messages = []) => {
    //     setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    //     // Send the message through WebSocket
    //     if (ws) {
    //         const messageToSend = JSON.stringify({ message: messages[0].text });
    //         console.log("Sending message: ", messageToSend);
    //         ws.send(messageToSend);
    //     }
    // }, [ws]);

    const onSend = useCallback((messages = []) => {
        // Add a temporary local ID and a "pending" flag to the message
        const messageWithTemporaryId = {
            ...messages[0],
            _id: Math.round(Math.random() * 1000000), // Temporary unique ID
            pending: true, // Mark the message as pending until confirmed by the server
        };

        setMessages((previousMessages) => GiftedChat.append(previousMessages, [messageWithTemporaryId]));

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
