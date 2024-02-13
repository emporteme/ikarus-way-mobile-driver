import { StyleSheet } from "react-native";

import { FONT, COLORS, SIZES } from "@/constants";

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    body: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        gap: 90,
        // backgroundColor: 'red',
    },
    content: {},
    bottomText: {
        color: COLORS.grey,
        fontSize: SIZES.semiMedium,
        fontFamily: FONT.medium,
        textAlign: 'center'
    },
})

export default styles