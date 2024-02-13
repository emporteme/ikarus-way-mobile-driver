import { StyleSheet } from "react-native";

import { FONT, COLORS, SIZES } from "@/constants";

const styles = StyleSheet.create({
    body: {
        flex: 1
    },
    content: {
        backgroundColor: 'red',
        paddingVertical: 20,
        paddingHorizontal: 20,
        gap: 200,
    },
    bottomText: {
        color: COLORS.grey,
        fontSize: SIZES.semiMedium,
        fontFamily: FONT.medium,
        textAlign: 'center'
    },
})

export default styles