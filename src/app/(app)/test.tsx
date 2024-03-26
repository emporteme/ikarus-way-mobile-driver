import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type MessageType = {
    id: string;
    text: string;
};

export default function ChatScreen() {
    const [text, setText] = useState('');
    const [messages, setMessages] = useState<MessageType[]>([]);

    const sendMessage = () => {
        if (text.length === 0) return;

        const newMessage: MessageType = {
            id: Date.now().toString(),
            text: text,
        };

        setMessages((currentMessages) => [newMessage, ...currentMessages]);
        setText('');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={text}
                    onChangeText={setText}
                    placeholder="Type a message..."
                />
                <Button title="Send" onPress={sendMessage} />
            </View>
            <FlatList
                data={messages}
                renderItem={({ item }) => <Text style={styles.message}>{item.text}</Text>}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    );
};

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        flex: 1,
    },
    message: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
});
