import React, { useState, useCallback, useEffect, useRef, memo } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import {
    GiftedChat,
    Bubble,
    InputToolbar,
    Send,
    SystemMessage,
    IMessage,
} from 'react-native-gifted-chat';
import { Swipeable } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { ChatMessageBox, ReplyMessageBar, InChatFileTransfer } from '@/components';
import { COLORS, FONT } from '@/constants';
import messageData from '@/api/chat.json'
// import * as DocumentPicker from 'react-native-document-picker'
import * as DocumentPicker from 'expo-document-picker';

interface File extends IMessage {
    url?: string;
}

const Page = () => {
    // Memoize components
    const SystemMessageMemoized = memo(SystemMessage);
    const BubbleMemoized = memo(Bubble);

    // declare 4 states
    const [isAttachImage, setIsAttachImage] = useState(false);
    const [isAttachFile, setIsAttachFile] = useState(false);
    const [imagePath, setImagePath] = useState('');
    const [filePath, setFilePath] = useState('');

    // add a function attach file using DocumentPicker.pick

    const _pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*', // You can specify the file types you want to allow, e.g., 'application/pdf', 'image/*', etc.
            });
            // Uncomment when will be API
            // if (result.type === 'success') {
            //     onSelectFile(result.uri);
            // } else {
            //     onSelectFile(null); // User canceled file selection
            // }
        } catch (error) {
            console.error('Error picking file:', error);
        }
    };

    const [messages, setMessages] = useState<IMessage[]>([]);
    const [text, setText] = useState('');
    const insets = useSafeAreaInsets();

    const [replyMessage, setReplyMessage] = useState<IMessage | null>(null);
    const swipeableRowRef = useRef<Swipeable | null>(null);

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

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages: any[]) => GiftedChat.append(previousMessages, messages));
    }, []);

    const renderInputToolbar = (props: any) => {
        return (
            <InputToolbar
                {...props}
                containerStyle={{ backgroundColor: COLORS.white }}
                renderActions={() => (
                    <TouchableOpacity onPress={_pickDocument}>
                        <View style={{ height: 44, justifyContent: 'center', alignItems: 'center', left: 5 }}>
                            <Ionicons name="add" color={COLORS.primary} size={28} />
                        </View>
                    </TouchableOpacity>
                )}
            />
        );
    };

    const updateRowRef = useCallback(
        (ref: any) => {
            if (
                ref &&
                replyMessage &&
                ref.props.children.props.currentMessage?._id === replyMessage._id
            ) {
                swipeableRowRef.current = ref;
            }
        },
        [replyMessage]
    );

    useEffect(() => {
        if (replyMessage && swipeableRowRef.current) {
            swipeableRowRef.current.close();
            swipeableRowRef.current = null;
        }
    }, [replyMessage]);

    const { id } = useLocalSearchParams();

    const scrollToBottomComponent = () => {
        return <FontAwesome name="angle-double-down" size={22} color="#333" />;
    };

    const renderChatFooter = useCallback(() => {
        if (imagePath) {
            return (
                <View>
                    <Image source={{ uri: imagePath }} style={{ height: 75, width: 75 }} />
                    <TouchableOpacity
                        onPress={() => setImagePath('')}
                    // style={styles.buttonFooterChatImg}
                    >
                        <Text>X</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        if (filePath) {
            return (
                <View>
                    <InChatFileTransfer
                        filePath={filePath}
                    />
                    <TouchableOpacity
                        onPress={() => setFilePath('')}
                    // style={styles.buttonFooterChat}
                    >
                        <Text>X</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return null;
    }, [filePath, imagePath]);

    return (
        <SafeAreaView style={{ flex: 1, marginBottom: insets.bottom, backgroundColor: COLORS.background }}>
            <Stack.Screen options={{ title: 'Chat ID: ' + id }} />
            <>
                <View style={{ flex: 1 }}>
                    <GiftedChat
                        messages={messages}
                        onSend={(messages: any) => onSend(messages)}
                        onInputTextChanged={setText}
                        user={{
                            _id: 1,
                        }}
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
                                // <Bubble
                                //     {...props}
                                //     textStyle={{
                                //         left: {
                                //             color: COLORS.dark,
                                //             fontFamily: FONT.medium,
                                //             fontSize: 14,
                                //             lineHeight: 21,
                                //         },
                                //         right: {
                                //             color: COLORS.white,
                                //             fontFamily: FONT.medium,
                                //             fontSize: 14,
                                //             lineHeight: 21,
                                //         },
                                //     }}
                                //     wrapperStyle={{
                                //         left: {
                                //             backgroundColor: COLORS.secondary,
                                //             padding: 10,
                                //             borderRadius: 16
                                //         },
                                //         right: {
                                //             backgroundColor: COLORS.dark,
                                //             padding: 10,
                                //             borderRadius: 16
                                //         },
                                //     }}
                                // />
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
                        // renderChatFooter={() => (
                        //     <ReplyMessageBar clearReply={() => setReplyMessage(null)} message={replyMessage} />
                        // )}
                        onLongPress={(context, message) => setReplyMessage(message)}
                        renderMessage={(props) => (
                            <ChatMessageBox
                                {...props}
                                setReplyOnSwipeOpen={setReplyMessage}
                                updateRowRef={updateRowRef}
                            />
                        )}
                        scrollToBottom
                        scrollToBottomComponent={scrollToBottomComponent}
                        renderChatFooter={renderChatFooter}
                    />
                    {
                        Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding"  />
                    }
                </View>
            </>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    composer: {
        backgroundColor: '#fff',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: COLORS.primary,
        paddingHorizontal: 10,
        fontSize: 16,
        // marginVertical: 100
    },
});

export default Page;