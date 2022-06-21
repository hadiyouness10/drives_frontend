import React from 'react';
import {  View, StyleSheet, TextInput } from 'react-native';
import MapComponent from './MapComponent';

export default function JoinRide() {
    return (
        <View style={styles.mainDiv}>
            <View style={{ overflow: 'hidden', height: '40%', paddingBottom: 10, zIndex: 1 }}>
                {/*To have shadow only on the bottom, add overflow hidden and padding on parent div */}
                <View style={styles.inputDiv}>
                    <TextInput style={styles.input} placeholder='Starting Location' />
                    <TextInput style={styles.input} placeholder='Destination' />
                    <TextInput style={styles.input} placeholder='Date and Time' />
                </View>
            </View>
            <View style={styles.mapDiv}>
                <MapComponent />
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
        zIndex: 1
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
