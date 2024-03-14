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
    const insets = useSafeAreaInsets();
    const { id } = useLocalSearchParams();

    const [messages, setMessages] = useState<IMessage[]>([]);
    const [user, setUser] = useState<User>({
        _id: 1,
        avatar: 'https://placeimg.com/140/140/any',
    });

    useEffect(() => {
        setMessages([
            ...messageData.map((message) => {
                return {
                    _id: message.id,
                    text: message.msg,
                    createdAt: new Date(message.date),
                    user: {
                        _id: message.from,
                        name: message.from ? 'You' : 'Bob',
                    },
                    // Add any other properties you need
                    // For example, if you want to display an image
                    // image: message.img, // Assuming you have 'img' property for images
                    // For files, you might have a property like 'fileUrl'
                    // fileUrl: message.fileUrl // Add this if you have a 'fileUrl' property in your JSON
                };
            }),
            {
                _id: 0,
                system: true,
                text: 'All your base are belong to us',
                createdAt: new Date(),
                user: {
                    _id: 0,
                    name: 'Bot',
                },
            },
        ]);
    }, []);

    const onSend = (newMessages: IMessage[]) => {
        setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    };

    const handleFilePicked = async (file) => {
        try {
            const fileUri = file.uri;
            const fileType = file.type;
            const fileName = file.name;
            const fileSize = file.size;

            // Create a new message with the file
            const newMessage: IMessage = {
                _id: Math.random().toString(36).substring(7),
                createdAt: new Date(),
                user,
                fileUri, // Set the file URI as the fileUri property
                text: `${fileName} (${fileSize} bytes)`, // Optional text description
            };

            // Append the new message to the existing messages array
            setMessages((prevMessages) => GiftedChat.append(prevMessages, [newMessage]));
        } catch (error) {
            console.error('Error handling file:', error);
        }
    };

    const handleFileOpening = async (fileUri) => {
        try {
            const fileExtension = fileUri.split('.').pop().toLowerCase();
            const supportedExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'jpg', 'mp3', 'mp4'];

            if (supportedExtensions.includes(fileExtension)) {
                if (Platform.OS === 'android') {
                    const contentUri = await FileSystem.getContentUriAsync(fileUri);

                    await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                        data: contentUri,
                        flags: 1,
                    });
                } else {
                    await FileSystem.openDocumentAsync(fileUri);
                }
            } else {
                console.warn(`Unsupported file extension: ${fileExtension}`);
            }
        } catch (error) {
            console.error('Error opening file:', error);
        }
    };

    const renderMessageComponent = (props) => {
        const { currentMessage } = props;

        if (currentMessage && currentMessage.fileUri) {
            return (
                <TouchableOpacity onPress={() => handleFileOpening(currentMessage.fileUri)}>
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
                    <TouchableOpacity onPress={() => pickSomething(handleFilePicked)}>
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
                        user={user}
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