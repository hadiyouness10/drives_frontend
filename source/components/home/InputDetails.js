import React, { useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { dateTimeFormatter } from "utils";
import { InputLocation } from "./InputLocation";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/Entypo";

const WrapperView = ({ children, icon, label }) => {
  return (
    <View style={styles.wrapperViewDiv}>
      <View style={styles.wrapperViewTitle}>
        <Icon
          name={icon}
          size={30}
          color="#404040"
          style={{ marginBottom: 10 }}
        />
        <Text
          style={{
            fontSize: 18,
            color: "grey",
          }}
        >
          {label}
        </Text>
      </View>
      {children}
    </View>
  );
};
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
              <TouchableOpacity>
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
    // marginHorizontal: 15,
    paddingTop: 20,
    backgroundColor: "white",
  },
  wrapperViewDiv: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    paddingTop: 50,
    marginTop: 60,
    borderColor: "grey",
    backgroundColor: "white",
  },
  wrapperViewTitle: {
    position: "absolute",
    top: -37,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
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
});
