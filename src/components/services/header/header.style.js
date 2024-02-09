// Stylesheet imports
import { StyleSheet } from "react-native";

// Constants
import { COLORS, FONT } from "@/constants";

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
        // backgroundColor: COLORS.lightWhite,
        // padding: 20,
    },
    title: {
        fontFamily: FONT.semiBold,
        fontSize: 18,
        color: COLORS.black,
    },
    languages: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
    active: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.primary
    },
    inActive: {},
    text: {
        color: COLORS.black,
        fontFamily: FONT.semiBold,
        fontSize: 14
    },
    textActive: {
        color: COLORS.primary,
        fontFamily: FONT.semiBold,
        fontSize: 14
    },
})

export default styles