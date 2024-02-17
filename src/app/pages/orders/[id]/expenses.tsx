import { View, Text, SafeAreaView, ScrollView, Image, Pressable } from 'react-native'
import React from 'react'
import { useLocalSearchParams, Stack, Link } from 'expo-router';
import { icons } from '@/constants';
import styles from '@/style/orderDetails.style';

const Expenses: React.FC = () => {
    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: `Expenses`,
                    headerTitleAlign: 'center',
                    headerRight: () => (

                        // Maybe I need to use router.back(), but for now this logic fits well.
                        // router.push('/pages/services')}
                        <View style={styles.status}>
                            <Text style={styles.statusText}>Status</Text>
                        </View>
                    ),
                }}
            />
        </SafeAreaView>
    )
}

export default Expenses