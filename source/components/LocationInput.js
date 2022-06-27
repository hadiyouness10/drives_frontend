import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import dateTimeFormatter from '../assets/dateTimeFormatter';
import Icon from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LocationSuggestions from '../components/LocationSuggestions';
import * as Location from 'expo-location';
import { Picker } from '@react-native-picker/picker';

export default function LocationInput({ type, setStartLocationMarker, setDestinationMarker, isDroppingMarker, setIsDroppingMarker, isTyping, setIsTyping, mapRef }) {

    const [startLocationText, setStartLocationText] = useState('')
    const [destinationText, setDestinationText] = useState('')
    const [date, setDate] = useState(new Date())
    const [numberOfSeats, setNumberOfSeats] = useState(1)

    const startingInputRef = useRef(null)
    const destinationInputRef = useRef(null)
    const numberOfSeatsRef = useRef(null)

    const showDateTimePicker = (mode) => {
        DateTimePickerAndroid.open({
            value: date,
            mode: mode,
            onChange: (e, selectedDate) => setDate(selectedDate)
        })
    }

    return (
        <View style={[styles.mainDiv, { display: isDroppingMarker ? 'none' : 'flex', flexGrow: isTyping ? 1 : 0 }]}>
            {/*To have shadow only on the bottom, add overflow hidden and padding on parent div */}

            <View style={[styles.inputDiv, { flex: isTyping ? 1 : 0 }]}>

                <View style={[styles.input, { marginBottom: isTyping === 'startingLocation' ? 10 : 20 }]}>

                    <TextInput
                        style={{ flex: 1, fontSize: 18 }}
                        placeholder='Starting Location'
                        value={startLocationText}
                        ref={startingInputRef}
                        onChangeText={text => setStartLocationText(text)}
                        onFocus={() => setIsTyping('startingLocation')}
                        onBlur={() => setIsTyping(null)} />

                    <TouchableOpacity style={{ margin: 4 }} onPress={() => setStartLocationText("")}>
                        <MaterialIcons name='clear' size={20} color='#808080' />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={async () => {
                        startingInputRef.current.blur()
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

                <View style={{ flex: 1, display: isTyping === 'startingLocation' ? 'flex' : 'none', margin: 10 }}>
                    <LocationSuggestions
                        text={startLocationText}
                        setText={setStartLocationText}
                        inputRef={startingInputRef}
                        setLocationMarker={setStartLocationMarker}
                        mapRef={mapRef} />
                </View>

                <View style={styles.input}>

                    <TextInput
                        style={{ flex: 1, fontSize: 18 }}
                        placeholder='Destination'
                        value={destinationText}
                        ref={destinationInputRef}
                        onChangeText={text => setDestinationText(text)}
                        onFocus={() => setIsTyping('destination')}
                        onBlur={() => setIsTyping(null)} />

                    <TouchableOpacity style={{ margin: 4 }} onPress={() => setDestinationText("")}>
                        <MaterialIcons name='clear' size={20} color='#808080' />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setIsDroppingMarker('destination')} style={{ marginRight: 5 }}>
                        <Icon name='location-pin' size={30} color='#404040' />
                    </TouchableOpacity>

                </View>

                <View style={{ flex: 1, display: isTyping === 'destination' ? 'flex' : 'none', margin: 10, marginTop: 20 }}>
                    <LocationSuggestions
                        text={destinationText}
                        setText={setDestinationText}
                        inputRef={destinationInputRef}
                        setLocationMarker={setDestinationMarker}
                        mapRef={mapRef} />
                </View>

                <Text style={{ height: 50, textAlignVertical: 'center', fontSize: 16 }}>When are you leaving?</Text>

                <View style={{ height: 50, flexDirection: 'row', justifyContent: 'space-between' }}>

                    <TouchableOpacity style={[styles.buttonDiv, { marginRight: 10 }]} onPress={() => showDateTimePicker('date')} >
                        <Text style={styles.buttonText}>{dateTimeFormatter(date, 'date')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonDiv} onPress={() => showDateTimePicker('time')} >
                        <Text style={styles.buttonText}>{dateTimeFormatter(date, 'time')}</Text>
                    </TouchableOpacity>

                </View>

                {type === 'startRide' && <TouchableOpacity style={styles.numberOfSeats} onPress={() => numberOfSeatsRef.current.focus()}>
                    <Text style={{ height: 50, textAlignVertical: 'center', fontSize: 18 }}>Number of seats</Text>
                    <Picker
                        ref={numberOfSeatsRef}
                        style={{ width: 100 }}
                        selectedValue={numberOfSeats.toString()}
                        onValueChange={(itemValue, itemIndex) => { setNumberOfSeats(parseInt(itemValue)) }
                        }>
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                    </Picker>
                </TouchableOpacity>}

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    mainDiv: {
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
    numberOfSeats: {
        height: 50,
        marginTop: 10,
        paddingRight: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 4,
        backgroundColor: 'white'
    }
});
