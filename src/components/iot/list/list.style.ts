import { StyleSheet } from "react-native";
import { FONT, COLORS, SIZES } from "@/constants";

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    content: {
        // borderWidth: 1, // Later delete this Line!
        paddingVertical: 20,
        paddingHorizontal: 20,
        gap: SIZES.medium,
    },
    column: {
        gap: 10
    }
})

export default styles