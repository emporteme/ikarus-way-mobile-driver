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
        gap: 40,
    },
    middle: {},
    emailText: {
        color: COLORS.dark,
        width: '100%',
        fontSize: SIZES.medium,
        fontFamily: FONT.regular,
        borderBottomWidth: 1,
        borderColor: 'rgba(19, 22, 28, 0.20)',
        paddingVertical: 5,
        paddingHorizontal: 4,
        marginTop: 10
    },
    bottom: {
        gap: 20,
    },
    button: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: SIZES.medium,
        fontFamily: FONT.semiBold,
    },
    iconArrow: {
        width: 16,
        height: 16,
        tintColor: COLORS.white,
    },
    bottomText: {
        color: COLORS.grey,
        fontSize: SIZES.semiMedium,
        fontFamily: FONT.medium,
        textAlign: 'center'
    },
    privacyText: {
        fontFamily: FONT.semiBold,
    },
})

export default styles