import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import dateTimeFormatter from '../assets/dateTimeFormatter';
import MapComponent from '../components/MapComponent';
import Icon from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LocationSuggestions from '../components/LocationSuggestions';
import * as Location from 'expo-location';

export default function JoinRide() {

    const [startLocationText, setStartLocationText] = useState('')
    const [startLocationMarker, setStartLocationMarker] = useState()
    const [destinationText, setDestinationText] = useState('')
    const [destinationMarker, setDestinationMarker] = useState()
    const [date, setDate] = useState(new Date())

    const [isDroppingMarker, setIsDroppingMarker] = useState(null)
    const [isTyping, setIsTyping] = useState(false)

    const textInputRef = useRef(null)
    const mapRef = useRef(null)

    const showDateTimePicker = (mode) => {
        DateTimePickerAndroid.open({
            value: date,
            mode: mode,
            onChange: (e, selectedDate) => setDate(selectedDate)
        })
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={[styles.mainDiv, { display: isDroppingMarker ? 'none' : 'flex', flexGrow: isTyping ? 1 : 0 }]}>
                {/*To have shadow only on the bottom, add overflow hidden and padding on parent div */}
                <View style={[styles.inputDiv, { flex: isTyping ? 1 : 0 }]}>
                    <View style={[styles.input, { marginBottom: 20 }]}>
                        <TextInput style={{ flex: 1, fontSize: 18 }} placeholderTextColor= 'grey' placeholder='Starting Location' value={startLocationText}
                            ref={textInputRef} onChangeText={text => setStartLocationText(text)}
                            onFocus={() => setIsTyping('startingLocation')} onBlur={() => setIsTyping(null)} />
                        <TouchableOpacity onPress={async () => {
                            textInputRef.current.blur()
                            let location = await Location.getCurrentPositionAsync({})
                            setStartLocationMarker({ latitude: location.coords.latitude, longitude: location.coords.longitude })
                            mapRef.current.animateToRegion({
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01
                            })
                        }}>
                            <MaterialIcons name='my-location' size={30} color='#404040' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsDroppingMarker('startingLocation')} style={{ marginLeft: 10, marginRight: 5 }}>
                            <Icon name='location-pin' size={30} color='#404040' />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, display: isTyping === 'startingLocation' ? 'flex' : 'none' }}>
                        <LocationSuggestions type='startingLocation' />
                    </View>
                    <View style={styles.input}>
                        <TextInput style={{ flex: 1, fontSize: 18 }} placeholderTextColor= 'grey' placeholder='Destination' value={destinationText}
                            onChangeText={text => setDestinationText(text)}
                            onFocus={() => setIsTyping('destination')} onBlur={() => setIsTyping(null)} />
                        <TouchableOpacity onPress={() => setIsDroppingMarker('destination')} style={{ marginRight: 5 }}>
                            <Icon name='location-pin' size={30} color='#404040' />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, display: isTyping === 'destination' ? 'flex' : 'none' }}>
                        <LocationSuggestions type='destination' />
                    </View>
                    <Text style={{ padding: 10, height: 50, textAlignVertical: 'center', fontSize: 16 }}>When are you leaving?</Text>
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
            <View style={[styles.mapDiv, { flexGrow: isTyping ? 0 : 1 }]}>
                <View style={{ display: isDroppingMarker ? 'flex' : 'none', position: 'absolute', zIndex: 1, top: 50, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 22, color: 'darkred' }}>Tap on the map to drop pin.</Text>
                </View>
                <MapComponent
                    mapRef={mapRef}
                    startLocationMarker={startLocationMarker}
                    setStartLocationMarker={setStartLocationMarker}
                    destinationMarker={destinationMarker}
                    setDestinationMarker={setDestinationMarker}
                    isDroppingMarker={isDroppingMarker} />
                <View style={{ display: isDroppingMarker ? 'flex' : 'none', position: 'absolute', zIndex: 1, left: 0, right: 0, bottom: 15, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{ width: '90%', height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(0, 150, 255)', elevation: 2 }}
                        onPress={() => setIsDroppingMarker(null)}>
                        <Text style={{ color: 'white', fontSize: 18 }}>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainDiv: {
        marginTop: 10,
        paddingBottom: 10,
        zIndex: 1
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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'rgba(10, 10, 10, 0.07)',
    },
    buttonDiv: {
        flex: 1,
        backgroundColor: 'rgb(0, 300, 200)',
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
