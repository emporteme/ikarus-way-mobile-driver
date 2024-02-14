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
    },
    iconFlag: {
        width: 21,
        height: 21,
    }
})

export default styles