import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './dropdown.style';
import { FONT, COLORS, SIZES } from "@/constants";

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
                <Text style={styles.text}>{selectedOption}</Text>
                <MaterialIcons name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={24} color={COLORS.primary} />
            </TouchableOpacity>
            {isOpen && (
                <View style={{ height: 100, paddingRight: 24, paddingBottom: 10 }}>
                    <FlatList
                        data={options}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.option} onPress={() => handleSelectOption(item)}>
                                <Text style={styles.optionText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item}
                    />
                </View>
            )}
        </View>
    );
};

export default OuterDropdown;
