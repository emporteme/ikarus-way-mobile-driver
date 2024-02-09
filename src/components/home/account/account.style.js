import { StyleSheet } from "react-native";

import { COLORS, FONT } from "@/constants";

const styles = StyleSheet.create({
    account: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    left: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 15,
    },
    profile: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F8FF',
        borderRadius: 15,
        width: 50,
        height: 50,
    },
    info: {
        flexDirection: 'column',
        gap: 2
    },
    name: {
        fontSize: 17,
        fontFamily: FONT.semiBold,
        color: '#13161C'
    },
    role: {
        fontSize: 14,
        fontFamily: FONT.semiBold,
        color: '#A3AAC4'
    },
    notification: {
        backgroundColor: '#F5F8FF',
        // padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        height: 40,
        width: 40,
    }
})

export default styles