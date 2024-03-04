import { View, Text, SafeAreaView, ScrollView, Image, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useLocalSearchParams, Stack, Link } from 'expo-router';
import { icons } from '@/constants';
import { useSession } from '@/components/core/Context';
import { OrderType } from '@/types';
import styles from '@/style/orderDetails.style';

const OrderDetail: React.FC<OrderType> = () => {
    const { id } = useLocalSearchParams();

    // Auth context
    const { jwtToken } = useSession(); // Destructure jwtToken from useSession

    // Data fetching
    const [orderData, setOrderData] = useState<any>(null);

    useEffect(() => {
        fetchOrder(jwtToken); // Pass jwtToken as parameter
    }, [jwtToken]); // Add jwtToken to dependency array

    const fetchOrder = async (jwtToken: string) => { // Accept jwtToken as parameter
        try {
            if (!jwtToken) {
                throw new Error('JWT token not found');
            }

            const response = await fetch(`https://app-test.prometeochain.io/api/v1/carrier/orders/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json(); // Parse response data
            setOrderData(data.data); // Update state with fetched data
            console.log(data);
        } catch (error) {
            console.error('Error fetching order:', error);
            alert('Failed to fetch order data');
        }
    }

    return (
        <SafeAreaView style={styles.body}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: `Order #${id}`,
                    headerTitleAlign: 'center',
                    headerRight: () => (
                        <View style={styles.status}>
                            <Text style={styles.statusText}>Status</Text>
                        </View>
                    ),
                }}
            />
            <View style={styles.body}>
                <ScrollView>
                    <View style={styles.scroll}>
                        <View style={styles.section}>
                            <Text style={styles.title}>Pickup {orderData?.departure_date}</Text>
                            <View style={styles.row}>
                                <Image source={icons.location} style={styles.iconFlag} />
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
                                        <Text style={styles.medSemiMedium}>Almaty, KZ</Text>
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
                            <Text style={styles.title}>Cargo details</Text>
                            <>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Type of goods</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>Food</Text>
                                </Text>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Total weight</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>2 200 kg</Text>
                                </Text>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Total volume</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>200 m³</Text>
                                </Text>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Total price</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>2 000 USD</Text>
                                </Text>
                            </>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.title2}>Special conditions</Text>
                            <View style={styles.column2}>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Temperature</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>-5 ; 30℃</Text>
                                </Text>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Humidity</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>40 ; 80%</Text>
                                </Text>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Pressure</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>120 ; 160kPa</Text>
                                </Text>
                            </View>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.title2}>Special instructions</Text>
                            <View>
                                <Text style={styles.regSmall2}>"Handle with care: Your package's safe journey relies on your careful attention during the delivery process. Thank you for ensuring a secure arrival!"</Text>
                            </View>
                        </View>
                        <View style={styles.lineH} />
                        <View style={styles.section}>
                            <Text style={styles.title}>IoT devices</Text>
                            <>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>GPS coordinates</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>37.7749, -122.4194</Text>
                                </Text>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Vehicle speed</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>45 km/h</Text>
                                </Text>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Engine temperature</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>90 °C</Text>
                                </Text>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Oil pressure</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>40 psi</Text>
                                </Text>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Fuel consumption</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>5 l/h</Text>
                                </Text>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Fuel level</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>70 %</Text>
                                </Text>
                            </>
                        </View>
                        <View style={styles.lineH} />
                        <View style={styles.section}>
                            <Text style={styles.title}>Penalties</Text>
                            <>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Late delivery</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>20%</Text>
                                </Text>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Damaged goods</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>1.5%</Text>
                                </Text>
                            </>
                        </View>
                        <View style={styles.lineH} />
                        <View style={styles.section}>
                            <Text style={styles.title2}>Payment details</Text>
                            <View>
                                <Text style={styles.regSmall2}>"50% payment is required upfront before commencing the design work, with the remaining 50% due upon project completion."</Text>
                            </View>
                        </View>
                        <View style={styles.lineH} />
                        <View style={styles.section}>
                            <Text style={styles.title}>Expenses</Text>
                            <View style={styles.column2}>
                                <Text style={styles.regSmall2}>14.01.2024</Text>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Food</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>29.99 USD</Text>
                                </Text>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Hotel</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>41.99 USD</Text>
                                </Text>
                            </View>
                            <View style={styles.column2}>
                                <Text style={styles.regSmall2}>15.01.2024</Text>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Fuel</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>4.99 USD</Text>
                                </Text>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Food</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>12.99 USD</Text>
                                </Text>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Auto service</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>6.99 USD</Text>
                                </Text>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Hotel</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>39.99 USD</Text>
                                </Text>
                            </View>
                        </View>
                        <View style={styles.lineH} />
                        <View style={styles.section}>
                            <Text style={styles.title}>Team members</Text>
                            <>
                                <View style={styles.rowFull}>
                                    <View style={styles.row}>
                                        <Image source={icons.user} style={styles.iconFlag} />
                                        <View style={styles.column}>
                                            <Text style={styles.medSemiMedium}>Anton Antonov</Text>
                                            <Text style={styles.regSmall2}>Logistic manager</Text>
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <Image source={icons.phone} style={styles.iconFlag} />
                                        <Image source={icons.message} style={styles.iconFlag} />
                                    </View>
                                </View>
                            </>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.buttons}>
                    <Link href={`/orders/${id}/expenses`} asChild>
                        <Pressable style={styles.button}>
                            <Text style={styles.buttonText}>Navigator</Text>
                            <Image source={icons.card} style={styles.buttonIcon} />
                        </Pressable>
                    </Link>
                    <Link href={`/orders/${id}/expenses`} asChild>
                        <Pressable style={styles.button}>
                            <Text style={styles.buttonText}>Add expenses</Text>
                            <Image source={icons.card} style={styles.buttonIcon} />
                        </Pressable>
                    </Link>
                </View>
            </View>
        </SafeAreaView >
    );
}

export default OrderDetail