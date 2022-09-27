import { useEffect, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import client from '../api/client';

export default function LocationSuggestions({ text, setText, inputRef, setLocationMarker, mapRef, setLocationsId, position }) {

    const [locations, setLocations] = useState([])
    const getLocationSuggestions = (text) => {
        if (text) {
            client.get('/locationSuggestions', {"body":JSON.stringify({location: text}) }, {
                headers: {
                'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(res => setLocations(res.result.map(location =>
                <TouchableOpacity
                    key={location.place_id}
                    onPress={() => getLocationDetails(location.description, location.place_id)}>
                    <Text style={styles.location}>{location.description}</Text>
                </TouchableOpacity>
            )))
        }
        else setLocations([])
    }

    const getLocationDetails = (location, place_id) => {
        inputRef.current.blur()
        setText(location)
        client.get('/locationSuggestions', {"body":JSON.stringify({place_id: place_id}) }, {
            headers: {
            'Content-Type': 'application/json'
            }
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
        setLocationsId(position, place_id)
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
        fontSize: 18,
        marginBottom: 20
    }
})