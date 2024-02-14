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
        paddingTop: 2
    },
    body: {
        marginBottom: 20
    },
    scroll: {
        padding: 20
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
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
    },
    column: {},
    medSemiMedium: {
        fontSize: SIZES.semiMedium,
        fontFamily: FONT.medium,
        color: COLORS.dark,
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
    }
})

export default styles