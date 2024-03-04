import { Stack } from 'expo-router';

export default () => {
    return (
        <Stack>
            <Stack.Screen name='modal' options={{ presentation: 'modal' }} />
        </Stack>
    )
}