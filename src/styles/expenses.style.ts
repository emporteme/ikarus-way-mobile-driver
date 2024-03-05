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
        // borderWidth: 1
        // paddingTop: 2
    },
    body: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    scroll: {
        padding: 20,
    },

    // Cost container
    costContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginVertical: 20,
        borderColor: COLORS.primary,
        borderWidth: 2,
        borderRadius: 12,
    },
    costText: {
        flex: 1,
        fontFamily: FONT.medium,
        fontSize: 16,
        color: COLORS.primary,
        lineHeight: 24,
        marginTop: '3.8%',
        paddingHorizontal: 20,
    },


    // Date and Time styles
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        borderColor: COLORS.primary,
        borderWidth: 2,
        borderRadius: 12,
    },
    dateText: {
        flex: 1,
        fontFamily: FONT.medium,
        fontSize: 16,
        color: COLORS.primary,
        lineHeight: 24,
        paddingHorizontal: 20,
        paddingVertical: 12
    },
    icon: {
        height: 20,
        width: 20,
        marginRight: 20,
        tintColor: COLORS.primary
    },


    // File input styles
    fileContainer: {},
    fileText: {},

    // Button
    button: {
        // marginHorizontal: 20,
        // marginBottom: 20,
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
        // padding: 16,
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