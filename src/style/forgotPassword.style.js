import { FONT } from "@/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingHorizontal: 20,
        width: '100%',
        height: '100%',
        // marginTop: 50,
    },
    forgot: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    title: {
        fontFamily: FONT.bold,
        fontSize: 32,
        color: '#13161C',
        letterSpacing: 1.28,
        marginBottom: 20,
    },
    description: {
        fontFamily: FONT.regular,
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.80)',
        marginBottom: 40,
        paddingHorizontal: 20,
        textAlign: 'center',
    },
    inputText: {
        color: '#13161C',
        width: '100%',
        fontSize: 16,
        fontFamily: FONT.regular,
        borderBottomWidth: 1,
        borderColor: 'rgba(19, 22, 28, 0.20)',
        paddingVertical: 5,
        marginTop: 10
    },
    submitButton: {
        flex: 1,
        height: 52,
        // width: '100%',
        borderRadius: 15,
        backgroundColor: '#138AEF',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
    },
    submitText: {
        fontFamily: FONT.medium,
        fontSize: 18,
        color: '#F3F9FF',
    },
})

export default styles