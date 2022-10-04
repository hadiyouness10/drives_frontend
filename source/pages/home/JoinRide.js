import React, { useState, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { MapComponent, LocationInput } from "components";

export const JoinRide = () => {
  const [startLocationMarker, setStartLocationMarker] = useState();
  const [destinationMarker, setDestinationMarker] = useState();

  const [isDroppingMarker, setIsDroppingMarker] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const mapRef = useRef(null);

  return (
    <View style={{ flex: 1 }}>
      <LocationInput
        type="joinRide"
        setStartLocationMarker={setStartLocationMarker}
        setDestinationMarker={setDestinationMarker}
        isDroppingMarker={isDroppingMarker}
        setIsDroppingMarker={setIsDroppingMarker}
        isTyping={isTyping}
        setIsTyping={setIsTyping}
        mapRef={mapRef}
      />

      <View style={[styles.mapDiv, { flexGrow: isTyping ? 0 : 1 }]}>
        <View
          style={[
            styles.dropMarkerText,
            { display: isDroppingMarker ? "flex" : "none" },
          ]}
        >
          <Text style={{ fontSize: 22, color: "darkred" }}>
            Tap on the map to drop pin.
          </Text>
        </View>

        <MapComponent
          mapRef={mapRef}
          startLocationMarker={startLocationMarker}
          setStartLocationMarker={setStartLocationMarker}
          destinationMarker={destinationMarker}
          setDestinationMarker={setDestinationMarker}
          isDroppingMarker={isDroppingMarker}
        />

        <View
          style={[
            styles.dropDoneButtonView,
            { display: isDroppingMarker ? "flex" : "none" },
          ]}
        >
          <TouchableOpacity
            style={styles.dropDoneButton}
            onPress={() => setIsDroppingMarker(null)}
          >
            <Text style={{ color: "white", fontSize: 18 }}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapDiv: {
    flexGrow: 1,
    marginTop: -10,
  },
  dropMarkerText: {
    position: "absolute",
    zIndex: 1,
    top: 50,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  dropDoneButtonView: {
    position: "absolute",
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  dropDoneButton: {
    width: "90%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(0, 150, 255)",
    elevation: 2,
  },
});
