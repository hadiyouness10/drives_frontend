import { View, Button } from 'react-native'

export default function LocationSuggestions({ type }) {
    if (type === 'startingLocation') return (
        <View>
            <Button title="Use current location" ></Button>
        </View>
    )
    else if (type === 'destination') return (
        <View>

        </View>
    )
}