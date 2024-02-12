// Main imports
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, useWindowDimensions } from "react-native";
import { TabView, SceneMap } from 'react-native-tab-view';

// Routing imports
import { Stack, Link } from "expo-router";

// Components
import Account from '@/components/home/account/Account';
import QuickActions from '@/components/home/quick/Quick';


const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: 'red' }} />
);

const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

const OrdersPage = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
    ]);

    return (
        <>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
        </>
    );
}

export default OrdersPage;
