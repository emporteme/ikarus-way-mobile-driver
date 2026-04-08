import { View, Text, Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants'
import styles from './circle.style'

const Circle: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.circle}>
                <Image source={icons.camera} style={styles.icon} />
            </View>
            <View style={styles.circle}>
                <Image source={icons.document} style={styles.icon} />
            </View>
            <View style={styles.circle}>
                <Image source={icons.photo} style={styles.icon} />
            </View>
        </View>
    )
}

export default Circle