// Main imports
import React from 'react';
import { useWindowDimensions, Text, View, Button, ScrollView } from "react-native";
import { Link } from "expo-router";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
// Styles imports
import styles from '@/style/orders.style';
import { FONT } from '@/constants';
import { Empty, MessageList } from '@/components';

async function fetchHello() {
    const response = await fetch('/api/hello');
    const data = await response.json();
    alert('Hello ' + data.hello);
    console.log(data);
}

async function profileHello() {
    const response = await fetch('/api/profile');
    const data = await response.json();
    alert('Hello ' + data.data.first_name);
    console.log(data);
}


const Func = () => (
    <ScrollView style={{ padding: 20 }}>
        <Text>Messages page</Text>
        <Link href={'/onboarding'} style={{ marginTop: 20 }}>
            <Text>Onboarding page (Just for now) </Text>
        </Link>
        <Link href={'/auth'} style={{ marginTop: 20 }}>
            <Text>Login page (Just for now) </Text>
        </Link>
        <Link href={'/qr'} style={{ marginTop: 20 }}>
            <Text>QR scan (Just for now) </Text>
        </Link>

        <Text style={{ marginTop: 40 }}>Testing API</Text>
        <Button onPress={() => fetchHello()} title="Fetch hello" />

        <Text style={{ marginTop: 40 }}>Testing API</Text>
        <Button onPress={() => profileHello()} title="Fetch profile" />

        <Text style={{ marginTop: 40 }}>Testing API</Text>
        <Button onPress={() => profileHello()} title="Fetch orders" />
    </ScrollView>
)

const FirstRoute = () => (
    <Empty />
);

const SecondRoute = () => (
    <MessageList />
);

const ThirdRoute = () => (
    <Func />
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
});

const MessagesPage: React.FC = () => {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'All' },
        { key: 'second', title: 'Sender' },
        { key: 'third', title: 'Expeditor' },
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

export default MessagesPage;
