import { View, Text, SafeAreaView, ScrollView, Image, Pressable, Linking, Button, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useLocalSearchParams, Stack, Link } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import * as Sharing from 'expo-sharing';
import { icons } from '@/constants';
import { useSession } from '@/components/core/Context';
import { OrderType } from '@/types';
import { orderDetailsStatusName } from '@/components/pages/orders/card/orderDetailsStatusName';
import styles from '@/styles/orderDetails.style';

const OrderDetail: React.FC<OrderType> = () => {
    const { id } = useLocalSearchParams();

    // Auth context
    const { jwtToken } = useSession(); // Destructure jwtToken from useSession

    // Order Data fetching
    const [orderData, setOrderData] = useState<any>(null);

    useEffect(() => {
        fetchOrder(jwtToken); // Pass jwtToken as parameter
    }, [jwtToken]); // Add jwtToken to dependency array

    const fetchOrder = async (jwtToken: string) => { // Accept jwtToken as parameter
        try {
            if (!jwtToken) {
                throw new Error('JWT token not found');
            }
            const apiUrl = process.env.EXPO_PUBLIC_API_URL;

            // Fetch order data with {id} route
            const response = await fetch(`${apiUrl}carrier/orders/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jwtToken
                },
            });


            // // New logic with POST request
            // const response = await fetch(`${apiUrl}carrier/orders`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': 'Bearer ' + jwtToken
            //     },
            //     body: JSON.stringify({ status_list: [] })
            // });

            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }

            // Old logic with {id} route
            const data = await response.json(); // Parse response data
            setOrderData(data.data); // Update state with fetched data
            console.log(data);

            // // New logic with POST request
            // const data = await response.json(); // Parse response data
            // setOrderData(data.data[Number(id) - 1]); // Update state with fetched data
            // console.log("All data: ", data)
            // console.log(`Orders data ${id}: `, data.data[Number(id) - 1]);
        } catch (error) {
            console.error('Error fetching order:', error);
            alert('Failed to fetch order data');
        }
    }

    // Receipts Data fetching
    const [receiptsData, setReceiptsData] = useState<any>(null);

    useEffect(() => {
        fetchReceipts(jwtToken);
    }, [jwtToken]);

    const fetchReceipts = async (jwtToken: string) => {
        try {
            if (!jwtToken) {
                throw new Error('JWT token not found');
            }
            const apiUrl = process.env.EXPO_PUBLIC_API_URL;

            const response = await fetch(`${apiUrl}receipts/order/${id}`, {
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
            setReceiptsData(data.data); // Update state with fetched data
            console.log(data);
        } catch (error) {
            console.error('Error fetching receipts:', error);
            alert('Failed to fetch receipts data');
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

    const groupReceiptsByDate = (receiptsData: any[]) => {
        const groupedReceipts: { [date: string]: any[] } = {};

        receiptsData?.forEach((receipt) => {
            const date = new Date(receipt.timestamp).toLocaleDateString();
            if (!groupedReceipts[date]) {
                groupedReceipts[date] = [];
            }
            groupedReceipts[date].push(receipt);
        });

        return groupedReceipts;
    };

    const groupedReceipts = receiptsData ? groupReceiptsByDate(receiptsData) : {};

    const downloadFile = async (fileId, fileName) => {
        try {
            const apiUrl = process.env.EXPO_PUBLIC_API_URL;
            const url = `${apiUrl}receipts/download/${id}/${fileId}`;
            const downloadResumable = FileSystem.createDownloadResumable(
                url,
                FileSystem.documentDirectory + fileName
            );

            const { uri } = await downloadResumable.downloadAsync();

            console.log('File downloaded successfully:', uri);

            // Read the downloaded file as a byte array
            const fileByteArray = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            // Convert the byte array to a normal file
            const convertedFileUri = FileSystem.cacheDirectory + fileName;
            await FileSystem.writeAsStringAsync(convertedFileUri, fileByteArray, {
                encoding: FileSystem.EncodingType.Base64,
            });

            // Open or share the converted file
            openDownloadedFile(convertedFileUri);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const openDownloadedFile = async (fileUri) => {
        try {
            await Sharing.shareAsync(fileUri);
            // Or you can use other methods to open the file depending on your requirements
        } catch (error) {
            console.error('Error opening file:', error);
        }
    };

    // Get the mapped status name
    const statusName = orderDetailsStatusName[orderData?.status]?.name || 'Unknown Status';

    return (
        <SafeAreaView style={styles.body}>
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: `Order #${id}`,
                    headerTitleAlign: 'left',
                    headerRight: () => (
                        <View style={styles.status}>
                            <Text style={styles.statusText}>{statusName}</Text>
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
                                    <Text style={styles.medSemiMedium2}>{orderData?.cargo_condition?.pressure?.min} ; {orderData?.cargo_condition?.pressure?.max} kPa</Text>
                                </Text>
                                <Text style={styles.row}>
                                    <Text style={styles.regSemiMedium}>Freight Trucking</Text>
                                    <Text style={styles.medSemiMedium}>  ·  </Text>
                                    <Text style={styles.medSemiMedium2}>{orderData?.cargo_condition?.freight_trucking ? 'Enabled' : 'Disabled'}</Text>
                                </Text>
                            </View>
                        </View>
                        <View style={styles.lineH} />
                        {/* Checkpoints */}
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
                        {/* <View style={styles.lineH} /> */}
                        {/* IoT devices */}
                        {/* <View style={styles.section}>
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
                        </View> */}
                        {/* <View style={styles.lineH} /> */}
                        {/* Penalties */}
                        {/* <View style={styles.section}>
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
                        <View style={styles.lineH} /> */}
                        {/* Payment details */}
                        {/* <View style={styles.section}>
                            <Text style={styles.title2}>Payment details</Text>
                            <View>
                                <Text style={styles.regSmall2}>"50% payment is required upfront before commencing the design work, with the remaining 50% due upon project completion."</Text>
                            </View>
                        </View> */}
                        {/* <View style={styles.lineH} /> */}
                        {/* Expenses */}
                        {/* <View style={styles.section}>
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
                                <View style={styles.column}>
                                    <Text style={styles.row}>
                                        <Text style={styles.regSemiMedium}>Fuel</Text>
                                        <Text style={styles.medSemiMedium}>  ·  </Text>
                                        <Text style={styles.medSemiMedium2}>4.99 USD</Text>
                                    </Text>
                                    <Text>Yo</Text>
                                </View>
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
                        </View> */}
                        <View style={styles.lineH} />
                        <View style={styles.section}>
                            <Text style={styles.title}>Expenses</Text>
                            {Object.entries(groupedReceipts)?.map(([date, receipts]) => (
                                <View key={date} style={styles.column2}>
                                    <Text style={styles.regSmall2}>{date}</Text>
                                    {receipts?.map((receipt) => (
                                        <View key={receipt.receiptId} style={styles.column2}>
                                            <Text style={styles.row}>
                                                <Text style={styles.regSemiMedium}>{receipt.receiptType}</Text>
                                                <Text style={styles.medSemiMedium}>  ·  </Text>
                                                <Text style={styles.medSemiMedium2}>{receipt.price} {receipt.currency}</Text>
                                            </Text>
                                            <View style={styles.fileContainer}>
                                                {receipt?.filesInfo.map((file) => (
                                                    <Pressable key={file.file_id} onPress={() => downloadFile(file.file_id, file.name)} style={styles.fileItem}>
                                                        <Image source={icons.attach} style={styles.fileIcon} />
                                                        <Text style={styles.fileText}>{file.name}</Text>
                                                    </Pressable>
                                                ))}
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            ))}
                        </View>
                        <View style={styles.lineH} />
                        {/* Team members */}
                        <View style={styles.section}>
                            <Text style={styles.title}>Team members</Text>
                            {orderData?.users_access?.map((member, index) => (
                                <View key={index} style={styles.rowFull}>
                                    <View style={styles.row}>
                                        <Image source={icons.user} style={styles.iconFlag} />
                                        <View style={styles.column}>
                                            <Text style={styles.medSemiMedium}>{member.name}</Text>
                                            <Text style={styles.regSmall2}>{member.role}</Text>
                                        </View>
                                    </View>
                                    {/* If you want to add a phone icon and functionality */}
                                    <TouchableOpacity onPress={() => handlePhoneCall(member?.phone)} style={styles.row2}>
                                        <Image source={icons.phone} style={styles.iconFlag} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>
                <>
                    {statusName === "Pending" && (
                        <>
                            <View style={styles.buttons}>
                                <Link href={`/orders/${id}/otp`} asChild>
                                    <Pressable style={styles.button}>
                                        <Text style={styles.buttonText}>Start</Text>
                                        {/* <Image source={icons.card} style={styles.buttonIcon} /> */}
                                    </Pressable>
                                </Link>
                            </View>
                        </>
                    )}

                    {statusName === "Tracking" && (
                        <View style={styles.buttons}>
                            <Link href={`/orders/${id}/expenses`} asChild>
                                <Pressable style={styles.button}>
                                    <Text style={styles.buttonText}>Add expenses</Text>
                                    <Image source={icons.card} style={styles.buttonIcon} />
                                </Pressable>
                            </Link>
                            <Link href={`/orders/${id}/otp`} asChild>
                                <Pressable style={styles.button_p}>
                                    <Text style={styles.buttonText_p}>Finish</Text>
                                </Pressable>
                            </Link>
                        </View>
                    )}

                    {statusName === "Closed" && (
                        <>
                            {/* Render nothing for Closed status */}
                        </>
                    )}

                </>
            </View>
        </SafeAreaView >
    );
}

export default OrderDetail