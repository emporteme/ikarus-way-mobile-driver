import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './dropdown.style';

interface DropdownProps {
    options: string[];
    selectedOption: string;
    onSelect: (option: string) => void;
}

const OuterDropdown: React.FC<DropdownProps> = ({ options, selectedOption, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelectOption = (option: string) => {
        onSelect(option);
        toggleDropdown();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={toggleDropdown}>
                <Text>{selectedOption}</Text>
                <MaterialIcons name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={24} color="black" />
            </TouchableOpacity>
            {isOpen && (
                <FlatList
                    data={options}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.option} onPress={() => handleSelectOption(item)}>
                            <Text>{item}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item}
                />
            )}
        </View>
    );
};

export default OuterDropdown;
