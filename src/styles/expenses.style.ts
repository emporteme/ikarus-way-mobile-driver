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
        paddingLeft: 20,
        paddingVertical: 12
    },
    icon: {
        height: 20,
        width: 20,
        marginRight: 20,
        tintColor: COLORS.primary
    },

    autoText: {
        flex: 1,
        fontFamily: FONT.medium,
        fontSize: 14,
        color: COLORS.primary,
        lineHeight: 21,
        paddingTop: 8,
        marginBottom: 20
    },

    // File input styles
    fileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLORS.primary,
        borderWidth: 2,
        borderRadius: 12,
        marginBottom: 20
    },
    fileItem: {
        backgroundColor: '#A0A3BD80',
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        flex: 1
    },
    fileIcon: {
        tintColor: COLORS.white,
        height: 14,
        width: 14
    },
    fileText: {
        color: COLORS.white,
        fontFamily: FONT.medium,
        fontSize: SIZES.medium,
        marginLeft: 10
    },

    // Button
    button: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginTop: 20
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

})

export default styles