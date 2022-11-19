import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import RiderCard from "components/home/RiderCard";
import Icon from "react-native-vector-icons/Entypo";
import IonIcon from "react-native-vector-icons/Ionicons";
import { dateTimeFormatter } from "utils";
import { useUserDetailsQuery } from "api/queries";

const Detail = ({ title, icon, value }) => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <Icon name={icon} size={20} color="#404040" style={{ marginRight: 10 }} />
    <View>
      <Text style={{ color: "grey", fontSize: 12 }}>{title}</Text>
      <Text style={{ fontSize: 13 }}>{value} </Text>
    </View>
  </View>
);
export const RideView = ({
  ID: id,
  studentId: driverId,
  stopRequest,
  dateOfDeparture,
  pricePerRider,
  numberOfSeats,
  numberOfAvailableSeats,
  departureCoordinates,
  pickupLocation,
  pickupCoordinates,
  navigation,
  pageIndex = 0,
  displayDriver = true,
  request = false,
}) => {
  const { data: { firstName, lastName } = { firstName: "", lastName: "" } } =
    useUserDetailsQuery(driverId);
  if (displayDriver && !firstName) return <View />;
  else
    return (
      <TouchableOpacity
        style={styles.riderView}
        onPress={() =>
          navigation.push(
            pageIndex === 0 ? "Ride Details" : "Ride Details (Your Rides)",
            {
              rideId: id,
              driverId,
              pageIndex,
              pickupLocation,
              pickupCoordinates,
              request,
            }
          )
        }
      >
        <View style={styles.mapContainer}>
          <MapView
            liteMode
            initialRegion={{
              latitude: departureCoordinates.latitude,
              longitude: departureCoordinates.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={styles.mapStyle}
            toolbarEnabled={false}
          >
            <Marker
              coordinate={{
                latitude: departureCoordinates.latitude,
                longitude: departureCoordinates.longitude,
              }}
            />
          </MapView>
        </View>

        <View
          style={{
            flex: 1,
            margin: 15,
            marginRight: 25,
            marginLeft: 15,
          }}
        >
          {displayDriver && <RiderCard name={`${firstName} ${lastName}`} />}
          {stopRequest && stopRequest.requestStatus === "PENDING" && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: -7,
                marginBottom: 3,
              }}
            >
              <IonIcon name="alert-circle" size={14} color={"orange"} />
              <Text style={{ marginLeft: 3 }}>Pending Request</Text>
            </View>
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
            }}
          >
            <View
              style={{
                justifyContent: displayDriver
                  ? "space-between"
                  : "space-around",
              }}
            >
              <Detail
                title="Date"
                icon="calendar"
                value={dateTimeFormatter(
                  new Date(dateOfDeparture),
                  "short-date"
                )}
              />
              <Detail
                title="Time"
                icon="clock"
                value={dateTimeFormatter(new Date(dateOfDeparture))}
              />
            </View>
            <View
              style={{
                justifyContent: displayDriver
                  ? "space-between"
                  : "space-around",
              }}
            >
              <Detail
                title="Price"
                icon="credit"
                value={`${pricePerRider} $`}
              />
              <Detail
                title="Riders"
                icon="user"
                value={numberOfSeats - numberOfAvailableSeats}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  riderView: {
    flexDirection: "row",
    marginHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 24,
    height: 160,
    marginTop: 5,
    marginBottom: 15,
    alignItems: "center",
    elevation: 4,
  },
  mapContainer: {
    marginLeft: 10,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  mapStyle: {
    width: 125,
    height: 140,
    borderColor: "black",
  },
});
