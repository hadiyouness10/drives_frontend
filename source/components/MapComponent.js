import { useState } from "react";
import MapView, { Marker } from "react-native-maps";

export default function MapComponent() {

    const [region, setRegion] = useState({
        latitude: 33.8938,
        longitude: 35.5018,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })

    const [marker, setMarker] = useState({
        title: 'Test Marker',
        coordinate: {
            latitude: 33.8938,
            longitude: 35.5018
        }
    })

    return (
        <MapView style={{ flex: 1 }}
            region={region}
            onRegionChangeComplete={region => setRegion(region)}
            showsUserLocation={true}
            onPress={e => setMarker({
                title: 'User Marker',
                coordinate: e.nativeEvent.coordinate
            })}>
            <Marker
                title={marker.title}
                coordinate={marker.coordinate}
            />
        </MapView>
    )
}