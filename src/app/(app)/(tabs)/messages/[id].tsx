import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { GiftedChat, IMessage, Bubble, InputToolbar, Send, MessageText } from 'react-native-gifted-chat';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONT, images } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { openDocumentAsync } from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import { useSession } from '@/components/core/AuthContext';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';
import { InChatFileTransfer } from '@/components';

if(Platform.OS === 'android'){
    AndroidKeyboardAdjust.setAdjustResize();
}


const ChatPage = () => {
    const { jwtToken } = useSession();
    const { id } = useLocalSearchParams();
    const receiverId: any = id;
    const [messages, setMessages] = useState([]);
    const [ws, setWs] = useState(null);
    const [profileData, setProfileData] = useState<any>(null);
    const insets = useSafeAreaInsets();
    const [fileToUpload, setFileToUpload] = useState(null);

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
                    console.log('Fetched messages:', fetchedMessages);
                    
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

        return data.result.map((msg) => {
            let message = {
                _id: msg.Id,
                text: msg.Messages || 'File', // Default text or indication of a file
                createdAt: new Date(msg.Created * 1000),
                user: {
                    _id: msg.SenderId === senderId ? senderId : receiverId,
                },
                file: null,
            };

            // If the message includes file information, add a 'file' property
            if (msg.Files && msg.Files.length > 0) {
                const file = msg.Files[0];
                message.file = {
                    name: file.FileName,
                    uri: `https://support-test.prometeochain.io/v1/support/getfile?filepath=${encodeURIComponent(file.FilePath)}`,
                };
            }

            return message;
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

        //TODO: upload file before sending message
         // const formData = new FormData();
        // formData.append('files', file.file);
        // formData.append('token', jwtToken);
        // formData.append('reciver_id', receiverId);

        // try {
        //     const response = await fetch('https://support-test.prometeochain.io/v1/company/chat/upload', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'multipart/form-data',
        //         },
        //         body: formData,
        //     });

        //     const responseData = await response.json();

        //     // Handle if status code is not 200
        //     if(!response.ok){
        //         console.error(responseData.message)
        //         throw Error("failed upload file")
        //     }

        //     console.log('File uploaded:', responseData);

        //     const fileMessage = {
        //         _id: Math.round(Math.random() * 1000000),
        //         text: fileName,
        //         createdAt: new Date(),
        //         user: {
        //             _id: profileData?.id,
        //         },
        //         file: {
        //             uri: `https://support-test.prometeochain.io/v1/support/getfile?filepath=${encodeURIComponent(fileName)}`, // Assuming the fileName is enough to construct the filePath
        //             name: fileName,
        //             type: fileType,
        //         },
        //     };

        //     setMessages((previousMessages) => GiftedChat.append(previousMessages, [fileMessage]));
        // } catch (error) {
        //     console.error('Upload error:', error);
        // }

        if (fileToUpload) {
            messageWithTemporaryId.file = {
                name: fileToUpload.name,
                uri: fileToUpload.uri,
                type: fileToUpload.type,
            };
        }
        console.log("Sending message: ", messageWithTemporaryId);
        console.log("Sending file: ", fileToUpload);
        
        

        setMessages((previousMessages) => GiftedChat.append(previousMessages, [messageWithTemporaryId]));

        // if (ws) {
        //     const messageToSend = JSON.stringify({ message: messageWithTemporaryId.text, files: [messageWithTemporaryId.file] });
        //     console.log("Sending message: ", messageToSend);
        //     ws.send(messageToSend);
        // }
        setFileToUpload(null);
    }, [ws, fileToUpload]);

    const pickFile = async () => {
        const docRes = await DocumentPicker.getDocumentAsync({
            type: "*/*",
            multiple: true,
        });

        if (!docRes.canceled && docRes.assets) {
            for (const file of docRes.assets) {
                const fileUri = file.uri;
                const fileName = file.name;
                const fileType = file.mimeType;

                setFileToUpload({file:file.file, uri: fileUri, name: fileName, type: fileType});

            }
        }
    };

    const handleFileOpening = async (fileUri) => {
        console.log(`Attempting to open file at: ${fileUri}`);

        // Check if the URI is valid and accessible
        const response = await fetch(fileUri, { method: 'HEAD' });
        if (response.ok) {
            // Proceed with downloading and opening the file
            const localUri = `${FileSystem.documentDirectory}${encodeURIComponent(fileUri.split('/').pop())}`;

            try {
                const { uri: downloadedUri } = await FileSystem.downloadAsync(fileUri, localUri);
                console.log(`File downloaded to: ${downloadedUri}`);

                // Open the file based on the platform
                if (Platform.OS === 'android') {
                    const contentUri = await FileSystem.getContentUriAsync(downloadedUri);
                    await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                        data: contentUri,
                        flags: 1,
                    });
                } else {
                    // For iOS, open the document directly
                    await openDocumentAsync(downloadedUri);
                }
            } catch (error) {
                console.error('Error downloading or opening the file:', error);
                alert('Unable to download or open the file.');
            }
        } else {
            // Handle the case where the file is not found or the URI is invalid
            alert('File not found or the link is invalid.');
        }
    };




    const renderMessageText = (props) => {
        const { currentMessage } = props;       

        if (currentMessage.file) {
            return (
                <View style={{flexDirection: 'column'}}>
                    <TouchableOpacity onPress={() => handleFileOpening(currentMessage.file.uri)}>
                        <View style={styles.fileMessageContainer}>
                            <Text style={styles.fileMessageText}>{currentMessage.file.name}</Text>
                        </View>
                    </TouchableOpacity>
                    <MessageText {...props}/>
                </View>
                
            );
        }

        return <MessageText {...props} />;
    };

    const renderChatFooter = useCallback(() => {
        if (fileToUpload) {
          return (
            <View style={styles.chatFooter}>
              <InChatFileTransfer
                file={fileToUpload}
              />
              <TouchableOpacity
                onPress={() => setFileToUpload(null)}
                style={styles.buttonFooterChat}
              >
                <Text style={styles.textFooterChat}>X</Text>
              </TouchableOpacity>
            </View>
          );
        }
        return null;
      }, [fileToUpload]);
      
    return (
        <>
            <Stack.Screen options={{ title: 'Chat ID: ' + id }} />
            {/* SafeAreaView is used to avoid the status bar and bottom navigation bar */}
            <SafeAreaView style={{ flex: 1 }} edges={['right', 'bottom', 'left']} >
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
                    renderChatFooter={renderChatFooter}
                    renderInputToolbar={props => (
                        <InputToolbar
                            {...props}
                            containerStyle={{
                                backgroundColor: COLORS.white,
                                paddingHorizontal: 10,                                
                            }}
                            primaryStyle={{ alignItems: 'center' }}
                            renderActions={() => (
                                <TouchableOpacity onPress={pickFile}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', left: 5 }}>
                                        <Ionicons name="attach" color={COLORS.primary} size={28} />
                                    </View>
                                </TouchableOpacity>
                            )
                        }
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
                {Platform.OS == 'android' && <KeyboardSpacer />}
            </SafeAreaView>
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
    buttonFooterChat: {
        width: 35,
        height: 35,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        borderColor: 'black',
        right: 3,
        top: -2,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      },
      buttonFooterChatImg: {
        width: 35,
        height: 35,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        borderColor: 'black',
        left: 66,
        top: -4,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
      },
      textFooterChat: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'gray',
      },
      chatFooter: {
        shadowColor: '#FAD248',
        shadowOpacity: 0.37,
        shadowRadius: 8,
        shadowOffset: {width: 0, height: 8},
        elevation: 2,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.18)',
        flexDirection: 'row',
        padding: 1,
        backgroundColor: '#FAD248'
      },
});

export default ChatPage;
