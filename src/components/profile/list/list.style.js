import { StyleSheet } from "react-native";

import { COLORS, FONT } from "@/constants";

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'column',
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 15,
        boxShadow: '0px 4px 10px 0px rgba(0, 0, 0, 0.10)',
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginBottom: 20
    },
    flexH: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15
    },
    title: {
        fontFamily: FONT.medium,
        fontSize: 16,
        color: '#A3AAC4'
    },
    value: {
        fontFamily: FONT.medium,
        fontSize: 16,
        color: '#13161C'
    },
    lineH: {
        height: 1,
        width: '100%',
        backgroundColor: 'rgba(163, 170, 196, 0.20)'
    },
})

export default styles