import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import { OrderType } from '@/types';
import { icons } from '@/constants';
// import CountryFlag from 'react-native-country-flags';
import CountryFlag from "react-native-country-flag";
import styles from './card.style'

const OrderCard: React.FC<OrderType> = (order) => {
    // Convert timestamps to Date objects
    const departureDate = new Date(order.departure_date);
    const arrivalDate = new Date(order.arrival_date);

    // Function to format date to "dd MMM" format
    const formatDate = (date) => {
        const options = { day: 'numeric', month: 'short' };
        return date.toLocaleDateString('en-US', options);
    };

    // Function to calculate volume of a cargo item
    const calculateVolume = (cargo) => {
        const { length, width, height } = cargo;
        const volume = parseFloat(length) * parseFloat(width) * parseFloat(height);
        // Limit to 2 decimal places
        return Number(volume.toFixed(2));
    };

    // Calculate volumes of all cargo items separately
    const volumes = order.cargo_details_list.map(cargo => calculateVolume(cargo));

    // Calculate total volume by summing up volumes of all cargo items
    const totalVolume = volumes.reduce((acc, curr) => acc + curr, 0);

    // Helper function to parse weight
    const parseWeight = (weight) => {
        return parseFloat(weight);
    };

    // Helper function to parse addresses
    const parseAddress = (address) => {
        // Your logic for parsing the address, e.g., splitting into components
        return address;
    };

    // Helper function to format price with currency
    const formatPrice = (price, currency) => {
        return `${price.toFixed(2)} ${currency}`;
    };

    // Function to calculate total weight of all cargo items
    const calculateTotalWeight = (cargoDetailsList) => {
        return cargoDetailsList.reduce((totalWeight, cargo) => {
            return totalWeight + parseFloat(cargo.weight);
        }, 0);
    };

    // Function to calculate total price of all cargo items
    const calculateTotalPrice = (cargoDetailsList) => {
        return cargoDetailsList.reduce((totalPrice, cargo) => {
            return totalPrice + parseFloat(cargo.value_of_cargo);
        }, 0);
    };

    // Calculate total weight of all cargo items
    const totalWeight = calculateTotalWeight(order.cargo_details_list);

    // Calculate total price of all cargo items
    const totalPrice = calculateTotalPrice(order.cargo_details_list);

    // Get the addresses of the first checkpoint's start and last checkpoint's end
    const initialAddress = order.checkpoints[0].address?.display_name;
    const finalAddress = order.checkpoints[order.checkpoints.length - 1].address?.display_name;

    // Shorten the city names to 5 letters
    const shortenName = (name) => {
        return name?.length > 15 ? name.substring(0, 15) : name;
    };
    return (
        <Link href={`/orders/${order.order_id}`} asChild>
            <Pressable style={styles.card}>
                {/* <Text>{order.weight}</Text> */}
                <View style={styles.top}>
                    <View style={styles.location}>
                        <View style={styles.pickup}>
                            {/* <Image source={icons.kz_flag} style={styles.flag} />
                            <CountryFlag countryCode="US" size={32} />
                            <CountryFlag countryCode={initialAddress.country_code} size={32} /> */}
                            <Text style={styles.addressText}>{shortenName(initialAddress)}...</Text>
                            <Image source={icons.arrow} style={styles.iconArrow} />
                        </View>
                        <View style={styles.pickup}>
                            {/* <Image source={icons.kz_flag} style={styles.flag} /> */}
                            <Text style={styles.addressText}>{shortenName(finalAddress)}...</Text>
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
                            <Text style={styles.detailsText}>{totalWeight} kg, </Text>
                            <Text style={styles.packageText}>{order.packageType}</Text>
                        </Text>
                        <Text style={styles.detailsText}>{formatDate(departureDate)}  ·  {formatDate(arrivalDate)}</Text>
                    </View>
                    <View style={styles.last}>
                        {/* <Text style={styles.detailsText}>{order.volume} m³</Text> */}
                        {volumes.map((volume, index) => (
                            <Text key={index}>{index > 0 ? ', ' : ''}{volume} m³</Text>
                        ))}
                        <Text style={styles.detailsText}>{totalPrice}  {order.cargo_details_list[0].currency}</Text>
                    </View>
                </View>
            </Pressable>
        </Link>
    )
}

export default OrderCard