import { icons } from "@/constants";
import { Stack, useRouter } from "expo-router";
import { Image, Pressable } from "react-native";

export default () => {
    const router = useRouter();
    return (
        <Stack
            screenOptions={{
                headerTintColor: "#138AEF",
                title: 'Services',                  // Then find the way to put the title on center
                headerTitleAlign: 'center',
                // headerShadowVisible: false,
                headerLeft: () => (

                    // Maybe I need to use router.back(), but for now this logic fits well.
                    // router.push('/pages/services')}
                    <Pressable onPress={() => router.back()}>
                        <Image source={icons.back} resizeMode='contain' width={24} height={24} />
                    </Pressable>
                ),
            }}
            initialRouteName="index"
        >
            <Stack.Screen
                name="index"

                // As I dont use Stack in this page these informations are useless :/
                options={{
                    title: 'Services Page',
                    headerTitleAlign: 'center'
                }}
            />
            <Stack.Screen
                name="orders"
                options={{
                    title: 'Orders',
                    headerTitleAlign: 'center'
                }}
            />
            <Stack.Screen
                name="products"
                options={{
                    title: 'Products',
                    headerTitleAlign: 'center'
                }}
            />
            <Stack.Screen
                name="calendar"
                options={{
                    title: 'Calendar',
                    headerTitleAlign: 'center'
                }}
            />
            <Stack.Screen
                name="stock"
                options={{
                    title: 'Stock',
                    headerTitleAlign: 'center'
                }}
            />
            <Stack.Screen
                name="history"
                options={{
                    title: 'History',
                    headerTitleAlign: 'center'
                }}
            />
            <Stack.Screen
                name="map"
                options={{
                    title: 'Map',
                    headerTitleAlign: 'center'
                }}
            />
            <Stack.Screen
                name="team"
                options={{
                    title: 'Team',
                    headerTitleAlign: 'center'
                }}
            />
            <Stack.Screen
                name="reports"
                options={{
                    title: 'Reports',
                    headerTitleAlign: 'center'
                }}
            />
            <Stack.Screen
                name="guides"
                options={{
                    title: 'Guides',
                    headerTitleAlign: 'center'
                }}
            />
            <Stack.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerTitleAlign: 'center'
                }}
            />
        </Stack>
    )
}