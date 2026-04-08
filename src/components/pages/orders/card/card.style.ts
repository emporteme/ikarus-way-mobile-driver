import { StyleSheet } from "react-native";

import { FONT, COLORS, SIZES } from "@/constants";

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.xxSmall,
        paddingVertical: SIZES.xSmall,
        paddingHorizontal: SIZES.medium,
        gap: SIZES.small,
        shadowColor: COLORS.gray,
        shadowOpacity: 0.25,
        shadowOffset: { width: 2, height: 4 },
        shadowRadius: 0,
        elevation: SIZES.xSmall,
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: SIZES.small,
    },
    location: {
        gap: 4,
    },
    pickup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SIZES.medium
    },
    addressText: {
        color: COLORS.dark,
        fontSize: SIZES.semiMedium,
        fontFamily: FONT.medium,
        // paddingTop: 3
    },
    detailsText: {
        color: COLORS.gray2,
        fontSize: SIZES.small,
        fontFamily: FONT.medium,
    },
    flag: {
        width: 20,
        height: 20,
        marginRight: -6,
    },
    iconArrow: {
        width: 14,
        height: 12
    },
    distanceText: {
        color: COLORS.gray2,
        fontSize: SIZES.small,
        fontFamily: FONT.medium,
        // paddingTop: 4
    },
    status: {
        backgroundColor: COLORS.primary,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 8
    },
    statusText: {
        color: COLORS.white,
        fontSize: SIZES.small,
        fontFamily: FONT.medium,
        // paddingTop: 2
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: SIZES.small
    },
    weightText: {
        color: COLORS.gray2,
        fontSize: SIZES.small,
        fontFamily: FONT.medium,
    },
    packageText: {
        color: COLORS.gray2,
        fontSize: SIZES.small,
        fontFamily: FONT.regular,
    },
    dateText: {
        color: COLORS.gray2,
        fontSize: SIZES.small,
        fontFamily: FONT.medium,
    },
    volumeText: {
        color: COLORS.gray2,
        fontSize: SIZES.small,
        fontFamily: FONT.regular,
    },
    priceText: {
        color: COLORS.gray2,
        fontSize: SIZES.small,
        fontFamily: FONT.regular,
    },
    last: {
        alignItems: 'flex-end',
    }
})

export default styles