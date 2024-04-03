import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { GiftedChat, IMessage, Bubble, InputToolbar, Send, MessageText } from 'react-native-gifted-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, FONT } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import { useSession } from '@/components/core/AuthContext';

const ChatPage = () => {
    const { jwtToken } = useSession();
    const { id } = useLocalSearchParams();
    const receiverId = id;
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null);
    const [profileData, setProfileData] = useState<any>(null);
    const insets = useSafeAreaInsets();

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
                    'Authorization': 'Bearer ' + jwtToken,
                },
            });

            const data = await response.json();
            setProfileData(data.data);
        } catch (error) {
            console.error('Error fetching profile:', error);
            alert('Failed to fetch profile data');
        }
    };

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
        console.log('Fetched messages:', data.result);
        return data.result.map((msg) => {
            // Default text message or file name if available
            const textMessage = msg.Messages || (msg.Files && msg.Files.length > 0 ? msg.Files[0].FileName : '');
    
            return {
                _id: msg.Id,
                text: textMessage,
                createdAt: new Date(msg.Created * 1000),
                user: {
                    _id: msg.SenderId === senderId ? senderId : receiverId,
                },
            };
        });
    };

    useEffect(() => {
        const webSocket = new WebSocket(`wss://support-test.prometeochain.io/v1/company/chat/ws?token=${jwtToken}&reciverid=${receiverId}`);

        webSocket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log("Received message:", data);

            setMessages((previousMessages) => {
                const messagesWithoutPending = previousMessages.filter(m => !m.pending);

                let newMessage = {
                    _id: data.Id,
                    text: data.Messages,
                    createdAt: new Date(data.Created * 1000),
                    user: {
                        _id: data.SenderId,
                    },
                };

                if (data.Files && data.Files.length > 0) {
                    const file = data.Files[0];
                    newMessage['file'] = {
                        name: file.FileName,
                        size: file.FileSize,
                        uri: `https://support-test.prometeochain.io/v1/support/getfile?filepath=${encodeURIComponent(file.FilePath)}`,
                    };
                }

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
            webSocket.close();
        };
    }, [jwtToken, receiverId]);

    const onSend = useCallback((messages = []) => {
        const messageWithTemporaryId = {
            ...messages[0],
            _id: Math.round(Math.random() * 1000000),
            pending: true,
        };

        setMessages((previousMessages) => GiftedChat.append(previousMessages, [messageWithTemporaryId]));

        if (ws) {
            const messageToSend = JSON.stringify({ message: messages[0].text, file: messages[0].file });
            console.log("Sending message: ", messageToSend);
            ws.send(messageToSend);
        }
    }, [ws]);

    const pickAndUploadFile = async () => {
        const docRes = await DocumentPicker.getDocumentAsync({
            type: "*/*",
            multiple: true,
        });

        if (!docRes.canceled && docRes.assets) {
            docRes.assets.forEach(async (file) => {
                const fileUri = file.uri;
                const fileName = file.name;
                const fileType = file.mimeType;

                const formData = new FormData();
                formData.append('files', { uri: fileUri, name: fileName, type: fileType });
                formData.append('token', jwtToken);
                formData.append('reciverid', String(receiverId));

                try {
                    const response = await fetch('https://support-test.prometeochain.io/v1/company/chat/upload', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                        body: formData,
                    });

                    const responseData = await response.json();

                    console.log('File uploaded:', responseData);

                    const fileMessage = {
                        _id: Math.round(Math.random() * 1000000),
                        text: fileName,
                        createdAt: new Date(),
                        user: {
                            _id: profileData?.id,
                        },
                        file: {
                            uri: `https://support-test.prometeochain.io/v1/support/getfile?filepath=${encodeURIComponent(fileName)}`, // Assuming the fileName is enough to construct the filePath
                            name: fileName,
                            type: fileType,
                        },
                    };

                    setMessages((previousMessages) => GiftedChat.append(previousMessages, [fileMessage]));
                } catch (error) {
                    console.error('Upload error:', error);
                }
            });
        }
    };

    const handleFileOpening = async (fileUri) => {
        console.log(`Opening file at: ${fileUri}`);
        if (Platform.OS === 'android') {
            const contentUri = await FileSystem.getContentUriAsync(fileUri);
            await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                data: contentUri,
                flags: 1,
            });
        } else {
            await FileSystem.openDocumentAsync(fileUri);
        }
    };

    const renderMessageText = (props) => {
        const { currentMessage } = props;

        if (currentMessage.file) {
            return (
                <TouchableOpacity onPress={() => handleFileOpening(currentMessage.file.uri)}>
                    <View style={styles.fileMessageContainer}>
                        <Text style={styles.fileMessageText}>{currentMessage.file.name} {currentMessage.file.uri} {currentMessage.file.name}</Text>
                    </View>
                </TouchableOpacity>
            );
        }

        return <MessageText {...props} />;
    };

    return (
        <>
            <Stack.Screen options={{ title: 'Chat ID: ' + id }} />
            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: profileData?.id,
                }}
                renderBubble={props => (
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
                )}
                renderInputToolbar={props => (
                    <InputToolbar
                        {...props}
                        containerStyle={{
                            backgroundColor: COLORS.white,
                            paddingHorizontal: 10,
                        }}
                        primaryStyle={{ alignItems: 'center' }}
                        renderActions={() => (
                            <TouchableOpacity onPress={pickAndUploadFile}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', left: 5 }}>
                                    <Ionicons name="attach" color={COLORS.primary} size={28} />
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                )}
                renderSend={props => (
                    <Send {...props} containerStyle={{ justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                        <Ionicons name="send" color={COLORS.primary} size={24} />
                    </Send>
                )}
                renderAvatar={null}
                scrollToBottom
                renderMessageText={renderMessageText}
            />
        </>
    );
};

const styles = StyleSheet.create({
    fileMessageContainer: {
        margin: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        alignItems: 'center',
    },
    fileMessageText: {
        marginBottom: 5,
        fontSize: 16,
        color: COLORS.dark,
    },
});

export default ChatPage;
