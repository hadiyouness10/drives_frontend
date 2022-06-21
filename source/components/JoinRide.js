import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import dateTimeFormatter from '../assets/dateTimeFormatter';
import MapComponent from './MapComponent';

export default function JoinRide() {

    const [date, setDate] = useState(new Date())

    const showDateTimePicker = (mode) => {
        DateTimePickerAndroid.open({
            value: date,
            mode: mode,
            display: mode === 'time' ? 'spinner' : 'default',
            onChange: (e, selectedDate) => setDate(selectedDate)
        })
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar />
            <View style={styles.mainDiv}>
                {/*To have shadow only on the bottom, add overflow hidden and padding on parent div */}
                <View style={styles.inputDiv}>
                    <TextInput style={[styles.input, { marginBottom: 20 }]} placeholder='Starting Location' />
                    <TextInput style={styles.input} placeholder='Destination' />
                    <Text style={{ height: 50, textAlignVertical: 'center', fontSize: 16 }}>When are you leaving?</Text>
                    <View style={{ height: 50, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={[styles.buttonDiv, { marginRight: 10 }]} onPress={() => showDateTimePicker('date')} >
                            <Text style={styles.buttonText}>{dateTimeFormatter(date, 'date')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonDiv} onPress={() => showDateTimePicker('time')} >
                            <Text style={styles.buttonText}>{dateTimeFormatter(date, 'time')}</Text>
                        </TouchableOpacity>
                    </View>
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
        overflow: 'hidden',
        paddingBottom: 10,
        zIndex: 1,
    },
    inputDiv: {
        padding: 10,
        paddingTop: 30,
        elevation: 5,
        backgroundColor: 'white',
        zIndex: 1
    },
    input: {
        height: 60,
        padding: 10,
        fontSize: 18,
        borderRadius: 10,
        backgroundColor: 'rgba(10, 10, 10, 0.07)',
    },
    buttonDiv: {
        flex: 1,
        backgroundColor: 'rgb(0, 125, 200)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        elevation: 5
    },
    buttonText: {
        color: 'white',
        fontSize: 20
    },
    mapDiv: {
        flexGrow: 1,
        marginTop: -10
    }
});
