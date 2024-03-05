import { StyleSheet } from "react-native";
import { FONT, COLORS, SIZES } from "@/constants";

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        paddingTop: '12%',
    },
    pageContent: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
        justifyContent: 'space-between',
        // backgroundColor: 'red',
    },
    logo: {
        width: 120,
        height: 50,
    },
    footer: {

    },
    title: {
        color: COLORS.white,
        fontSize: SIZES.xxLarge,
        fontFamily: FONT.semiBold,
        letterSpacing: 1,
        lineHeight: 30,
        marginBottom: 20,
    },
    description: {
        color: COLORS.white,
        fontSize: SIZES.medium,
        fontFamily: FONT.regular,
        marginBottom: 50
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    progress: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
    inActive: {
        width: 10,
        height: 10,
        borderRadius: 12,
        backgroundColor: COLORS.white,
    },
    active: {
        width: 30,
        height: 10,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 12,
        // width: 600,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: SIZES.medium,
        fontFamily: FONT.semiBold,
    },
    icon: {
        width: 18,
        height: 18,
        tintColor: COLORS.white,
    }
})

export default styles