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
                            <Text style={styles.statusText}>Status</Text>
                        </View>
                    ),
                }}
            />
            {/* <Text style={{ marginHorizontal: 'auto' }}>{id} USD</Text> */}
            <View style={styles.body}>
                <ScrollView style={styles.scroll}>
                    <View style={styles.section}>
                        <Text style={styles.title}>Pickup</Text>
                        <View style={styles.row}>
                            <Image source={icons.kz_flag} style={styles.iconFlag} />
                            <View style={styles.column}>
                                <Text style={styles.row}>
                                    <Text style={styles.medSemiMedium}>Astana, KZ</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.regSemiMedium}>Tsetkinoy, bld. 79/А</Text>
                                </Text>
                                <Text style={styles.regSmall2}>14 Jan 2024, 12:00</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <Image source={icons.company} style={styles.iconFlag} />
                            <View style={styles.column}>
                                <Text style={styles.medSemiMedium}>Good supplies, LTD</Text>
                                <Text style={styles.regSmall2}>+7 776 666 55 12</Text>
                            </View>
                        </View>
                        <View style={styles.rowFull}>
                            <View style={styles.row}>
                                <Image source={icons.user} style={styles.iconFlag} />
                                <View style={styles.column}>
                                    <Text style={styles.medSemiMedium}>Ivan Ivanov</Text>
                                    <Text style={styles.regSmall2}>+7 776 666 55 12</Text>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <Image source={icons.phone} style={styles.iconFlag} />
                                <Image source={icons.message} style={styles.iconFlag} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.title}>Drop</Text>
                        <View style={styles.row}>
                            <Image source={icons.kz_flag} style={styles.iconFlag} />
                            <View style={styles.column}>
                                <Text style={styles.row}>
                                    <Text style={styles.medSemiMedium}>ALmaty, KZ</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.regSemiMedium}>Auezov, bld. 79/А</Text>
                                </Text>
                                <Text style={styles.regSmall2}>17 Jan 2024, 12:00</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <Image source={icons.company} style={styles.iconFlag} />
                            <View style={styles.column}>
                                <Text style={styles.medSemiMedium}>BR Group</Text>
                                <Text style={styles.regSmall2}>+7 776 666 55 12</Text>
                            </View>
                        </View>
                        <View style={styles.rowFull}>
                            <View style={styles.row}>
                                <Image source={icons.user} style={styles.iconFlag} />
                                <View style={styles.column}>
                                    <Text style={styles.medSemiMedium}>Anton Antonov</Text>
                                    <Text style={styles.regSmall2}>+7 776 666 55 12</Text>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <Image source={icons.phone} style={styles.iconFlag} />
                                <Image source={icons.message} style={styles.iconFlag} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.lineH} />
                    <View style={styles.section}>
                        <Text style={styles.title}>Drop</Text>
                        <View style={styles.row}>
                            <Image source={icons.kz_flag} style={styles.iconFlag} />
                            <View style={styles.column}>
                                <Text style={styles.row}>
                                    <Text style={styles.medSemiMedium}>ALmaty, KZ</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.regSemiMedium}>Auezov, bld. 79/А</Text>
                                </Text>
                                <Text style={styles.regSmall2}>17 Jan 2024, 12:00</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <Image source={icons.company} style={styles.iconFlag} />
                            <View style={styles.column}>
                                <Text style={styles.medSemiMedium}>BR Group</Text>
                                <Text style={styles.regSmall2}>+7 776 666 55 12</Text>
                            </View>
                        </View>
                        <View style={styles.rowFull}>
                            <View style={styles.row}>
                                <Image source={icons.user} style={styles.iconFlag} />
                                <View style={styles.column}>
                                    <Text style={styles.medSemiMedium}>Anton Antonov</Text>
                                    <Text style={styles.regSmall2}>+7 776 666 55 12</Text>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <Image source={icons.phone} style={styles.iconFlag} />
                                <Image source={icons.message} style={styles.iconFlag} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.title}>Drop</Text>
                        <View style={styles.row}>
                            <Image source={icons.kz_flag} style={styles.iconFlag} />
                            <View style={styles.column}>
                                <Text style={styles.row}>
                                    <Text style={styles.medSemiMedium}>ALmaty, KZ</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.regSemiMedium}>Auezov, bld. 79/А</Text>
                                </Text>
                                <Text style={styles.regSmall2}>17 Jan 2024, 12:00</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <Image source={icons.company} style={styles.iconFlag} />
                            <View style={styles.column}>
                                <Text style={styles.medSemiMedium}>BR Group</Text>
                                <Text style={styles.regSmall2}>+7 776 666 55 12</Text>
                            </View>
                        </View>
                        <View style={styles.rowFull}>
                            <View style={styles.row}>
                                <Image source={icons.user} style={styles.iconFlag} />
                                <View style={styles.column}>
                                    <Text style={styles.medSemiMedium}>Anton Antonov</Text>
                                    <Text style={styles.regSmall2}>+7 776 666 55 12</Text>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <Image source={icons.phone} style={styles.iconFlag} />
                                <Image source={icons.message} style={styles.iconFlag} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView >
    );
}

export default OrderDetail