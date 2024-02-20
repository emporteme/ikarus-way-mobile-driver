// Main imports
import React from 'react';
import { useWindowDimensions, Text } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
// Components imports
import { IotList, Profile, Vehicle } from '@/components';
// Styles imports
import styles from '@/style/orders.style';
import { FONT } from '@/constants';

const FirstRoute = () => (
    <Profile />
);

const SecondRoute = () => (
    <Vehicle />
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

const AccountPage: React.FC = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Profile' },
        { key: 'second', title: 'Vehicle' },
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
                                    // fontWeight: focused ? '500' : '500',
                                    color: focused ? 'black' : '#33333340',
                                    fontFamily: FONT.medium
                                    // backgroundColor:'red'
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

export default AccountPage;
