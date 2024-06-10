// Base imports
import { Image, Pressable } from "react-native";

// Navigation imports
import { Stack, useRouter } from "expo-router";

// Icon imports 
import { icons } from "@/constants";

// Main component
export default () => {

    // Navigation variable
    const router = useRouter()

    return (
        <Stack
            screenOptions={{
                headerTintColor: "#138AEF",
                title: 'QR',
                headerTitleAlign: 'left',

                // This one just testing for possibility os border radius chnages
                headerStyle: {
                    // borderRadius: 15,
                },

                headerRight: () => (

                    // Maybe I need to use router.back(), but for now this logic fits well.
                    // router.push('/services')}
                    <Pressable onPress={() => router.back()}>
                        <Image source={icons.exit} resizeMode='contain' width={24} height={24} />
                    </Pressable>
                ),
            }}
        />
    )
}