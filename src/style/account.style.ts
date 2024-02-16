import { StyleSheet } from "react-native";

import { FONT, COLORS, SIZES } from "@/constants";

const styles = StyleSheet.create({
    // Stack styles
    languages: {
        flexDirection: 'row',
        alignItems: 'center',
        // gap: SIZES.xSmall,
    },
    inActive: {
        fontFamily: FONT.medium,
        fontSize: SIZES.small,
        color: COLORS.dark,
        paddingHorizontal: 8,
        paddingVertical: 4,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    active: {
        fontFamily: FONT.semiBold,
        fontSize: SIZES.small,
        color: COLORS.primary,
        borderWidth: 2,
        borderColor: COLORS.primary,
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    // Page styles
    page: {
        flex: 1,
    },
})

export default styles