// Main imports
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, useWindowDimensions } from "react-native";
import { TabView, SceneMap } from 'react-native-tab-view';
// Components imports
import List from '@/components/orders/list/List';

const FirstRoute = () => (
    <List />
);

const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: 'green' }} />
);

const ThirdRoute = () => (
    <View style={{ flex: 1, backgroundColor: 'blue' }} />
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
});

const OrdersPage = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
        { key: 'third', title: 'Third' },
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
