import React, { useState, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { MapComponent, InputDetails } from "components";

export const StartRide = ({ navigation }) => {
  const [startLocationId, setStartLocationId] = useState("");
  const [destinationLocationId, setDestinationLocationId] = useState("");
  const [date, setDate] = useState(new Date());
  const [numberOfSeats, setNumberOfSeats] = useState(1);

  const inputDetailsProps = {
    navigation,
    startLocationId,
    setStartLocationId,
    destinationLocationId,
    setDestinationLocationId,
    date,
    setDate,
    numberOfSeats,
    setNumberOfSeats,
  };

  return (
    <View style={styles.mainDiv}>
      <View style={{ height: "70%" }}>
        <InputDetails type="startRide" {...inputDetailsProps} />
      </View>

      <View style={[styles.confirmButtonView, ,]} pointerEvents="auto">
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
});
