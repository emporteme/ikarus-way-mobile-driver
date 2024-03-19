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
    <OrderList status={["TRACKING_CARRIER", "PENDING_CARRIER", "ACCEPTED_CLIENT_CARRIER", "OFFER_CARRIER", "IN_WORK_EXECUTOR", "IN_WORK_CARRIER", "VIEW_CARRIER", "CONFIRM_PAYMENT_EXECUTOR", "TRACKING_CARRIER_DEMO", "PENDING_TRACKING_CARRIER", "PENDING_SC_CARRIER", "CONFIRM_PAYMENT_ADVANCE_EXECUTOR", "WAITING_PAYMENT_ADVANCE_EXECUTOR", "WAITING_CONFIRM_TRANSPORT_CARRIER", "CHOSE_TRANSPORT_FROM_AS_CARRIER", "CHOSE_TRANSPORT_CARRIER", "ACCEPTED_EXECUTOR_CARRIER", "OFFER_EXECUTOR", "VIEW_EXECUTOR"]} />
);

const SecondRoute = () => (
    <OrderList status={["FINISHED_CARRIER_DEMO", "FINISHED_CARRIER"]} />
);

const ThirdRoute = () => (
    <OrderList status={["REJECT_VIEW_CARRIER", "REJECT_NOT_ACCEPTED_CLIENT_CARRIER"]} />
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
