import { useEffect, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import client from '../api/client';

export default function LocationSuggestions({ text, setText, inputRef, setLocationMarker, mapRef, setLocationsId, position }) {

    const [locations, setLocations] = useState([])
    const getLocationSuggestions = (text) => {
        if (text) {
            client.post('/locationSuggestions', {location: text}, {
                headers: {
                'Content-Type': 'application/json'
                }
            })
            .then(res => setLocations(res.data.result.map(location =>
                <TouchableOpacity
                    key={location.place_id}
                    onPress={() => getLocationDetails(location.description, location.place_id)}>
                    <Text style={styles.location}>{location.description}</Text>
                </TouchableOpacity>
            )))
            .catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                });
        }
        else setLocations([])
    }

    const getLocationDetails = (location, place_id) => {
        inputRef.current.blur()
        setText(location)
        client.post('/locationSuggestions', {place_id: place_id}, {
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then(res => {
            setLocationMarker({ latitude: res.data.result.lat, longitude: res.data.result.lng })
            mapRef.current.animateToRegion({
                latitude: res.result.lat,
                longitude: res.result.lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            })
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            });
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