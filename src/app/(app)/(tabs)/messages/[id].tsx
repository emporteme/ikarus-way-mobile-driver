import React, { useState, useCallback, useEffect, useRef, memo } from 'react';
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
import { useSession } from '@/components/core/Context';
import messageData from '@/api/chat.json'

const pickSomething = async (handleFilePicked) => {
    try {
        const docRes = await DocumentPicker.getDocumentAsync({
            type: "*/*",
            multiple: true, // Allow selecting multiple files
        });

        if (!docRes.canceled) {
            const assets = docRes.assets;
            if (assets) {
                assets.forEach(async (file) => {
                    const fileData = {
                        uri: file.uri,
                        type: file.mimeType,
                        name: file.name,
                        size: file.size,
                    };

                    // Copy the file to a public directory
                    const publicDirectory = `${FileSystem.documentDirectory}public/`;
                    await FileSystem.makeDirectoryAsync(publicDirectory, { intermediates: true });
                    const publicFile = `${publicDirectory}${file.name}`;
                    await FileSystem.copyAsync({ from: file.uri, to: publicFile });

                    // Update the file URI to use the public file
                    fileData.uri = publicFile;

                    handleFilePicked(fileData);
                });
            }
        }
    } catch (error) {
        console.log("Error while selecting files: ", error);
    }
};

const Page = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const ws = useRef<WebSocket | null>(null);
    const insets = useSafeAreaInsets();
    const { jwtToken } = useSession(); // Assume useSession hook provides jwtToken
    const { id } = useLocalSearchParams(); // Assuming `id` is the receiver's ID

    // Fetch historical messages
    const fetchMessages = async () => {
        try {
            const response = await fetch(`https://support-test.prometeochain.io/v1/company/chat/chats/all?token=${jwtToken}&reciverid=1`);
            const data = await response.json();
            console.log("DATA result: ", data.result)
            const fetchedMessages = data.result.map((msg) => ({
                _id: msg.message_id,
                text: msg.message,
                createdAt: new Date(msg.timestamp),
                user: {
                    _id: msg.sender_id,
                    name: msg.sender_id === jwtToken ? 'You' : `User ${msg.sender_id}`,
                    avatar: 'https://placeimg.com/140/140/any',
                },
            }));
            setMessages(fetchedMessages);
        } catch (error) {
            console.error('Fetching messages error:', error);
        }
    };

    useEffect(() => {
        fetchMessages(); // Fetch historical messages on mount

        // WebSocket connection setup
        ws.current = new WebSocket(`wss://support-test.prometeochain.io/v1/company/chat/ws?token=${jwtToken}&reciverid=1`);
        ws.current.onopen = () => console.log('WebSocket connection opened');
        ws.current.onmessage = (e) => {
            const incomingMessage = JSON.parse(e.data);
            if (incomingMessage.message) {
                const newMessage: any = {
                    _id: incomingMessage.message_id,
                    text: incomingMessage.message,
                    createdAt: new Date(incomingMessage.timestamp),
                    user: {
                        _id: incomingMessage.sender_id,
                        name: incomingMessage.sender_id === jwtToken ? 'You' : `User ${incomingMessage.sender_id}`,
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                };
                setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessage));
            }
        };
        ws.current.onerror = (e) => console.log("Error with ws connection: ", e);
        ws.current.onclose = () => console.log('WebSocket connection closed');

        // Clean up WebSocket connection when component unmounts
        return () => {
            if (ws.current) ws.current.close();
        };
    }, [jwtToken]);

    const onSend = (newMessages = []) => {
        newMessages.forEach((msg) => {
            ws.current?.send(JSON.stringify({
                message_id: msg._id,
                message: msg.text,
                receiver_id: 1, // or whatever the backend expects
                // Include other details as needed
            }));
            setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
        });
    };

    const renderMessageComponent = (props) => {
        const { currentMessage } = props;

        if (currentMessage && currentMessage.fileUri) {
            return (
                <TouchableOpacity>
                    <MessageText {...props} />
                </TouchableOpacity>
            );
        }

        return <MessageText {...props} />;
    };

    const renderInputToolbar = (props: any) => {
        return (
            <InputToolbar
                {...props}
                containerStyle={{ backgroundColor: COLORS.white }}
                renderActions={() => (
                    <TouchableOpacity>
                        <View style={{ height: 44, justifyContent: 'center', alignItems: 'center', left: 5 }}>
                            <Ionicons name="attach" color={COLORS.primary} size={28} />
                        </View>
                    </TouchableOpacity>
                )}
            />
        );
    };

    // Memoize components
    const SystemMessageMemoized = memo(SystemMessage);
    const BubbleMemoized = memo(Bubble);

    const scrollToBottomComponent = () => {
        return <FontAwesome name="angle-double-down" size={22} color="#333" />;
    };
    const [text, setText] = useState('');

    return (
        <SafeAreaView style={{ flex: 1, marginBottom: insets.bottom, backgroundColor: COLORS.background }}>
            <Stack.Screen options={{ title: 'Chat ID: ' + id }} />
            <>
                <View style={{ flex: 1 }}>
                    <GiftedChat
                        messages={messages}
                        onSend={(messages: any) => onSend(messages)}
                        onInputTextChanged={setText}
                        user={{ _id: 1 }}
                        renderMessageText={renderMessageComponent}
                        renderSystemMessage={(props) => (
                            <SystemMessageMemoized {...props} textStyle={{ color: COLORS.gray }} />
                        )}
                        bottomOffset={insets.bottom}
                        renderAvatar={null}
                        maxComposerHeight={100}
                        textInputProps={styles.composer}
                        renderBubble={(props) => {
                            return (
                                <BubbleMemoized
                                    {...props}
                                    textStyle={{
                                        left: {
                                            color: COLORS.dark,
                                            fontFamily: FONT.medium,
                                            fontSize: 14,
                                            lineHeight: 21,
                                        },
                                        right: {
                                            color: COLORS.white,
                                            fontFamily: FONT.medium,
                                            fontSize: 14,
                                            lineHeight: 21,
                                        },
                                    }}
                                    wrapperStyle={{
                                        left: {
                                            backgroundColor: COLORS.secondary,
                                            padding: 10,
                                            borderRadius: 16
                                        },
                                        right: {
                                            backgroundColor: COLORS.dark,
                                            padding: 10,
                                            borderRadius: 16
                                        },
                                    }}
                                />
                            );
                        }}
                        renderSend={(props) => (
                            <View
                                style={{
                                    height: 44,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 14,
                                    paddingHorizontal: 14,
                                }}>
                                {text === '' && (
                                    <></>        // Later in future will be added a voice and camera buttons
                                )}
                                {text !== '' && (
                                    <Send
                                        {...props}
                                        containerStyle={{
                                            justifyContent: 'center',
                                        }}>
                                        <Ionicons name="send" color={COLORS.primary} size={28} />
                                    </Send>
                                )}
                            </View>
                        )}
                        renderInputToolbar={renderInputToolbar}
                        scrollToBottom
                        scrollToBottomComponent={scrollToBottomComponent}
                    />
                    {
                        Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
                    }
                </View>
            </>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    composer: {
        backgroundColor: '#fff',
        borderRadius: 14,
        paddingHorizontal: 10,
        fontSize: 16,
    },
});

export default Page;