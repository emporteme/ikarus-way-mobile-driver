import { StyleSheet } from "react-native";

import { FONT, COLORS, SIZES } from "@/constants";

const styles = StyleSheet.create({
    card: {
        padding: 20,
        gap: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#A0A3BD20',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    photo: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.gray,
    },
    content: {
        flex: 1,
    },
    top: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    name: {
        fontFamily: FONT.medium,
        fontSize: SIZES.semiMedium,
        color: COLORS.dark,
        lineHeight: 21,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statusIcon: {
        width: 18,
        height: 18,
        tintColor: COLORS.primary,
    },
    statusTime: {
        fontFamily: FONT.regular,
        fontSize: SIZES.small,
        color: COLORS.dark,
        lineHeight: 18,
    },
    contentText: {
        fontFamily: FONT.regular,
        fontSize: SIZES.small,
        color: COLORS.dark,
        lineHeight: 18,
        opacity: 0.8,
    },
})

export default styles