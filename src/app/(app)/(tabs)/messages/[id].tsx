import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { GiftedChat, IMessage, User, MessageText } from 'react-native-gifted-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '@/constants';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';

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

const FileSendingButton = ({ onFilePicked }) => (
    <TouchableOpacity onPress={() => pickSomething(onFilePicked)} style={styles.fileSendingButton}>
        <Text style={styles.fileSendingButtonText}>Send File</Text>
    </TouchableOpacity>
);

const Page = () => {
    const insets = useSafeAreaInsets();
    const { id } = useLocalSearchParams();

    const [messages, setMessages] = useState<IMessage[]>([]);
    const [user, setUser] = useState<User>({
        _id: 1,
        avatar: 'https://placeimg.com/140/140/any',
    });

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

    return (
        <SafeAreaView style={{ flex: 1, marginBottom: insets.bottom, backgroundColor: COLORS.background }}>
            <Stack.Screen options={{ title: 'Chat ID: ' + id }} />
            <View style={{ flex: 1 }}>
                <GiftedChat
                    messages={messages}
                    onSend={onSend}
                    user={user}
                    renderMessageText={renderMessageComponent}
                />
                <FileSendingButton onFilePicked={handleFilePicked} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    fileSendingButton: {
        backgroundColor: '#333',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 10,
        marginBottom: 10,
        alignSelf: 'flex-end',
    },
    fileSendingButtonText: {
        color: '#fff',
    },
});

export default Page;