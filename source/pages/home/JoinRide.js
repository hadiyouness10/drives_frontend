import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { InputDetails } from "components";
import Icon from "react-native-vector-icons/Ionicons";

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
      <View>
        <InputDetails type="joinRide" {...inputDetailsProps} />
      </View>
      <View style={[styles.ridersListButtonView]} pointerEvents="auto">
        <TouchableOpacity
          style={styles.ridersListButton}
          onPress={() => navigation.push("Riders")}
        >
          <Text style={{ color: "rgb(0, 125, 200)", fontSize: 20 }}>
            View Available Drivers
          </Text>
          <Icon
            name={"search"}
            size={30}
            color="#404040"
            style={{ marginLeft: "auto" }}
          />
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
  ridersListButtonView: {
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
    backgroundColor: "white",
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
    borderWidth: 1,
    borderColor: "grey",
    marginHorizontal: 15,
    paddingHorizontal: 15,
    flexDirection: "row",
  },
});
