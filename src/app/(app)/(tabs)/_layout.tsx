import { Tabs, Redirect, useSegments } from "expo-router";
import { Image, Text } from "react-native";
import { FONT, COLORS, icons } from "@/constants";
import { useSession } from "@/components/core/AuthContext";

export default function TabsLayout() {
    const { session, isLoading } = useSession();
    // You can keep the splash screen open, or render a loading screen like we do here.
    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    // Only require authentication within the (app) group's layout as users need to be able to access the (auth) group and sign in again.
    if (!session) {
        // On web, static rendering will stop here as the user is not authenticated in the headless Node process that the pages are rendered in.
        return <Redirect href="/auth" />;
    }

    // Segments for message details page, to hide tabbar
    const segments = useSegments()

    // This layout can be deferred because it's not the root layout.
    return (
        <Tabs
            screenOptions={{
                tabBarInactiveBackgroundColor: '#FFFFFF',
                tabBarInactiveTintColor: '#13161C40',
                tabBarActiveTintColor: COLORS.primary,
                tabBarStyle: {
                    height: 70, // Increase the height as per your requirement
                    paddingTop: 6,
                },
            }}
        >
            {/* Orders tab */}
            <Tabs.Screen
                name="orders"
                options={{
                    title: 'Orders',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Image source={icons.order} style={{ width: 24, height: 24, tintColor: color }} />
                    ),
                    tabBarLabelPosition: 'below-icon',
                    tabBarLabelStyle: {
                        fontFamily: FONT.medium,
                        fontSize: 10,
                    },
                    tabBarStyle: {
                        // backgroundColor: COLORS.white,
                        height: 70,
                        paddingTop: 6,
                        display: segments[3] === '[id]' ? 'none' : 'flex'
                    }
                }}
            />

            {/* IoT tab */}
            {/* <Tabs.Screen
                name="iot"
                options={{
                    title: 'IoT',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Image source={icons.iot} style={{ width: 26, height: 26, tintColor: color }} />
                    ),
                    tabBarLabelPosition: 'below-icon',
                    tabBarLabelStyle: {
                        fontFamily: FONT.medium,
                        fontSize: 10,
                    }
                }}
            /> */}

            {/* Messages tab */}
            <Tabs.Screen
                name="messages"
                options={{
                    title: 'Messages',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Image source={icons.message} style={{ width: 24, height: 24, tintColor: color }} />
                    ),
                    tabBarLabelPosition: 'below-icon',
                    tabBarLabelStyle: {
                        fontFamily: FONT.medium,
                        fontSize: 10,
                    },
                    tabBarStyle: {
                        // backgroundColor: COLORS.white,
                        height: 70,
                        paddingTop: 6,
                        display: segments[3] === '[id]' ? 'none' : 'flex'
                    }
                }}
            />

            {/* Account tab */}
            <Tabs.Screen
                name="account"
                options={{
                    title: 'Account',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Image source={icons.profile} style={{ width: 24, height: 24, tintColor: color }} />
                    ),
                    tabBarLabelPosition: 'below-icon',
                    tabBarLabelStyle: {
                        fontFamily: FONT.medium,
                        fontSize: 10,
                    }
                }}
            />
        </Tabs>
    )
}