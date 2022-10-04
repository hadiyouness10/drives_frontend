import { useEffect, useMemo, useState } from "react";
import { Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import {
  useLocationSuggestionsQuery,
  useLocationDetailsQuery,
} from "api/queries";

export const LocationSuggestions = ({
  type,
  text,
  setText,
  inputRef,
  setLocationMarker,
  mapRef,
  setLocationsId,
  position,
}) => {
  const [selectedPlaceId, setSelectedPlaceId] = useState();

  const { data: locationSuggestions } = useLocationSuggestionsQuery(
    type,
    position,
    text
  );

  const { data: locationDetails } = useLocationDetailsQuery(selectedPlaceId);

  useEffect(() => {
    if (locationDetails) {
      setLocationMarker({
        latitude: locationDetails?.lat,
        longitude: locationDetails?.lng,
      });
      mapRef.current.animateToRegion({
        latitude: locationDetails?.lat,
        longitude: locationDetails?.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [JSON.stringify(locationDetails)]);

  const locations = useMemo(
    () =>
      locationSuggestions?.map((location) => {
        const { description, place_id } = location;
        return (
          <TouchableOpacity
            key={location.place_id}
            onPress={() => {
              inputRef.current.blur();
              setText(description);
              setSelectedPlaceId(place_id);
              setLocationsId(position, place_id);
            }}
          >
            <Text style={styles.location}>{location.description}</Text>
          </TouchableOpacity>
        );
      }) ?? [],
    [JSON.stringify(locationSuggestions)]
  );

  return (
    <ScrollView keyboardShouldPersistTaps="always">{locations}</ScrollView>
  );
};

const styles = StyleSheet.create({
  location: {
    fontSize: 18,
    marginBottom: 20,
  },
});
