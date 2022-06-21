import { useState, useEffect } from "react";
import { View, TouchableOpacity, PermissionsAndroid } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function MapComponent({ startLocationMarker, setStartLocationMarker, destinationMarker, setDestinationMarker, isDroppingMarker }) {

    const [region, setRegion] = useState({
        latitude: 33.8938,
        longitude: 35.5018,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })

    const [userLocation, setUserLocation] = useState()

    const getOneTimeLocation = () => {
        Geolocation.getCurrentPosition((position) => {
            setUserLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, (error) => console.warn(error),
            {
                enableHighAccuracy: false,
                timeout: 30000,
                maximumAge: 1000
            },
        );
    };

    const subscribeLocationLocation = () => {
        watchID = Geolocation.watchPosition(
            (position) => {
                setUserLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }, (error) => console.warn(error),
            {
                enableHighAccuracy: false,
                maximumAge: 1000
            },
        );
    };

    useEffect(() => {
        const requestLocationPermission = async () => {
            if (Platform.OS === 'ios') {
                getOneTimeLocation();
                subscribeLocationLocation();
            } else {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Location Access Required',
                            message: 'This App needs to Access your location',
                        },
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        //To Check, If Permission is granted
                        getOneTimeLocation();
                        subscribeLocationLocation();
                    }
                } catch (err) {
                    console.warn(err);
                }
            }
        };
        requestLocationPermission();
        return () => {
            Geolocation.clearWatch(watchID);
        };
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <MapView style={{ flex: 1 }}
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
                onPress={() => {
                    getOneTimeLocation();
                    setTimeout(() => setRegion({
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