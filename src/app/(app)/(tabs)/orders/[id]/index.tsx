import { View, Text, SafeAreaView, ScrollView, Image, Pressable, Linking, Button, TouchableOpacity } from 'react-native'
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

            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }

            const data = await response.json(); // Parse response data
            setOrderData(data.data); // Update state with fetched data
            console.log(data);
        } catch (error) {
            console.error('Error fetching order:', error);
            alert('Failed to fetch order data');
        }
    }

    // Navigator
    const generateNavigationLink = (destinationLat, destinationLon) => {
        return `https://www.google.com/maps/dir/?api=1&destination=${destinationLat},${destinationLon}`;
    };

    const openNavigation = (destinationLat, destinationLon) => {
        const navigationLink = generateNavigationLink(destinationLat, destinationLon);
        Linking.openURL(navigationLink);
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const options: any = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        };
        return date.toLocaleDateString('en-US', options);
    };

    const handlePhoneCall = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    // Function to calculate total weight from all cargos
    const calculateTotalWeight = () => {
        let totalWeight = 0;
        orderData?.cargo_details_list.forEach((cargo) => {
            totalWeight += parseFloat(cargo.weight);
        });
        return totalWeight.toFixed(2); // Round to 2 decimal places
    };

    // Function to calculate total volume from all cargos
    const calculateTotalVolume = () => {
        let totalVolume = 0;
        orderData?.cargo_details_list.forEach((cargo) => {
            totalVolume += parseFloat(cargo.volume);
        });
        return totalVolume.toFixed(2); // Round to 2 decimal places
    };

    // Function to calculate total quantity from all cargos
    const calculateTotalQuantity = () => {
        let totalQuantity = 0;
        orderData?.cargo_details_list.forEach((cargo) => {
            totalQuantity += parseInt(cargo.quantity, 10);
        });
        return totalQuantity;
    };

    return (
        <SafeAreaView style={styles.body}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: `Order #${id}`,
                    headerTitleAlign: 'center',
                    headerRight: () => (
                        <View style={styles.status}>
                            <Text style={styles.statusText}>{orderData?.status}</Text>
                        </View>
                    ),
                }}
            />
            <View style={styles.body}>
                <ScrollView>
                    <View style={styles.scroll}>
                        {/* Pickup */}
                        <View style={styles.section}>
                            <Text style={styles.title}>Pickup</Text>
                            <View style={styles.row}>
                                <Image source={icons.location} style={styles.iconFlag} />
                                <View style={styles.column}>
                                    <Text style={styles.medSemiMedium}>{orderData?.checkpoints[0]?.address?.display_name}</Text>
                                    <Text style={styles.regSmall2}>{formatTimestamp(orderData?.checkpoints[0]?.time)}</Text>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <Image source={icons.company} style={styles.iconFlag} />
                                <View style={styles.column}>
                                    <Text style={styles.medSemiMedium}>{orderData?.sender?.company_name}</Text>
                                    <Text style={styles.regSmall2}>{orderData?.sender?.phone}</Text>
                                </View>
                            </View>
                            <View style={styles.rowFull}>
                                <View style={styles.row}>
                                    <Image source={icons.user} style={styles.iconFlag} />
                                    <View style={styles.column}>
                                        <Text style={styles.medSemiMedium}>{orderData?.sender?.contact_person?.full_name}</Text>
                                        <Text style={styles.regSmall2}>{orderData?.sender?.contact_person?.phone}</Text>
                                    </View>
                                </View>
                                <View style={styles.row2}>
                                    <TouchableOpacity onPress={() => handlePhoneCall(orderData?.sender?.contact_person?.phone)}>
                                        <Image source={icons.phone} style={styles.iconFlag} />
                                    </TouchableOpacity>
                                    {/* <Image source={icons.message} style={styles.iconFlag} /> */}
                                </View>
                            </View>
                        </View>
                        {/* Drop */}
                        <View style={styles.section}>
                            <Text style={styles.title}>Drop</Text>
                            <View style={styles.row}>
                                <Image source={icons.location} style={styles.iconFlag} />
                                <View style={styles.column}>
                                    <Text style={styles.medSemiMedium}>{orderData?.checkpoints[orderData.checkpoints.length - 1].address?.display_name}</Text>
                                    <Text style={styles.regSmall2}>{formatTimestamp(orderData?.checkpoints[orderData.checkpoints.length - 1]?.time)}</Text>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <Image source={icons.company} style={styles.iconFlag} />
                                <View style={styles.column}>
                                    <Text style={styles.medSemiMedium}>{orderData?.receiver?.company_name}</Text>
                                    <Text style={styles.regSmall2}>{orderData?.receiver?.phone}</Text>
                                </View>
                            </View>
                            <View style={styles.rowFull}>
                                <View style={styles.row}>
                                    <Image source={icons.user} style={styles.iconFlag} />
                                    <View style={styles.column}>
                                        <Text style={styles.medSemiMedium}>{orderData?.receiver?.contact_person?.full_name}</Text>
                                        <Text style={styles.regSmall2}>{orderData?.receiver?.contact_person?.phone}</Text>
                                    </View>
                                </View>
                                <View style={styles.row2}>
                                    <TouchableOpacity onPress={() => handlePhoneCall(orderData?.receiver?.contact_person?.phone)}>
                                        <Image source={icons.phone} style={styles.iconFlag} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.lineH} />
                        {/* Cargo details */}
                        <View style={styles.section}>
                            <Text style={styles.title}>Cargo details</Text>
                            <>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Total weight</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>{calculateTotalWeight()} kg</Text>
                                </Text>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Total volume</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>{calculateTotalVolume()} m³</Text>
                                </Text>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Total Quantity</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>{calculateTotalQuantity()}</Text>
                                </Text>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Cargo names</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>
                                        {orderData?.cargo_details_list.map((cargo, index) => (
                                            <React.Fragment key={index}>
                                                {cargo.cargo_name}
                                                {index !== orderData.cargo_details_list.length - 1 && ', '}
                                            </React.Fragment>
                                        ))}
                                    </Text>
                                </Text>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Type of goods</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>
                                        {orderData?.cargo_details_list.map((cargo, index) => (
                                            <React.Fragment key={index}>
                                                {cargo.nature_of_goods}
                                                {index !== orderData.cargo_details_list.length - 1 && ', '}
                                            </React.Fragment>
                                        ))}
                                    </Text>
                                </Text>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Packaging type</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>
                                        {orderData?.cargo_details_list.map((cargo, index) => (
                                            <React.Fragment key={index}>
                                                {cargo.packaging_type}
                                                {index !== orderData.cargo_details_list.length - 1 && ', '}
                                            </React.Fragment>
                                        ))}
                                    </Text>
                                </Text>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Special instructions</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>
                                        {orderData?.cargo_details_list.map((cargo, index) => (
                                            <React.Fragment key={index}>
                                                {cargo.special_instruction}
                                                {index !== orderData.cargo_details_list.length - 1 && ', '}
                                            </React.Fragment>
                                        ))}
                                    </Text>
                                </Text>
                            </>
                        </View>
                        {/* Special conditions */}
                        <View style={styles.section}>
                            <Text style={styles.title2}>Special conditions</Text>
                            <View style={styles.column2}>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Temperature</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>{orderData?.cargo_condition?.temperature?.min} ; {orderData?.cargo_condition?.temperature?.max} ℃</Text>
                                </Text>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Humidity</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>{orderData?.cargo_condition?.humidity?.min} ; {orderData?.cargo_condition?.humidity?.max}%</Text>
                                </Text>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Pressure</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>{orderData?.cargo_condition?.pressure?.min} ; {orderData?.cargo_condition?.pressure?.max}kPa</Text>
                                </Text>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Freight Trucking</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>{orderData?.cargo_condition?.freight_trucking ? 'Enabled' : 'Disabled'}</Text>
                                </Text>
                            </View>
                        </View>
                        {/* Checkpoints */}
                        <View style={styles.lineH} />
                        <View style={styles.section}>
                            <Text style={styles.title}>Checkpoints:</Text>
                            {orderData?.checkpoints.map((checkpoint, index) => (
                                <View key={index}>
                                    <Text style={styles.regSemiMedium}>Checkpoint {index + 1}:</Text>
                                    <Text style={styles.regSmall2}>{checkpoint.address.display_name}</Text>
                                    <Pressable
                                        onPress={() => openNavigation(checkpoint.address.lat, checkpoint.address.lon)}
                                        style={styles.navigationBtn}
                                    >
                                        <Text style={styles.navigationText}>Navigate</Text>
                                    </Pressable>
                                </View>
                            ))}
                        </View>
                        <View style={styles.lineH} />
                        {/* IoT devices */}
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
                        {/* Penalties */}
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
                        {/* Payment details */}
                        <View style={styles.section}>
                            <Text style={styles.title2}>Payment details</Text>
                            <View>
                                <Text style={styles.regSmall2}>"50% payment is required upfront before commencing the design work, with the remaining 50% due upon project completion."</Text>
                            </View>
                        </View>
                        <View style={styles.lineH} />
                        {/* Expenses */}
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
                        {/* Team members */}
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
                <Link href={`/orders/${id}/expenses`} asChild>
                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Add expenses</Text>
                        <Image source={icons.card} style={styles.buttonIcon} />
                    </Pressable>
                </Link>
            </View>
        </SafeAreaView >
    );
}

export default OrderDetail