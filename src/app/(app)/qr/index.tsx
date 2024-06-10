// // Base imports
// import React, { useState, useEffect } from 'react';
// import { Text, View, StyleSheet, Button } from 'react-native';

// // Qr scan library
// import { BarCodeScanner } from 'expo-barcode-scanner';

// // Main component
// const QrPage = () => {
//     const [hasPermission, setHasPermission] = useState(null);
//     const [scanned, setScanned] = useState(false);

//     useEffect(() => {
//         (async () => {
//             const { status } = await BarCodeScanner.requestPermissionsAsync();
//             setHasPermission(status === 'granted');
//         })();
//     }, []);

//     const handleBarCodeScanned = ({ type, data }) => {
//         setScanned(true);
//         alert(`Bar code with type ${type} and data ${data} has been scanned!`);
//     };

//     if (hasPermission === null) {
//         return <Text>Requesting for camera permission</Text>;
//     }
//     if (hasPermission === false) {
//         return <Text>No access to camera</Text>;
//     }

//     return (
//         <View style={styles.container}>
//             <BarCodeScanner
//                 onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//                 style={StyleSheet.absoluteFillObject}
//             />

//             {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'column',
//         justifyContent: 'center',
//         height: '100%'
//     },
// });

// export default QrPage;



// Base imports
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

// Qr scan library
import { BarCodeScanner } from 'expo-barcode-scanner';

// Main component
const QrPage: React.FC = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={styles.absoluteFillObject}
            />

            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        // height: '200%'
    },
    absoluteFillObject: {
        // ...StyleSheet.absoluteFillObject,
        flex: 1,
        width: '100%'
    }
});

export default QrPage;
