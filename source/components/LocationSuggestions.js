import { View, Button } from 'react-native'
import * as Location from 'expo-location';

export default function LocationSuggestions({ type, textInputRef, setStartLocationMarker }) {
    if (type === 'startingLocation') return (
        <View>
            <Button title="Use current location" onPress={async () => {
                textInputRef.current.blur()
                let location = await Location.getCurrentPositionAsync({});
                setStartLocationMarker({ latitude: location.coords.latitude, longitude: location.coords.longitude });
            }}></Button>
        </View>
    )
    else if (type === 'destination') return (
        <View>

        </View>
    )
}