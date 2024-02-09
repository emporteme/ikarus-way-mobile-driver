// Import necessary components from Expo router and vector icons
import { Tabs } from "expo-router";
// import { AntDesign, Entypo } from '@expo/vector-icons';
import { Image } from "react-native";
import { FONT, icons } from "@/constants";

export default () => {

    // Set common tab bar styles 
    return (
        <Tabs
            screenOptions={{
                tabBarInactiveBackgroundColor: '#FFFFFF',
                tabBarInactiveTintColor: '#13161C40',
                tabBarActiveTintColor: '#138AEF',
                tabBarStyle: {
                    borderRadius: 25,
                    paddingTop: 5,
                    // paddingBottom: 10
                }
            }}
        >

            {/* Home tab */}
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
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
                        fontFamily: FONT.regular,
                        fontSize: 10,
                        // marginTop: 10
                        // marginVertical: 5,
                        // borderWidth: 1
                    },
                    tabBarItemStyle: {
                        // borderWidth: 1,
                        // paddingTop: 10,
                    }
                }}
            />

            {/* QR Scanner tab */}
            <Tabs.Screen
                name="qr"
                options={{
                    title: 'Ikarus QR',
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Image source={icons.qr} style={{ width: 24, height: 24, tintColor: color }} />
                    ),
                    tabBarLabelPosition: 'below-icon',
                    tabBarLabelStyle: {
                        fontFamily: FONT.regular,
                        fontSize: 10,
                    },
                    tabBarItemStyle: {},
                    tabBarStyle: {
                        display: 'none'
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
                        <Image source={icons.messages} style={{ width: 24, height: 24, tintColor: color }} />
                    ),
                    tabBarLabelPosition: 'below-icon',
                    tabBarLabelStyle: {
                        fontFamily: FONT.regular,
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
                        fontFamily: FONT.regular,
                        fontSize: 10,
                    },
                    tabBarItemStyle: {}
                }}
            />
        </Tabs>
    )
}