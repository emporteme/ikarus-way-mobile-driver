import { StyleSheet } from "react-native";

import { FONT, COLORS, SIZES } from "@/constants";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 16,
    },
    circle: {
        padding: 10,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.gray
    },
    icon: {
        height: 22,
        width: 22
    },

})

export default styles