import { StyleSheet } from "react-native";

import { FONT } from "@/constants";

const styles = StyleSheet.create({
    skip: {
        fontFamily: FONT.medium,
        fontSize: 16,
        color: "#138AEF",
        marginLeft: 'auto',
        marginBottom: 20
    },
    title: {
        color: '#13161C',
        fontSize: 24,
        fontFamily: FONT.bold,
        marginTop: 0,
        textAlign: 'center',
    },
    subtitle: {
        color: '#13161C',
        fontSize: 16,
        fontFamily: FONT.medium,
        marginTop: 15,
        maxWidth: '70%',
        textAlign: 'center',
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
    indicator: {
        height: 10,
        width: 10,
        backgroundColor: 'transparent',
        borderColor: '#138AEF',
        borderWidth: 1,
        marginHorizontal: 3,
        borderRadius: 50,
    },
    btn: {
        flex: 1,
        height: 52,
        borderRadius: 15,
        backgroundColor: '#138AEF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn__text: {
        fontFamily: FONT.bold,
        fontSize: 17,
        color: '#F3F9FF'
    }
})

export default styles