import React, { useState, useCallback, useEffect, useRef, memo } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import {
    GiftedChat, Bubble, InputToolbar, Send, SystemMessage, IMessage,
} from 'react-native-gifted-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { InChatFileTransfer } from '@/components';
import { COLORS, FONT } from '@/constants';
// import messageData from '@/api/chat.json'
// import * as DocumentPicker from 'react-native-document-picker'
import * as DocumentPicker from 'expo-document-picker';

interface File extends IMessage {
    url?: string;
}

const messageData = [
    {
        "id": "6139e7c6580e9b39d1c6bd79",
        "from": 1,
        "date": "Wed Aug 25 2021 04:34:39 GMT+0200 (Central European Summer Time)",
        "msg": "Et nulla tempor nulla minim in veniam excepteur nisi deserunt cupidatat commodo reprehenderit duis pariatur. Eu ullamco velit minim cupidatat sit nisi laborum."
    },
    {
        "id": "6139e7c645df995d423a0c61",
        "from": 1,
        "date": "Sat Aug 14 2021 06:09:53 GMT+0200 (Central European Summer Time)",
        "msg": "Veniam esse non occaecat eiusmod. Adipisicing quis consectetur irure nostrud proident."
    },
    {
        "id": "6139e7c687a7db674021c553",
        "from": 0,
        "date": "Tue Aug 03 2021 05:13:50 GMT+0200 (Central European Summer Time)",
        "msg": "Aute nostrud eu aliqua reprehenderit consequat fugiat nulla reprehenderit pariatur ad veniam tempor mollit irure. Tempor Lorem sint non fugiat esse duis pariatur tempor irure."
    },
    {
        "id": "6139e7c62b83d7f2c8d8f21c",
        "from": 1,
        "date": "Tue Aug 24 2021 21:09:23 GMT+0200 (Central European Summer Time)",
        "msg": "Proident sunt cupidatat culpa id Lorem cillum duis nulla duis incididunt. Elit ad ut eu aliquip nisi tempor tempor reprehenderit est et id."
    },
    {
        "id": "6139e7c6bf08d6589abff47d",
        "from": 0,
        "date": "Thu Aug 19 2021 05:57:54 GMT+0200 (Central European Summer Time)",
        "msg": "Sint quis aliqua consectetur non esse do in ullamco do ea enim nostrud sit incididunt. Fugiat dolore esse voluptate tempor consequat veniam ad adipisicing aliquip."
    },
    {
        "id": "6139e7c65e0794cb2e92b4d1",
        "from": 1,
        "date": "Fri Aug 27 2021 16:48:53 GMT+0200 (Central European Summer Time)",
        "msg": "Anim ad proident cillum sit reprehenderit. Incididunt fugiat reprehenderit aliquip duis nostrud proident elit culpa eu ut."
    },
    {
        "id": "6139e7c66e1691e1c8f0dd12",
        "from": 0,
        "date": "Sat Sep 04 2021 03:24:13 GMT+0200 (Central European Summer Time)",
        "msg": "Nostrud ipsum qui excepteur cupidatat proident sit exercitation mollit ad magna. Irure sit do cillum sunt nostrud dolor."
    },
    {
        "id": "6139e7c6f219f2a2ff61a21e",
        "from": 1,
        "date": "Sat Sep 04 2021 19:30:36 GMT+0200 (Central European Summer Time)",
        "msg": "Voluptate amet labore est eu labore velit deserunt aliqua occaecat. Ex enim Lorem ad eiusmod velit velit velit."
    },
    {
        "id": "6139e7c6be26f83b10403cbd",
        "from": 1,
        "date": "Sun Aug 08 2021 04:45:04 GMT+0200 (Central European Summer Time)",
        "msg": "Nulla est labore in sint excepteur. Elit aliqua laborum dolore do."
    },
    {
        "id": "6139e7c6c200a7eaf09c1d7d",
        "from": 1,
        "date": "Fri Aug 27 2021 06:23:41 GMT+0200 (Central European Summer Time)",
        "msg": "Nostrud occaecat pariatur laborum aliqua ad reprehenderit mollit magna ex incididunt non sunt. Ullamco sunt nulla aliqua quis ex ullamco minim."
    },
    {
        "id": "6139e7c658a955b40b50f382",
        "from": 1,
        "date": "Tue Aug 31 2021 20:57:48 GMT+0200 (Central European Summer Time)",
        "msg": "Cupidatat occaecat consequat incididunt irure mollit enim duis incididunt ut id. Esse officia adipisicing cillum amet occaecat labore."
    },
    {
        "id": "6139e7c63d23c8d990ffb3de",
        "from": 1,
        "date": "Thu Aug 05 2021 07:37:11 GMT+0200 (Central European Summer Time)",
        "msg": "Exercitation consequat amet ut nisi. Do ex enim ullamco ex ex est et aliqua laborum ullamco magna."
    },
    {
        "id": "6139e7c6d2b0ff349f80a2e5",
        "from": 1,
        "date": "Tue Aug 03 2021 16:28:33 GMT+0200 (Central European Summer Time)",
        "msg": "Sunt amet deserunt sint amet pariatur duis anim commodo incididunt eu laborum. Consectetur excepteur amet incididunt qui irure."
    },
    {
        "id": "6139e7c60af348dbd057f496",
        "from": 0,
        "date": "Tue Aug 10 2021 18:00:43 GMT+0200 (Central European Summer Time)",
        "msg": "Anim reprehenderit voluptate nulla et officia qui nisi sunt nulla sint voluptate esse reprehenderit cupidatat. Incididunt elit fugiat culpa aliquip fugiat est officia."
    },
    {
        "id": "6139e7c65dd5a5e8218ba2fa",
        "from": 1,
        "date": "Tue Aug 10 2021 23:22:28 GMT+0200 (Central European Summer Time)",
        "msg": "Dolor adipisicing laborum esse incididunt esse consequat cupidatat esse. Est consequat incididunt pariatur sint sint magna."
    },
    {
        "id": "6139e7c6281accff5fe55075",
        "from": 0,
        "date": "Tue Aug 31 2021 12:53:37 GMT+0200 (Central European Summer Time)",
        "msg": "Ut ut esse occaecat Lorem aliquip aliquip ad eiusmod nulla eiusmod. Non commodo voluptate proident excepteur."
    },
    {
        "id": "6139e7c6fabd8bfbfe184079",
        "from": 1,
        "date": "Thu Aug 26 2021 17:40:52 GMT+0200 (Central European Summer Time)",
        "msg": "Adipisicing nulla ad ad nostrud mollit culpa ea cillum aute excepteur minim fugiat. Eiusmod et qui amet mollit aliqua eu anim adipisicing cupidatat."
    },
    {
        "id": "6139e7c667c119fc716e4637",
        "from": 1,
        "date": "Fri Aug 13 2021 02:20:38 GMT+0200 (Central European Summer Time)",
        "msg": "Do ipsum sint eiusmod incididunt sunt minim deserunt laborum nulla mollit reprehenderit ut veniam esse. Velit tempor amet ut magna non do."
    },
    {
        "id": "6139e7c62a1478365c271d1a",
        "from": 0,
        "date": "Thu Aug 05 2021 14:18:52 GMT+0200 (Central European Summer Time)",
        "msg": "Consectetur elit aute mollit sit dolor cupidatat. Voluptate non aliqua duis minim nostrud minim."
    },
    {
        "id": "6139e7c65845fe107e9d8a03",
        "from": 1,
        "date": "Wed Sep 01 2021 06:10:22 GMT+0200 (Central European Summer Time)",
        "msg": "Nulla proident consequat dolore Lorem Lorem. Enim minim ut aute duis."
    },
    {
        "id": "6139e7c62d7582a17e8a5000",
        "from": 0,
        "date": "Mon Aug 16 2021 15:46:07 GMT+0200 (Central European Summer Time)",
        "msg": "Dolor consectetur adipisicing velit enim officia. Mollit cupidatat nisi occaecat non sunt nisi eu incididunt adipisicing est non."
    },
    {
        "id": "6139e7c6817200a4ecadb374",
        "from": 1,
        "date": "Sun Sep 05 2021 19:38:53 GMT+0200 (Central European Summer Time)",
        "msg": "Deserunt ex ad esse non. Culpa incididunt sit ipsum qui excepteur velit proident ut."
    },
    {
        "id": "6139e7c6766e6a212c44f378",
        "from": 0,
        "date": "Mon Aug 30 2021 11:04:14 GMT+0200 (Central European Summer Time)",
        "msg": "Amet consectetur culpa ad sint laborum eu laboris non proident fugiat anim. Ad voluptate ipsum exercitation veniam ea reprehenderit."
    },
    {
        "id": "6139e7c6b662a6e643064544",
        "from": 1,
        "date": "Mon Aug 30 2021 23:51:25 GMT+0200 (Central European Summer Time)",
        "msg": "Exercitation sint ea dolore qui. Non minim nisi ex tempor mollit qui aute laborum."
    },
    {
        "id": "6139e7c6f618709859887343",
        "from": 0,
        "date": "Tue Aug 03 2021 11:47:04 GMT+0200 (Central European Summer Time)",
        "msg": "Elit ullamco sit do dolore et dolore id eiusmod dolor eiusmod occaecat sunt. Laboris occaecat adipisicing sint ad ea mollit et mollit laborum et occaecat duis sint."
    },
    {
        "id": "6139e7c6763f4da907851d1f",
        "from": 1,
        "date": "Fri Sep 03 2021 23:46:25 GMT+0200 (Central European Summer Time)",
        "msg": "Adipisicing do mollit et excepteur. Nulla eu ex deserunt proident eu anim culpa cillum."
    },
    {
        "id": "6139e7c61a36a01ce3afe180",
        "from": 0,
        "date": "Fri Aug 13 2021 14:22:52 GMT+0200 (Central European Summer Time)",
        "msg": "Lorem cillum consectetur quis qui magna cillum ullamco consequat eiusmod ad. Commodo do voluptate ullamco ullamco laborum in ullamco dolore."
    },
    {
        "id": "6139e7c62fa2b5553022f27a",
        "from": 0,
        "date": "Mon Aug 02 2021 20:14:54 GMT+0200 (Central European Summer Time)",
        "msg": "Minim proident ut nisi aliquip nulla commodo elit minim pariatur proident enim. Commodo officia enim nulla pariatur pariatur ad tempor est exercitation elit."
    },
    {
        "id": "6139e7c6a6a89e1c9c26c4e5",
        "from": 1,
        "date": "Tue Aug 03 2021 14:13:29 GMT+0200 (Central European Summer Time)",
        "msg": "Non laborum exercitation est enim dolore dolore ex et irure duis dolore enim. Laboris nostrud cillum incididunt esse ex officia incididunt duis excepteur exercitation."
    },
    {
        "id": "6139e7c610e87b925c4e0d5f",
        "from": 1,
        "date": "Tue Aug 24 2021 09:47:34 GMT+0200 (Central European Summer Time)",
        "msg": "Irure culpa reprehenderit aute ad reprehenderit culpa commodo anim adipisicing mollit aliquip. Est adipisicing reprehenderit ex qui proident."
    },
    {
        "id": "6139e7c6fc3fffb873a61d85",
        "from": 0,
        "date": "Wed Aug 18 2021 04:14:56 GMT+0200 (Central European Summer Time)",
        "msg": "Adipisicing non nulla eiusmod veniam aliqua velit. Laboris ad elit aliquip labore eiusmod aute exercitation non irure laborum reprehenderit."
    },
    {
        "id": "6139e7c607d82bb81cfb19b0",
        "from": 0,
        "date": "Tue Aug 17 2021 12:54:51 GMT+0200 (Central European Summer Time)",
        "msg": "Cupidatat sunt ut labore cupidatat ut aliqua veniam dolore aliqua cupidatat enim aliquip ullamco velit. Commodo cillum exercitation in magna pariatur aliquip magna ipsum veniam."
    },
    {
        "id": "6139e7c646bcfb18b3d3b1db",
        "from": 1,
        "date": "Thu Sep 02 2021 00:57:29 GMT+0200 (Central European Summer Time)",
        "msg": "Ad ex excepteur labore ullamco ad est et id est magna cillum exercitation. Est magna pariatur commodo eiusmod adipisicing et labore."
    },
    {
        "id": "6139e7c67a2b042d2170b6d2",
        "from": 0,
        "date": "Thu Aug 19 2021 09:56:17 GMT+0200 (Central European Summer Time)",
        "msg": "Ut exercitation eu exercitation dolor nisi commodo velit nulla nulla. Pariatur laborum ut adipisicing proident."
    }
];


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
                        scrollToBottom
                        scrollToBottomComponent={scrollToBottomComponent}
                        renderChatFooter={renderChatFooter}
                    />
                    {
                        Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
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
        // borderWidth: 1,
        // borderColor: COLORS.primary,
        paddingHorizontal: 10,
        fontSize: 16,
        // marginVertical: 100
    },
});

export default Page;