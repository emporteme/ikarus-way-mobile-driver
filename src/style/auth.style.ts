import { StyleSheet } from "react-native";

import { FONT, COLORS, SIZES } from "@/constants";

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    body: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        gap: 90,
        // backgroundColor: 'red',
    },
    top: {
        alignItems: 'center'
    },
    iconIkarus: {
        width: 20,
        height: 22,
        marginBottom: 12,
        tintColor: COLORS.primary,
    },
    regularText: {
        fontSize: SIZES.semiLarge,
        fontFamily: FONT.medium,
        color: COLORS.primary,
    },
    boldText: {
        fontSize: SIZES.semiLarge,
        fontFamily: FONT.bold,
        color: COLORS.primary,
    },
    middle: {},
    inputText: {
        color: COLORS.dark,
        width: '100%',
        fontSize: SIZES.medium,
        fontFamily: FONT.regular,
        borderBottomWidth: 1,
        borderColor: 'rgba(19, 22, 28, 0.20)',
        paddingVertical: 5,
        paddingHorizontal: 4,
        marginTop: 10
    },
    forgot: {
        marginTop: 10,
        alignSelf: 'center',
    },
    forgotText: {
        color: COLORS.dark,
        fontSize: SIZES.semiMedium,
        fontFamily: FONT.medium,
    },
    bottom: {
        gap: 20,
    },
    button: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: SIZES.medium,
        fontFamily: FONT.semiBold,
    },
    iconArrow: {
        width: 16,
        height: 16,
        tintColor: COLORS.white,
    },
    bottomText: {},
    privacyText: {},



    // auth: {
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     height: '100%',
    // },
    // loginText: {
    //     color: '#13161C',
    //     fontFamily: FONT.bold,
    //     fontSize: 32,
    //     letterSpacing: 1.28,
    //     marginTop: 120,
    //     marginBottom: 40
    // },
    // inputText: {
    //     color: '#13161C',
    //     width: '100%',
    //     fontSize: 16,
    //     fontFamily: FONT.regular,
    //     borderBottomWidth: 1,
    //     borderColor: 'rgba(19, 22, 28, 0.20)',
    //     paddingVertical: 5,
    //     marginTop: 10
    // },
    // rememberText: {
    //     color: '#13161C',
    //     fontSize: 14,
    //     fontFamily: FONT.medium,
    // },
    // loginButton: {
    //     flex: 1,
    //     height: 52,
    //     // width: '100%',
    //     borderRadius: 15,
    //     backgroundColor: '#138AEF',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // loginText: {
    //     fontFamily: FONT.medium,
    //     fontSize: 18,
    //     color: '#F3F9FF',
    // },
    // policyText: {
    //     color: 'rgba(19, 22, 28, 0.60)',
    //     fontFamily: FONT.medium,
    //     fontSize: 14,
    //     marginTop: 20,
    // },
    // policyBoldText: {
    //     color: '#13161C',
    //     fontFamily: FONT.semiBold
    // }
})

export default styles