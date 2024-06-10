import { StyleSheet } from "react-native";

import { FONT, COLORS, SIZES } from "@/constants";

const styles = StyleSheet.create({
    container: {
        borderColor: COLORS.primary,
        borderWidth: 2,
        borderRadius: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 20,
    },
    text: {
        fontFamily: FONT.medium,
        fontSize: 16,
        color: COLORS.primary,
        lineHeight: 24,
    },
    option: {
        paddingBottom: 12,
        paddingHorizontal: 20,
        // paddingHorizontal: 10,
    },
    optionText: {
        fontFamily: FONT.medium,
        fontSize: 14,
        color: COLORS.dark,
        lineHeight: 21,
    }
});

export default styles