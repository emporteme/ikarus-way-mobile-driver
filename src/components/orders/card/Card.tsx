import { View, Text, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import { OrderType } from '@/types';
import { icons } from '@/constants';
import styles from './card.style'

const Card = (order: OrderType) => {
    return (
        <Link href={`/pages/orders/${order.id}`} asChild>
            <View style={styles.card}>
                {/* <Text>{order.weight}</Text> */}
                <View style={styles.top}>
                    <View style={styles.location}>
                        <View style={styles.pickup}>
                            <Text style={styles.addressText}>{order.pickupAddress}</Text>
                            <Image source={icons.arrow} style={styles.iconArrow} />
                        </View>
                        <View style={styles.drop}>
                            <Text style={styles.addressText}>{order.dropOffAddress}</Text>
                            <Text style={styles.detailsText}>{order.distance} km</Text>
                        </View>
                    </View>
                    <View style={styles.status}>
                        <Text style={styles.statusText}>{order.status}</Text>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <View>
                        <Text>
                            <Text style={styles.detailsText}>{order.weight} kg, </Text>
                            <Text style={styles.packageText}>{order.packageType}</Text>
                        </Text>
                        <Text style={styles.detailsText}>{order.dateStart}  ·  {order.dateFinish}</Text>
                    </View>
                    <View style={styles.last}>
                        <Text style={styles.detailsText}>{order.volume} m3</Text>
                        <Text style={styles.detailsText}>{order.price} USD</Text>
                    </View>
                </View>
            </View>
        </Link>
    )
}

export default Card