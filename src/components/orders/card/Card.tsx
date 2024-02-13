import { View, Text, Image } from 'react-native'
import React from 'react'
import { OrderType } from '@/types';
import { icons } from '@/constants';
import styles from './card.style'

const Card = (order: OrderType) => {
    return (
        <View style={styles.card}>
            {/* <Text>{order.weight}</Text> */}
            <View style={styles.top}>
                <View style={styles.location}>
                    <View style={styles.pickup}>
                        <Text style={styles.address}>{order.pickupAddress}</Text>
                        <Image source={icons.arrow} style={styles.iconArrow} />
                    </View>
                    <View style={styles.drop}>
                        <Text style={styles.address}>{order.dropOffAddress}</Text>
                        <Text style={styles.distanceText}>{order.distance}</Text>
                    </View>
                </View>
                <View style={styles.status}>
                    <Text style={styles.statusText}>{order.status}</Text>
                </View>
            </View>
            <View style={styles.bottom}>
                <View>
                    <Text>
                        <Text style={styles.weightText}>{order.weight} kg, </Text>
                        <Text style={styles.packageText}>{order.packageType}</Text>
                    </Text>
                    <Text style={styles.dateText}>{order.dateStart} - {order.dateFinish}</Text>
                </View>
                <View>
                    <Text style={styles.volumeText}>{order.volume} m3</Text>
                    <Text style={styles.priceText}>{order.price} USD</Text>
                </View>
            </View>
        </View>
    )
}

export default Card