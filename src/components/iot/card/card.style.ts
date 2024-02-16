import { StyleSheet } from "react-native";

import { FONT, COLORS, SIZES } from "@/constants";

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: SIZES.xxSmall,
        paddingVertical: SIZES.large,
        paddingHorizontal: SIZES.large,
        gap: SIZES.xxSmall,
        shadowColor: COLORS.gray,
        shadowOpacity: 0.25,
        shadowOffset: { width: 2, height: 4 },
        shadowRadius: 0,
        elevation: SIZES.xSmall,
    },
    left: {},
    title: {
        fontFamily: FONT.semiBold,
        fontSize: SIZES.semiMedium,
        color: COLORS.dark
    },
    data: {},
    value: {
        fontFamily: FONT.medium,
        fontSize: SIZES.semiMedium,
        color: COLORS.dark
    },
    unit: {
        fontFamily: FONT.medium,
        fontSize: SIZES.small,
        color: COLORS.gray
    },
    icon: {
        width: 24,
        height: 24
    },
})

export default styles