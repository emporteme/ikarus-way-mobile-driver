import { View, Text } from 'react-native'
import React from 'react'
import { Circle } from '@/components'
import styles from './empty.style'

const Empty: React.FC = () => {
    return (
        <View style={styles.container}>
            <Circle />
            <View style={styles.textBlock}>
                <Text style={styles.text}>
                    Discuss the order details with the logistician, send documents and photos.
                </Text>
                <Text style={styles.text}>
                    Go to order details and click "Write"
                </Text>
            </View>
        </View>
    )
}

export default Empty