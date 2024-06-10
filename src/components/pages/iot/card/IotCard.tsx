import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { IotType } from '@/types';
import { icons } from '@/constants';
import styles from './card.style'

const IotCard: React.FC<IotType> = (iot: IotType) => {
    const icon2 = iot.icon
    const icon3 = icons[icon2];
    return (
        <View style={styles.card}>
            <View style={styles.left}>
                <Text style={styles.title}>{iot.name}</Text>
                <Text style={styles.data}>
                    <Text style={styles.value}>{iot.value} </Text>
                    <Text style={styles.unit}>{iot.unit}</Text>
                </Text>
            </View>
            <Image source={icon3} style={styles.icon} />
        </View>
    )
}

export default IotCard