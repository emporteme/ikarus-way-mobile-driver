import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React from 'react'
import { useLocalSearchParams, Stack } from 'expo-router';
import { orders } from '@/components/orders/list/data'
import { OrderType } from '@/types'
import { icons } from '@/constants';
import styles from '@/style/orderDetails.style';

const OrderDetail = () => {
    const { id } = useLocalSearchParams();

    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: `Order #${id}`,
                    headerTitleAlign: 'center',
                    headerRight: () => (

                        // Maybe I need to use router.back(), but for now this logic fits well.
                        // router.push('/pages/services')}
                        <View style={styles.status}>
                            <Text style={styles.statusText}>Edit</Text>
                        </View>
                    ),
                }}
            />
            <Text style={{ marginHorizontal: 'auto' }}>{id} USD</Text>
            <ScrollView>
                <View>
                    <Text>Pickup</Text>
                    <View>
                        <Image source={icons.kz_flag} style={styles.iconFlag} />
                        <View>
                            <Text>
                                <Text>Astana, KZ</Text>
                                <Text>  ·  </Text>
                                <Text>Tsetkinoy, bld. 79/А</Text>
                            </Text>
                            <Text>14 Jan 2024, 12:00</Text>
                        </View>
                    </View>
                    <View>
                        <Image source={icons.kz_flag} style={styles.iconFlag} />
                        <View>
                            <Text>Good supplies, LTD</Text>
                            <Text>+7 776 666 55 12</Text>
                        </View>
                    </View>
                    <View>
                        <Image source={icons.kz_flag} style={styles.iconFlag} />
                        <View>
                            <Text>
                                <Text>Astana, KZ</Text>
                                <Text>  ·  </Text>
                                <Text>Tsetkinoy, bld. 79/А</Text>
                            </Text>
                            <Text>14 Jan 2024, 12:00</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

export default OrderDetail