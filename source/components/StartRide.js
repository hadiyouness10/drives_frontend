import React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';


export default function StartRide() {
    return (
        <View style={styles.mainDiv}>
            <View style={{ overflow: 'hidden', height: '40%', paddingBottom: 10, zIndex: 2 }}>
                {/*To have shadow only on the bottom */}
                <View style={styles.inputDiv}>
                    <TextInput style={styles.input} placeholder='Starting Location' />
                    <TextInput style={styles.input} placeholder='Destination' />
                    <TextInput style={styles.input} placeholder='Date and Time' />
                </View>
            </View>
            <View style={styles.mapDiv}>
                <Text>
                    Map
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainDiv: {
        flex: 1
    },
    inputDiv: {
        height: '100%',
        padding: 10,
        elevation: 10,
        backgroundColor: 'white',
        zIndex: 2
    },
    input: {
        flex: 1,
        padding: 10,
        fontSize: 18,
        borderRadius: 10,
        backgroundColor: 'rgba(10, 10, 10, 0.07)',
        marginTop: 10,
        marginBottom: 10,
    },
    mapDiv: {
        flexGrow: 1,
        marginTop: -10
    }
});
