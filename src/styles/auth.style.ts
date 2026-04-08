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
    top: {
        alignItems: 'center'
    },
    iconIkarus: {
        width: 21,
        height: 23,
        marginBottom: 8,
        tintColor: COLORS.primary,
    },
    regularText: {
        fontSize: SIZES.semiLarge,
        fontFamily: FONT.medium,
        color: COLORS.primary,
        textAlignVertical: 'auto',
        marginBottom: -6
    },
    boldText: {
        fontSize: SIZES.semiLarge,
        fontFamily: FONT.bold,
        color: COLORS.primary,
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
    passwordContainer: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: 'rgba(19, 22, 28, 0.20)',
        paddingVertical: 5,
        paddingHorizontal: 4,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    passwordText: {
        color: COLORS.dark,
        width: '90%',
        fontSize: SIZES.medium,
        fontFamily: FONT.regular,
    },
    iconEye: {
        width: 24,
        height: 24,
        tintColor: COLORS.dark,
    },
    forgot: {
        marginTop: 10,
        alignSelf: 'center',
    },
    forgotText: {
        color: COLORS.dark,
        fontSize: SIZES.semiMedium,
        fontFamily: FONT.medium,
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
    bottomTextWrapper: {
        textAlign: 'center'
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