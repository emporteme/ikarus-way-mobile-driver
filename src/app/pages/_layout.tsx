// Import necessary components from Expo router and vector icons
import { Tabs } from "expo-router";
// import { AntDesign, Entypo } from '@expo/vector-icons';
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
                    // paddingBottom: 10
                }
            }}
        >

            {/* Orders tab */}
            <Tabs.Screen
                name="orders"
                options={{
                    title: 'Orders',
                    headerShown: false,
                    // <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />
                    tabBarIcon: ({ color }) => (
                        // <AntDesign name="home" size={24} color={color} />
                        <Image source={icons.home} style={{ width: 24, height: 24, tintColor: color }} />
                    ),

                    // This one for all other tabs too
                    // tabBarInactiveBackgroundColor:           
                    tabBarLabelPosition: 'below-icon',
                    tabBarLabelStyle: {
                        fontFamily: FONT.medium,
                        fontSize: 10,
                    },
                    tabBarItemStyle: {
                    }
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

            {/* Services tab */}
            <Tabs.Screen
                name="services"
                options={{
                    title: 'Services',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Image source={icons.services} style={{ width: 24, height: 24, tintColor: color }} />
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