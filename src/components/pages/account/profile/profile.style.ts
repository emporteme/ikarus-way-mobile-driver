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
        lineHeight: (SIZES.small) / 2 * 3,
        color: COLORS.dark,
        paddingHorizontal: 8,
        paddingVertical: 4,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    active: {
        fontFamily: FONT.semiBold,
        fontSize: SIZES.small,
        lineHeight: (SIZES.small) / 2 * 3,
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
    safe: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    scroll: {},
    page: {
        flex: 1,
        padding: 20,
        marginBottom: 70
    },
    body: {
        flex: 1,
        borderRadius: 12,
        backgroundColor: COLORS.white,
        shadowColor: COLORS.gray,
        shadowOpacity: 0.25,
        shadowOffset: { width: 2, height: 4 },
        shadowRadius: 0,
        elevation: SIZES.xSmall,
    },
    head: {
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#A0A3BD20',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#A0A3BD20',
    },
    column: {
        // gap: 4
    },
    name: {
        fontFamily: FONT.semiBold,
        fontSize: SIZES.semiMedium,
        lineHeight: (SIZES.semiMedium) / 2 * 3,
        color: COLORS.dark,
    },
    role: {
        fontFamily: FONT.semiBold,
        fontSize: SIZES.small,
        lineHeight: (SIZES.small) / 2 * 3,
        color: COLORS.gray,
    },
    iconOut: {
        width: 24,
        height: 24,
        tintColor: COLORS.primary
    },
    footer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    detail: {
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#A0A3BD20',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    label: {
        fontFamily: FONT.medium,
        fontSize: SIZES.semiMedium,
        lineHeight: (SIZES.semiMedium) / 2 * 3,
        color: COLORS.gray,
    },
    labelType: {
        fontFamily: FONT.medium,
        fontSize: SIZES.small,
        lineHeight: (SIZES.small) / 2 * 3,
        color: COLORS.gray,
    },
    value: {
        fontFamily: FONT.medium,
        fontSize: SIZES.semiMedium,
        lineHeight: (SIZES.semiMedium) / 2 * 3,
        color: COLORS.dark,
        width: '60%',
    },
    companyWrapper: {
        width: '60%',
    },
    valueCompany: {
        fontFamily: FONT.medium,
        fontSize: SIZES.semiMedium,
        lineHeight: (SIZES.semiMedium) / 2 * 3,
        color: COLORS.dark,
    },
    valueType: {
        fontFamily: FONT.medium,
        fontSize: SIZES.small,
        lineHeight: (SIZES.small) / 2 * 3,
        color: COLORS.dark,
    },
    // Button
    button: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 12,
        gap: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        position: 'absolute',
        bottom: 0,
        left: 20,
        right: 20,
    },
    buttonText: {
        color: COLORS.white,
        fontFamily: FONT.semiBold,
        fontSize: SIZES.medium,
        lineHeight: (SIZES.medium) / 2 * 3,
    },
    buttonIcon: {
        width: 18,
        height: 18,
        tintColor: COLORS.white
    },
})

export default styles