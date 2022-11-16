import { useEffect, useMemo, useRef, useState } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  TextInput,
} from "react-native";
import {
  useLocationSuggestionsQuery,
  useLocationCoordinatesQuery,
} from "api/queries";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/Entypo";

export const InputLocation = ({
  type,
  position,
  navigation,
  locationMarkers,
  location,
  setLocation,
}) => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const { data: locationSuggestions } = useLocationSuggestionsQuery(
    type,
    position,
    location
  );

  const { data: locationCoordinates } =
    useLocationCoordinatesQuery(selectedLocation);

  const inputRef = useRef(null);

  useEffect(() => {
    const { setStartLocationMarker, setDestinationMarker } = locationMarkers;
    if (locationCoordinates) {
      if (position === "start")
        setStartLocationMarker({
          latitude: locationCoordinates?.lat,
          longitude: locationCoordinates?.lng,
        });
      else
        setDestinationMarker({
          latitude: locationCoordinates?.lat,
          longitude: locationCoordinates?.lng,
        });
    }
  }, [JSON.stringify(locationCoordinates)]);

  const locations = useMemo(
    () =>
      locationSuggestions?.map((location) => {
        const { description, place_id } = location;
        return (
          <TouchableOpacity
            key={location.place_id}
            onPress={() => {
              inputRef.current.blur();
              setLocation(description);
              setSelectedLocation(description);
            }}
          >
            <Text style={styles.location}>{location.description}</Text>
          </TouchableOpacity>
        );
      }) ?? [],
    [JSON.stringify(locationSuggestions)]
  );

  const showSuggestions = isTyping && locationSuggestions?.length > 0;

  return (
    <View style={{ marginBottom: showSuggestions ? 0 : 15 }}>
      <View style={styles.input}>
        <TextInput
          ref={inputRef}
          style={{ flex: 1, fontSize: 18 }}
          placeholder={
            position === "start" ? "Starting Location" : "Destination"
          }
          placeholderTextColor="grey"
          value={location}
          onChangeText={(text) => setLocation(text)}
          onFocus={() => setIsTyping(true)}
          onBlur={() => setIsTyping(null)}
        />

        <TouchableOpacity
          style={{ margin: 10 }}
          onPress={() => {
            setIsTyping(false);
            setLocation("");
            inputRef.current.blur();
          }}
        >
          <MaterialIcons name="clear" size={20} color="#808080" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.push(`Drop Pin`, {
              locationMarkers,
              position,
            });
          }}
          style={styles.dropPinIcon}
        >
          <Icon name="location-pin" size={30} color="#404040" />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{
          display: showSuggestions ? "flex" : "none",
          margin: 10,
          marginTop: 20,
        }}
        keyboardShouldPersistTaps="always"
      >
        {locations}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  location: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    height: 60,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "rgba(10, 10, 10, 0.07)",
  },
  dropPinIcon: {
    marginRight: 5,
    borderWidth: 1,
    borderRadius: 20,
    borderStyle: "dashed",
    backgroundColor: "white",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
