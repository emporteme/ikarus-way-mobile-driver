import { Tabs } from "expo-router";
import { Image } from "react-native";
import { FONT, COLORS, icons } from "@/constants";

export default () => {

    // Set common tab bar styles 
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
                    tabBarItemStyle: {
                    }
                }}
            />

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
                    tabBarItemStyle: {}
                }}
            />

            {/* IoT tab */}
            <Tabs.Screen
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
                    },
                    tabBarItemStyle: {},
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
                    },
                    tabBarItemStyle: {}
                }}
            />
        </Tabs>
    )
}