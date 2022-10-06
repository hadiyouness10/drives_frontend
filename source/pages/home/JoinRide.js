import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { InputDetails } from "components";

export const JoinRide = ({ navigation }) => {
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
        <InputDetails type="joinRide" {...inputDetailsProps} />
      </View>
      <TouchableOpacity
        style={{ backgroundColor: "red", width: 200, margin: 20 }}
      >
        <Text>View Available Rides</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    flex: 1,
    backgroundColor: "white",
  },
});
