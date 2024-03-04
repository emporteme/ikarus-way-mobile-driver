import { StyleSheet } from "react-native";
import { FONT, COLORS, SIZES } from "@/constants";

const styles = StyleSheet.create({
    status: {
        backgroundColor: COLORS.primary,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 8
    },
    statusText: {
        color: COLORS.white,
        fontSize: SIZES.semiMedium,
        fontFamily: FONT.medium,
        // paddingTop: 2
    },
    body: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    scroll: {
        padding: 20,
        paddingBottom: 90
    },
    section: {
        gap: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: SIZES.semiMedium,
        fontFamily: FONT.semiBold,
        color: COLORS.dark,
        paddingBottom: 6
    },
    title2: {
        fontSize: SIZES.semiMedium,
        fontFamily: FONT.semiBold,
        color: COLORS.dark,
        marginBottom: -10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        flex: 1,
    },
    row2: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        // flex: 1,
    },
    column: {
        gap: 0,
        flex: 1
    },
    column2: {
        gap: 4
    },
    medSemiMedium: {
        fontSize: SIZES.semiMedium,  // 14
        fontFamily: FONT.medium,
        color: COLORS.dark,
        // borderWidth: 1,
        // includeFontPadding: true,
        textAlignVertical: 'center',
        padding: 0
        // lineHeight: 20,
    },
    regSemiMedium: {
        fontSize: SIZES.semiMedium,
        fontFamily: FONT.regular,
        color: COLORS.dark,
    },
    medSmall: {
        fontSize: SIZES.small,
        fontFamily: FONT.medium,
        color: COLORS.dark,
    },
    regSmall: {
        fontSize: SIZES.small,
        fontFamily: FONT.regular,
        color: COLORS.dark,
    },
    medSemiMedium2: {
        fontSize: SIZES.semiMedium,
        fontFamily: FONT.medium,
        color: COLORS.gray,
    },
    regSemiMedium2: {
        fontSize: SIZES.semiMedium,
        fontFamily: FONT.regular,
        color: COLORS.gray,
    },
    medSmall2: {
        fontSize: SIZES.small,
        fontFamily: FONT.medium,
        color: COLORS.gray,
    },
    regSmall2: {
        fontSize: SIZES.small,
        fontFamily: FONT.regular,
        color: COLORS.gray,
    },
    rowFull: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 10,
        // width: '100%'
    },
    iconFlag: {
        width: 22,
        height: 22,
    },
    lineH: {
        height: 1,
        backgroundColor: COLORS.gray,
        opacity: 0.2,
        marginBottom: 20
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
        bottom: 40,
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