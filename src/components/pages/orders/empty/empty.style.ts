import { StyleSheet } from "react-native";

import { FONT, COLORS, SIZES } from "@/constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBlock: {
        marginBottom: 20,
    },
    text: {
        textAlign: 'center',
        fontFamily: FONT.regular,
        color: COLORS.dark,
        fontSize: SIZES.semiMedium,
        lineHeight: 21,
    },
})

export default styles