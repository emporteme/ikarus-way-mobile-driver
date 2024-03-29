import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { GiftedChat, IMessage, User, MessageText, Bubble, InputToolbar, Send, SystemMessage } from 'react-native-gifted-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONT } from '@/constants';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { InChatFileTransfer } from '@/components';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import { useSession } from '@/components/core/AuthContext';


const ChatPage = () => {
    const { jwtToken } = useSession();
    const { id } = useLocalSearchParams();
    const receiverId = id; // For now mock data, then replace to props --> route.params
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null);
    const [profileData, setProfileData] = useState<any>(null);
    const insets = useSafeAreaInsets();

    // Getting sender profile data --> ID
    useEffect(() => {
        fetchProfile(jwtToken);
    }, [jwtToken]);

    const fetchProfile = async (jwtToken: string) => {
        const apiUrl = process.env.EXPO_PUBLIC_API_URL;

        try {
            if (!jwtToken) {
                throw new Error('JWT token not found');
            }

            const response = await fetch(`${apiUrl}users/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
                },
            });

            const data = await response.json();
            setProfileData(data.data);
        } catch (error) {
            console.error('Error fetching profile:', error);
            alert('Failed to fetch profile data');
        }
    }

    // Getting previous messages list
    useEffect(() => {
        if (profileData) {
            fetchPreviousMessages(jwtToken, receiverId, profileData.id)
                .then((fetchedMessages) => {
                    setMessages(fetchedMessages.reverse());
                })
                .catch((error) => console.error(error));
        }
    }, [jwtToken, receiverId, profileData]);

    const fetchPreviousMessages = async (token, receiverId, senderId) => {
        const response = await fetch(`https://support-test.prometeochain.io/v1/company/chat/chats/all?token=${token}&reciverid=${receiverId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        return data.result.map((msg) => ({
            _id: msg.Id,
            text: msg.Messages,
            createdAt: new Date(msg.Created * 1000),
            user: {
                _id: msg.SenderId === senderId ? senderId : receiverId,
            },
        }));
    };

    // Web Socket logic.
    useEffect(() => {
        const webSocket = new WebSocket(`wss://support-test.prometeochain.io/v1/company/chat/ws?token=${jwtToken}&reciverid=${receiverId}`);

        webSocket.onmessage = (e) => {
            const message = JSON.parse(e.data);
            console.log("Received message:", message);

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

    // Gifted chat function for sending messages
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

    // Styling messages Bubble
    const renderBubble = (props) => (
        <Bubble
            {...props}
            textStyle={{
                left: { color: COLORS.dark, fontFamily: FONT.medium, fontSize: 14 },
                right: { color: COLORS.white, fontFamily: FONT.medium, fontSize: 14 },
            }}
            wrapperStyle={{
                left: { backgroundColor: COLORS.secondary, padding: 10, borderRadius: 16 },
                right: { backgroundColor: COLORS.dark, padding: 10, borderRadius: 16 },
            }}
        />
    );

    // File handling
    const [selectedFiles, setSelectedFiles] = useState<any[]>([]); // State to store selected files
    const pickSomething = async () => {
        try {
            const docRes = await DocumentPicker.getDocumentAsync({
                type: "*/*",
                multiple: true, // Allow selecting multiple files
            });

            const formData = new FormData();
            const assets = docRes.assets;
            if (!assets) return;

            assets.forEach(file => {
                const audioFile: any = {
                    name: file.name.split(".")[0],
                    uri: file.uri,
                    type: file.mimeType,
                    size: file.size,
                };
                formData.append("audioFiles[]", audioFile); // Append each file to FormData array
            });

            console.log("NICEEE: FILES SELECTED", formData.getAll('audioFiles[]'));
            setSelectedFiles([...selectedFiles, ...assets]); // Update selectedFiles state

        } catch (error) {
            console.log("Error while selecting files: ", error);
        }
    };

    const renderInputToolbar = (props) => (
        <InputToolbar
            {...props}
            containerStyle={{
                backgroundColor: COLORS.white,
                paddingHorizontal: 10,
                fontSize: 16,
                // paddingBottom: 20
            }}
            primaryStyle={{ alignItems: 'center' }}
            renderActions={() => (
                <TouchableOpacity onPress={() => pickSomething()}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', left: 5 }}>
                        <Ionicons name="attach" color={COLORS.primary} size={28} />
                    </View>
                </TouchableOpacity>
            )}
        />
    );

    const renderSend = (props) => (
        <Send {...props} containerStyle={{ justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
            <Ionicons name="send" color={COLORS.primary} size={24} />
        </Send>
    );

    return (
        <>
            <Stack.Screen options={{ title: 'Chat ID: ' + id }} />
            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: profileData?.id, // Your sender ID
                    // _id: 453, // Your sender ID
                }}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                renderSend={renderSend}
                renderAvatar={null}
                scrollToBottom
            />
        </>
    );
};

export default ChatPage;
