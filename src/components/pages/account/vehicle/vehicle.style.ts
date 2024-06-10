import { StyleSheet } from "react-native";

import { FONT, COLORS, SIZES } from "@/constants";

const styles = StyleSheet.create({

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
    vehicleImage: {
        flex: 1,
        height: 160,
        borderRadius: 8
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
        gap: 4
    },
    name: {
        fontFamily: FONT.semiBold,
        fontSize: SIZES.semiMedium,
        color: COLORS.dark,
    },
    role: {
        fontFamily: FONT.semiBold,
        fontSize: SIZES.small,
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
        color: COLORS.gray,
    },
    labelType: {
        fontFamily: FONT.medium,
        fontSize: SIZES.small,
        color: COLORS.gray,
    },
    value: {
        fontFamily: FONT.medium,
        fontSize: SIZES.semiMedium,
        color: COLORS.dark,
        width: '60%',
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
        bottom: 20,
        left: 20,
        right: 20,
    },
    buttonText: {
        color: COLORS.white,
        fontFamily: FONT.semiBold,
        fontSize: SIZES.medium
    },
    buttonIcon: {
        width: 18,
        height: 18,
        tintColor: COLORS.white
    },
})

export default styles