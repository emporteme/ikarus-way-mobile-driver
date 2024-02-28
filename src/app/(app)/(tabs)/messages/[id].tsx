import { ChatMessageBox, ReplyMessageBar } from '@/components';
import { useLocalSearchParams, Stack } from 'expo-router';
import { COLORS, FONT } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import {
    GiftedChat,
    Bubble,
    InputToolbar,
    Send,
    SystemMessage,
    IMessage,
} from 'react-native-gifted-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import messageData from '@/api/chat.json'

const Page = () => {
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
                    <View style={{ height: 44, justifyContent: 'center', alignItems: 'center', left: 5 }}>
                        <Ionicons name="add" color={COLORS.primary} size={28} />
                    </View>
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
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Screen options={{ title: 'ID ' + id }} />
            <GiftedChat
                messages={messages}
                onSend={(messages: any) => onSend(messages)}
                onInputTextChanged={setText}
                user={{
                    _id: 1,
                }}
                renderSystemMessage={(props) => (
                    <SystemMessage {...props} textStyle={{ color: COLORS.gray }} />
                )}
                bottomOffset={insets.bottom}
                renderAvatar={null}
                maxComposerHeight={100}
                textInputProps={styles.composer}
                renderBubble={(props) => {
                    return (
                        <Bubble
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
                            <>
                                <Ionicons name="camera-outline" color={COLORS.primary} size={28} />
                                <Ionicons name="mic-outline" color={COLORS.primary} size={28} />
                            </>
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
                renderChatFooter={() => (
                    <ReplyMessageBar clearReply={() => setReplyMessage(null)} message={replyMessage} />
                )}
                onLongPress={(context, message) => setReplyMessage(message)}
                renderMessage={(props) => (
                    <ChatMessageBox
                        {...props}
                        setReplyOnSwipeOpen={setReplyMessage}
                        updateRowRef={updateRowRef}
                    />
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    composer: {
        backgroundColor: '#fff',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        paddingHorizontal: 10,
        paddingTop: 8,
        fontSize: 16,
        marginVertical: 4,
    },
});

export default Page;