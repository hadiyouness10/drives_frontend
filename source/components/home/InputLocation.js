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
  useLocationNameQuery,
} from "api/queries";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/Entypo";

export const InputLocation = ({
  type,
  position,
  universityField,
  navigation,
  startCoordinates,
  destinationCoordinates,
  setStartCoordinates,
  setDestinationCoordinates,
  location,
  setLocation,
  updateLocationCoords,
  setUpdateLocationCoords,
}) => {
  const [updateLocationName, setUpdateLocationName] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const { data: locationSuggestions } = useLocationSuggestionsQuery(
    type,
    position,
    location,
    universityField === position
  );

  const { data: fetchedLocationCoordinates } =
    useLocationCoordinatesQuery(selectedLocation);

  const { data: nameFromCoords, refetch: fetchLocationName } =
    useLocationNameQuery(
      position === "start" ? startCoordinates : destinationCoordinates
    );

  useEffect(() => {
    if (nameFromCoords) {
      setUpdateLocationCoords(false);
      setLocation(nameFromCoords);
    }
  }, [nameFromCoords]);

  useEffect(() => {
    if (updateLocationName) {
      // set this to true so that the name is not fetched when coords
      // are already being generated from the name.
      fetchLocationName();
      setUpdateLocationName(false);
    }
  }, [
    updateLocationName,
    JSON.stringify(startCoordinates),
    JSON.stringify(destinationCoordinates),
  ]);

  const inputRef = useRef(null);

  useEffect(() => {
    if (fetchedLocationCoordinates) {
      if (position === "start") setStartCoordinates(fetchedLocationCoordinates);
      else setDestinationCoordinates(fetchedLocationCoordinates);
    }
  }, [JSON.stringify(fetchedLocationCoordinates)]);

  useEffect(() => {
    if (updateLocationCoords) {
      if (position === "start") setStartCoordinates(null);
      else setDestinationCoordinates(null);
    }
    setUpdateLocationCoords(true);
  }, [location]);

  const locations = useMemo(() => {
    return locationSuggestions
      ? locationSuggestions.map((location, index) => {
          const { description } = location;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                inputRef.current.blur();
                setLocation(description);
                setSelectedLocation(description);
              }}
            >
              <Text style={styles.location}>{description}</Text>
            </TouchableOpacity>
          );
        })
      : [];
  }, [JSON.stringify(locationSuggestions)]);

  const showSuggestions = isTyping && locationSuggestions?.length > 0;

  return (
    <View style={{ marginBottom: showSuggestions ? 0 : 15 }}>
      <View style={styles.input}>
        <TextInput
          ref={inputRef}
          style={{ flex: 1, fontSize: 18 }}
          placeholder={`${
            position === "start" ? "Starting Location" : "Destination"
          }${universityField === position ? " (University)" : ""}`}
          placeholderTextColor="grey"
          value={location}
          onChangeText={(text) => setLocation(text)}
          onFocus={() => setIsTyping(true)}
          onBlur={() => setIsTyping(null)}
        />

        {universityField !== position && (
          <TouchableOpacity
            onPress={() => {
              navigation.push(`Drop Pin`, {
                startCoordinates,
                destinationCoordinates,
                setStartCoordinates,
                setDestinationCoordinates,
                position,
                setUpdateLocationName,
              });
            }}
            style={styles.dropPinIcon}
          >
            <Icon name="location-pin" size={30} color="#404040" />
          </TouchableOpacity>
        )}
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
