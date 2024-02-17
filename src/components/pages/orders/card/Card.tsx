import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import { OrderType } from '@/types';
import { icons } from '@/constants';
import styles from './card.style'

const Card = (order: OrderType): React.JSX.Element => {
    return (
        <Link href={`/pages/orders/${order.id}`} asChild>
            <Pressable style={styles.card}>
                {/* <Text>{order.weight}</Text> */}
                <View style={styles.top}>
                    <View style={styles.location}>
                        <View style={styles.pickup}>
                            <Image source={icons.kz_flag} style={styles.flag} />
                            <Text style={styles.addressText}>{order.pickupAddress}</Text>
                            <Image source={icons.arrow} style={styles.iconArrow} />
                        </View>
                        <View style={styles.pickup}>
                            <Image source={icons.kz_flag} style={styles.flag} />
                            <Text style={styles.addressText}>{order.dropOffAddress}</Text>
                            <Text style={styles.distanceText}>{order.distance} km</Text>
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
                        <Text style={styles.detailsText}>{order.volume} m³</Text>
                        <Text style={styles.detailsText}>{order.price} USD</Text>
                    </View>
                </View>
            </Pressable>
        </Link>
    )
}

export default Card