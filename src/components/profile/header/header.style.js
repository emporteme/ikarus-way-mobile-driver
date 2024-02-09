// Stylesheet imports
import { StyleSheet } from "react-native";

// Constants
import { COLORS, FONT } from "@/constants";

const styles = StyleSheet.create({
    header: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFF',
        borderRadius: 15,
        height: "auto",
        marginBottom: 20,
    },
    flexH: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 15,
    },
    profileImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        tintColor: 'black'
    },
    flexV: {
        flexDirection: 'column',
        gap: 2,
    },
    name: {
        fontFamily: FONT.semiBold,
        fontSize: 16,
        color: '#13161C'
    },
    role: {
        fontFamily: FONT.semiBold,
        fontSize: 14,
        color: '#A3AAC4'
    },
    settings: {
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 1,
        // width: 25,
        // height: 25
    },
    settingsImage: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    }
})

export default styles