import { Stack } from "expo-router";


export default () => {
    return (
        <Stack
            screenOptions={
                {
                    headerTintColor: "#138AEF",
                    title: 'Messages',
                    headerTitleAlign: 'center'
                }
            }
        />
    )
}