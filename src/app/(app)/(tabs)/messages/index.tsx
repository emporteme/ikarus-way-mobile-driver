// Main imports
import React from 'react';
import { useWindowDimensions, Text, View, Button, ScrollView, Pressable, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { Link } from "expo-router";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
// Styles imports
import styles from '@/style/orders.style';
import { FONT } from '@/constants';
import { Empty, MessageList } from '@/components';

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

const Func = () => (
    // <KeyboardAvoidingView
    //     style={{ flex: 1 }}
    //     // behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
    //     behavior='padding'
    // // keyboardVerticalOffset={-500}
    // // keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500} // Adjust this value as needed
    // >
    <ScrollView style={{ padding: 20, flex: 1 }}>
        <View style={{ paddingBottom: 0 }}>
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

            <Text style={{ marginTop: 40 }}>Text input below</Text>
            <TextInput
                style={{
                    height: 40,
                    margin: 12,
                    borderWidth: 1,
                    padding: 10,
                }}
                placeholder="Type here"
                onChangeText={text => console.log(text)}
            />
            {/* {
                Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
            } */}
        </View>
        {
            Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
        }
    </ScrollView>
    // </KeyboardAvoidingView>
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
