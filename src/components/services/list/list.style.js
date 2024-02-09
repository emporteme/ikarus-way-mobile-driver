import { StyleSheet } from "react-native";

import { COLORS, FONT } from "@/constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        gap: 30,
        marginTop: 20,
    },
    title: {
        fontFamily: FONT.semiBold,
        fontSize: 16
    },
    quick: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        // justifyContent: 'space-between',
        // gap: ,
        width: '100%',
    },
    action: {
        width: '25%',
        flexDirection: 'column',
        gap: 5,
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 1,
    },
    icon: {
        // height: 24,
        // width: 24,
        width: '60%',
        height: '60%',
        // tintColor: COLORS.white
    },
    action_name: {
        fontFamily: FONT.regular,
        fontSize: 14,
        color: '#13161C'
    },
    iconImage: {
        width: 26,
        height: 26,
        tintColor: COLORS.primary,
    },
})

export default styles