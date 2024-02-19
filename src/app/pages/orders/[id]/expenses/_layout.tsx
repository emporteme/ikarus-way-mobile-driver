import { View, Text } from 'react-native'
import { Stack } from "expo-router";
import styles from '@/style/orderDetails.style';

export default () => {
    return (
        <Stack.Screen
            options={{
                headerShown: true,
                title: 'Expenses',
                headerTitleAlign: 'center',
                headerRight: () => (
                    <View style={styles.status}>
                        <Text style={styles.statusText}>Status</Text>
                    </View>
                ),
            }}
        />
    )
}