import React, { useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { dateTimeFormatter } from "utils";
import { InputLocation } from "./InputLocation";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/Entypo";
import { TextInput } from "react-native-gesture-handler";

export const InputDetails = ({
  type, // joinRide | startRide
  navigation,
  startLocation,
  setStartLocation,
  destinationLocation,
  setDestinationLocation,
  startCoordinates,
  setStartCoordinates,
  destinationCoordinates,
  setDestinationCoordinates,
  date,
  setDate,
  numberOfSeats,
  setNumberOfSeats,
  pricePerRider,
  setPricePerRider,
  universityField,
  setUniversityField,
}) => {
  const [dateTimePickerShown, setDateTimePickerShown] = useState(null);
  const numberOfSeatsRef = useRef(null);

  const inputLocationProps = {
    type,
    universityField,
    navigation,
    locationMarkers: {
      startCoordinates,
      destinationCoordinates,
      setStartCoordinates,
      setDestinationCoordinates,
    },
  };

  return (
    <View style={[styles.mainDiv]}>
      <View style={styles.infoSection}>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          {dateTimePickerShown && Platform.OS === "android" && (
            <DateTimePicker
              value={date}
              mode={dateTimePickerShown}
              onChange={(e, selectedDate) => {
                setDate(selectedDate);
                setDateTimePickerShown(null);
              }}
            />
          )}
          <View>
            <InputLocation
              position="start"
              setLocationMarker={setStartCoordinates}
              location={startLocation}
              setLocation={setStartLocation}
              {...inputLocationProps}
            />
            <InputLocation
              position="destination"
              setLocationMarker={setDestinationCoordinates}
              location={destinationLocation}
              setLocation={setDestinationLocation}
              {...inputLocationProps}
            />
            <View
              style={{
                backgroundColor: "white",
                marginTop: -105,
                marginLeft: 10,
                marginBottom: 60,
                borderWidth: 1,
                height: 44,
                width: 44,
                borderRadius: 22,
                borderColor: "white",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setUniversityField((field) => {
                    const temp = startLocation;
                    setStartLocation(destinationLocation);
                    setDestinationLocation(temp);
                    const temp2 = startCoordinates;
                    setStartCoordinates(destinationCoordinates);
                    setDestinationCoordinates(temp2);
                    return field === "destination" ? "start" : "destination";
                  });
                }}
              >
                <Icon size={40} name={"retweet"} color={"black"} />
              </TouchableOpacity>
            </View>
          </View>

          {Platform.OS === "ios" ? (
            <View style={[{ flexDirection: "row", alignItems: "center" }]}>
              <View style={[{ flexDirection: "row" }]}>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: 18,
                    marginTop: 5,
                    marginLeft: 5,
                  }}
                >
                  Date & Time
                </Text>
                <DateTimePicker
                  style={{ width: 120, marginLeft: 30 }}
                  themeVariant="light"
                  value={date}
                  mode={"date"}
                  onChange={(e, selectedDate) => {
                    setDate(selectedDate);
                    setDateTimePickerShown(null);
                  }}
                />
              </View>
              <View
                style={[
                  {
                    justifyContent: "space-evenly",
                    marginVertical: 10,
                    marginRight: 100,
                  },
                ]}
              >
                <DateTimePicker
                  style={{ width: 100 }}
                  themeVariant="light"
                  value={date}
                  mode={"time"}
                  onChange={(e, selectedDate) => {
                    setDate(selectedDate);
                    setDateTimePickerShown(null);
                  }}
                />
              </View>
            </View>
          ) : (
            <View
              style={{
                height: 50,
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 20,
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
          )}
          <View style={[{ flexDirection: "row", alignItems: "center" }]}>
            <View style={[{ flex: 1, flexDirection: "row" }]}>
              <Text style={{ fontSize: 20, fontWeight: "400" }}>
                Number Of Seats
              </Text>
            </View>
            <View
              style={[{ justifyContent: "space-evenly", marginVertical: 10 }]}
            >
              <TouchableOpacity
                style={styles.numberOfSeats}
                onPress={() => numberOfSeatsRef.current.focus()}
              >
                <Picker
                  ref={numberOfSeatsRef}
                  style={{ width: 160 }}
                  selectedValue={numberOfSeats.toString()}
                  onValueChange={(itemValue, itemIndex) => {
                    setNumberOfSeats(parseInt(itemValue));
                  }}
                  itemStyle={{ height: 50 }}
                >
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                  <Picker.Item label="3" value="3" />
                  <Picker.Item label="4" value="4" />
                </Picker>
              </TouchableOpacity>
            </View>
          </View>
          {type === "startRide" && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.input}>
                <Text style={{ fontSize: 24, marginRight: 10 }}>$</Text>
                <TextInput
                  style={{ flex: 1, fontSize: 18 }}
                  placeholder="Price per rider"
                  value={pricePerRider}
                  keyboardType={"decimal-pad"}
                  onChangeText={(text) => setPricePerRider(parseFloat(text))}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-between",
  },
  infoSection: {
    paddingTop: 20,
    backgroundColor: "white",
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  input: {
    height: 60,
    flex: 1,
    marginBottom: 10,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "rgba(10, 10, 10, 0.07)",
  },
});
