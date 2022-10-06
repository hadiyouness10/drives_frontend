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
  useLocationDetailsQuery,
} from "api/queries";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/Entypo";

export const InputLocation = ({
  type,
  position,
  navigation,
  locationMarkers,
  locationId,
  setLocationId,
}) => {
  const [searchText, setSearchText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const { data: locationSuggestions } = useLocationSuggestionsQuery(
    type,
    position,
    searchText
  );

  const { data: locationDetails } = useLocationDetailsQuery(locationId);

  const inputRef = useRef(null);

  useEffect(() => {
    const { setStartLocationMarker, setDestinationMarker } = locationMarkers;
    if (locationDetails) {
      if (position === "start")
        setStartLocationMarker({
          latitude: locationDetails?.lat,
          longitude: locationDetails?.lng,
        });
      else
        setDestinationMarker({
          latitude: locationDetails?.lat,
          longitude: locationDetails?.lng,
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
              setSearchText(description);
              setLocationId(place_id);
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
    <View style={{ marginBottom: showSuggestions ? 0 : 40 }}>
      <View style={styles.input}>
        <TextInput
          ref={inputRef}
          style={{ flex: 1, fontSize: 18 }}
          placeholder={
            position === "start" ? "Starting Location" : "Destination"
          }
          placeholderTextColor="grey"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          onFocus={() => setIsTyping(true)}
          onBlur={() => setIsTyping(null)}
        />

        <TouchableOpacity
          style={{ margin: 4 }}
          onPress={() => {
            setIsTyping(false);
            setSearchText("");
            inputRef.current.blur();
          }}
        >
          <MaterialIcons name="clear" size={20} color="#808080" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.push(`Drop Pin (${type})`, {
              locationMarkers,
              position,
            })
          }
          style={{ marginRight: 5 }}
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
});
