import { Stack } from 'expo-router';

export default () => {
    return (
        <Stack
            screenOptions={
                {
                    headerShown: true,
                    headerShadowVisible: true,
                    title: 'Orders',
                    headerTitleAlign: 'center'
                }
            }
        >
            <Stack.Screen
                name='expenses'
                options={{
                    headerShown: true,
                }} />
        </Stack>
    )
}