import { StyleSheet } from "react-native";
import { FONT, COLORS, SIZES } from "@/constants";

const styles = StyleSheet.create({
    body: {
        flex: 1,
        padding: 20,
        gap: 30,
    },
    inputContainer: {},
    input: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 2,
        borderColor: COLORS.primary,
        borderRadius: 8,
        fontSize: 16,
        fontFamily: FONT.medium,
    },
    submitButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    submitButtonText: {
        color: COLORS.white,
        fontFamily: FONT.semiBold,
        fontSize: 16,
        lineHeight: 24,
        textAlign: "center",
    },
    container: {
        // flex: 1,

    },
})

export default styles