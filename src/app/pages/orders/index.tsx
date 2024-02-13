// Main imports
import React from 'react';
import { View, useWindowDimensions } from "react-native";
import { TabView, SceneMap } from 'react-native-tab-view';
// Components imports
import List from '@/components/orders/list/List';

const FirstRoute = () => (
    <List />
);

const SecondRoute = () => (
    <List />
);

const ThirdRoute = () => (
    <List />
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
        { key: 'first', title: 'All' },
        { key: 'second', title: 'Active' },
        { key: 'third', title: 'Finished' },
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
