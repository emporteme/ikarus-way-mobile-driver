// Main imports
import React from 'react';
import { useWindowDimensions, Text } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
// Components imports
import { OrderList } from '@/components';
// Styles imports
import styles from '@/styles/orders.style';
import { FONT } from '@/constants';

const FirstRoute = () => (
    <OrderList status="IN_WORK"/>
);

const SecondRoute = () => (
    <OrderList status="COMPLETED"/>
);

const ThirdRoute = () => (
    <OrderList status="REJECTED"/>
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
});

const OrdersPage: React.FC = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'In work' },
        { key: 'second', title: 'Completed' },
        { key: 'third', title: 'Rejected' },
    ]);

    return (
        <>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={props => <TabBar
                    {...props}
                    renderLabel={({ focused, route }) => {
                        return (
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: focused ? 'black' : '#33333340',
                                    fontFamily: FONT.medium
                                }}
                            >
                                {route.title}
                            </Text >
                        );
                    }}
                    indicatorStyle={styles.indicatorStyle}
                    style={styles.tabbar}
                />}
            />
        </>
    );
}

export default OrdersPage;
