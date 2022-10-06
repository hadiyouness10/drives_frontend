import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
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
    <ImageBackground
      source={require("../../assets/map_background.png")}
      style={styles.mainDiv}
    >
      <View>
        <InputDetails type="joinRide" {...inputDetailsProps} />
      </View>
      <View style={[styles.ridersListButtonView]} pointerEvents="auto">
        <TouchableOpacity style={styles.ridersListButton} onPress={() => {}}>
          <Text style={{ color: "white", fontSize: 20 }}>View Riders List</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    flex: 1,
    backgroundColor: "white",
  },
  ridersListButtonView: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
  },
  ridersListButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 30,
    backgroundColor: "rgb(0, 125, 200)",
    width: 300,
    elevation: 5,
  },
});
