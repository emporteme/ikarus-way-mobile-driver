import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

interface FileInputProps {
    onSelectFile: (fileUri: string | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onSelectFile }) => {
    const handleSelectFile = async () => {
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

    return (
        <TouchableOpacity style={styles.container} onPress={handleSelectFile}>
            <Text style={styles.text}>Select File</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DDDDDD',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
    },
});

export default FileInput;
