import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, PermissionsAndroid } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Location from 'expo-location';

export default function MapComponent({ startLocationMarker, setStartLocationMarker, destinationMarker, setDestinationMarker, isDroppingMarker }) {

    const [region, setRegion] = useState({
        latitude: 33.8938,
        longitude: 35.5018,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })

    const mapRef = useRef(null)

    const [userLocation, setUserLocation] = useState()

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setUserLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
        })();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <MapView style={{ flex: 1 }}
                ref={mapRef}
                region={region}
                onRegionChangeComplete={region => setRegion(region)}
                showsUserLocation={true}
                showsMyLocationButton={false}
                onPress={e => {
                    if (isDroppingMarker === 'startingLocation')
                        setStartLocationMarker(e.nativeEvent.coordinate)
                    else if (isDroppingMarker === 'destination')
                        setDestinationMarker(e.nativeEvent.coordinate)
                }}>
                {startLocationMarker && <Marker
                    title="Start Location"
                    coordinate={startLocationMarker}
                />}

                {destinationMarker && <Marker
                    title="Destination"
                    coordinate={destinationMarker}
                    pinColor='green'
                />}
            </MapView>
            <TouchableOpacity style={{ position: 'absolute', bottom: isDroppingMarker ? 70 : 30, right: 30, backgroundColor: 'white', padding: 13, borderRadius: 30 }}
                onPress={async () => {
                    let location = await Location.getCurrentPositionAsync({});
                    setUserLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
                    setTimeout(() => mapRef.current.animateToRegion({
                        ...userLocation,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01
                    }), 100)

                }}>
                <MaterialIcons name='my-location' size={25} />
            </TouchableOpacity>
        </View>
    )
}