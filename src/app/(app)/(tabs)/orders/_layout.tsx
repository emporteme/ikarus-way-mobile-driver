import { Stack } from 'expo-router';

export default () => {
    return (
        <Stack
            screenOptions={
                {
                    headerShown: true,
                    headerShadowVisible: true,
                    title: 'My orders',
                    headerTitleAlign: 'center'
                }
            }
        >
            <Stack.Screen name='[id]' options={{ headerShown: false }} />
        </Stack>
    )
}