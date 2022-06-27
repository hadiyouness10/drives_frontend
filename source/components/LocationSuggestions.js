import { useEffect, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'

export default function LocationSuggestions({ text, setText, inputRef, setLocationMarker, mapRef }) {

    const [locations, setLocations] = useState([])
    const API_URL = "http://192.168.1.12:3737"
    const getLocationSuggestions = (text) => {
        if (text) {
            fetch(API_URL + '/locationSuggestions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ location: text })
            })
                .then(res => res.json())
                .then(res => setLocations(res.result.map(location =>
                    <TouchableOpacity key={location.place_id} onPress={() => getLocationDetails(location.description, location.place_id)}>
                        <Text style={styles.location}>{location.description}</Text>
                    </TouchableOpacity>
                )))
        }
        else setLocations([])
    }

    const getLocationDetails = (location, place_id) => {
        inputRef.current.blur()
        setText(location)
        fetch(API_URL + '/locationDetails', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ place_id: place_id })
        })
            .then(res => res.json())
            .then(res => {
                setLocationMarker({ latitude: res.result.lat, longitude: res.result.lng })
                mapRef.current.animateToRegion({
                    latitude: res.result.lat,
                    longitude: res.result.lng,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                })
            })
    }

    useEffect(() => {
        getLocationSuggestions(text)
    }, [text])

    return (
        <ScrollView keyboardShouldPersistTaps='always'>
            {locations}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    location: {
        fontSize: 20,
        marginBottom: 20
    }
})