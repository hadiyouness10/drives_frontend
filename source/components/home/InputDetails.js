import React, { useState, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity, LogBox } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { dateTimeFormatter } from "utils";
import { InputLocation } from "./InputLocation";
import { Picker } from "@react-native-picker/picker";

export const InputDetails = ({
  type,
  navigation,
  startLocationId,
  setStartLocationId,
  destinationLocationId,
  setDestinationLocationId,
  date,
  setDate,
  numberOfSeats,
  setNumberOfSeats,
}) => {
  const [dateTimePickerShown, setDateTimePickerShown] = useState(null);
  const [startLocationMarker, setStartLocationMarker] = useState(null);
  const [destinationMarker, setDestinationMarker] = useState();
  const numberOfSeatsRef = useRef(null);

  // const { data: possibleRoutes } = usePossibleRoutesQuery(startId, destinationId)

  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);

  const inputLocationProps = {
    type,
    navigation,
    locationMarkers: {
      startLocationMarker,
      destinationMarker,
      setStartLocationMarker,
      setDestinationMarker,
    },
  };

  return (
    <View style={[styles.mainDiv]}>
      {dateTimePickerShown && (
        <DateTimePicker
          value={date}
          mode={dateTimePickerShown}
          onChange={(e, selectedDate) => {
            setDate(selectedDate);
            setDateTimePickerShown(null);
          }}
        />
      )}

      <InputLocation
        position="start"
        setLocationMarker={setStartLocationMarker}
        locationId={startLocationId}
        setLocationId={setStartLocationId}
        {...inputLocationProps}
      />

      <InputLocation
        position="destination"
        setLocationMarker={setDestinationMarker}
        locationId={destinationLocationId}
        setLocationId={setDestinationLocationId}
        {...inputLocationProps}
      />

      <Text
        style={{
          height: 50,
          padding: 10,
          textAlignVertical: "center",
          fontSize: 16,
        }}
      >
        When are you leaving?
      </Text>

      <View
        style={{
          height: 50,
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 40,
        }}
      >
        <TouchableOpacity
          style={[styles.buttonDiv, { marginRight: 10 }]}
          onPress={() => setDateTimePickerShown("date")}
        >
          <Text style={styles.buttonText}>
            {dateTimeFormatter(date, "date")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonDiv}
          onPress={() => setDateTimePickerShown("time")}
        >
          <Text style={styles.buttonText}>
            {dateTimeFormatter(date, "time")}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.numberOfSeats}
        onPress={() => numberOfSeatsRef.current.focus()}
      >
        <Text style={{ height: 50, textAlignVertical: "center", fontSize: 18 }}>
          Number of seats
        </Text>
        <Picker
          ref={numberOfSeatsRef}
          style={{ width: 100 }}
          selectedValue={numberOfSeats.toString()}
          onValueChange={(itemValue, itemIndex) => {
            setNumberOfSeats(parseInt(itemValue));
          }}
        >
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
        </Picker>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    flexGrow: 1,
    marginTop: 100,
    marginHorizontal: 15,
    display: "flex",
    justifyContent: "space-between",
  },
  buttonDiv: {
    flex: 1,
    backgroundColor: "rgb(0, 125, 200)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  numberOfSeats: {
    height: 50,
    marginTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 4,
    backgroundColor: "white",
  },
});
