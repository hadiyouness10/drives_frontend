import React, { useState, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { MapComponent, InputDetails } from "components";

export const StartRide = () => {
  const [startLocationMarker, setStartLocationMarker] = useState();
  const [destinationMarker, setDestinationMarker] = useState();

  const [isDroppingMarker, setIsDroppingMarker] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  const mapRef = useRef(null);

  return (
    <View style={styles.mainDiv}>
      <View style={{ height: "70%" }}>
        <InputDetails
          type="startRide"
          setStartLocationMarker={setStartLocationMarker}
          setDestinationMarker={setDestinationMarker}
          isDroppingMarker={isDroppingMarker}
          setIsDroppingMarker={setIsDroppingMarker}
          isTyping={isTyping}
          setIsTyping={setIsTyping}
          mapRef={mapRef}
        />
      </View>

      <View
        style={[
          styles.confirmButtonView,
          { display: isDroppingMarker ? "none" : "flex" },
        ]}
        pointerEvents="auto"
      >
        <TouchableOpacity style={styles.confirmButton} onPress={() => {}}>
          <Text style={{ color: "white", fontSize: 20 }}>Confirm Ride</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    flex: 1,
    backgroundColor: "white",
  },
  mapDiv: {
    flexGrow: 1,
    marginTop: -10,
  },
  confirmButtonView: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
  },
  confirmButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 30,
    backgroundColor: "rgb(0, 125, 200)",
    width: 150,
    elevation: 5,
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
