// Main imports
import React from 'react';
import { useWindowDimensions, Text, View, Button, ScrollView, Pressable } from "react-native";
import { Link } from "expo-router";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
// Styles imports
import styles from '@/style/orders.style';
import { FONT } from '@/constants';
import { Empty, MessageList } from '@/components';

import { useSession } from '@/components/core/Context';

async function fetchHello() {
    // const response = await fetch('/api/hello');
    // const data = await response.json();
    // alert('Hello ' + data.hello);
    // console.log(data);
    try {
        const response = await fetch('/api/hello'); // Using JSONPlaceholder mock API
        if (!response.ok) {
            throw new Error('Failed to fetch hello data');
        }
        const data = await response.json();
        alert('Hello ' + data.hello);
        console.log(data);
    } catch (error) {
        console.error(error);
        alert('Failed to fetch hello data');
    }
}

async function fetchProfile() {
    const response = await fetch('/api/profile');
    const data = await response.json();
    alert('Hello ' + data.data.first_name);
    console.log(data);
}

async function fetchTest() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1'); // Using JSONPlaceholder mock API
        if (!response.ok) {
            throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        alert('Hello ' + data.name);
        console.log(data);
    } catch (error) {
        console.error(error);
        alert('Failed to fetch profile data');
    }
}

// const { signOut } = useSession();
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
        <Button onPress={() => fetchProfile()} title="Fetch profile" />

        <Text style={{ marginTop: 40 }}>Testing API</Text>
        <Button onPress={() => fetchTest()} title="Fetch test" />

        {/* <Pressable
            onPress={() => {
                // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
                signOut();
            }}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
            <Text>
                Sign Out
            </Text>
        </Pressable> */}
    </ScrollView >
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

    const { signOut } = useSession();

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
