// Import React hooks and navigation components
import { useEffect } from 'react';
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';


export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: 'pages',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Main App component
export default function RootLayout() {

    // Load custom fonts
    const [loaded, error] = useFonts({
        mBlack: require("../../assets/fonts/Montserrat-Black.ttf"),
        mXBold: require("../../assets/fonts/Montserrat-ExtraBold.ttf"),
        mBold: require("../../assets/fonts/Montserrat-Bold.ttf"),
        mSBold: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
        mMedium: require("../../assets/fonts/Montserrat-Medium.ttf"),
        mRegular: require("../../assets/fonts/Montserrat-Regular.ttf"),
        mLight: require("../../assets/fonts/Montserrat-Light.ttf"),
        mELight: require("../../assets/fonts/Montserrat-ExtraLight.ttf"),
        mThin: require("../../assets/fonts/Montserrat-Thin.ttf"),
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }


    return <RootLayoutNav />;
    // Root navigation stack

}

function RootLayoutNav() {

    return (
        <Stack

            // Global screen options
            screenOptions={{
                headerTintColor: "#13161C",
                statusBarColor: '#F2F2F2',
                navigationBarColor: '#FFF'
            }}

        // Hide splash screen after initial render
        // onLayout={onLayoutRootView}                             // Hope this one will not crush my code
        >
            {/* Auth screen */}
            <Stack.Screen
                name="auth"
                options={{ headerShown: false }}
            />

            {/* Onboarding screen */}
            <Stack.Screen
                name="onboarding"
                options={{ headerShown: false }}
            />

            {/* Main pages screen  */}
            <Stack.Screen
                name="pages"
                options={{ headerShown: false }}
            />
        </Stack>
    )
}