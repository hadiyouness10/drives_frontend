import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import RiderCard from "components/home/RiderCard";
import Icon from "react-native-vector-icons/Entypo";
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
  id,
  driverID,
  dateOfDeparture,
  pricePerRider,
  numberOfRiders,
  markerLat = 37.78825,
  markerLng = -122.4324,
  mapInitialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0922,
  },
  navigation,
  pageIndex = 0,
  displayDriver = true,
}) => {
  const { data: { firstName, lastName } = { firstName: "", lastName: "" } } =
    useUserDetailsQuery(driverID);
  if (displayDriver && !firstName) return <View />;
  else
    return (
      <TouchableOpacity
        style={styles.riderView}
        onPress={() =>
          navigation.push(
            pageIndex === 0 ? "Ride Details" : "Ride Details (Your Rides)",
            { rideID: id, driverID, pageIndex }
          )
        }
      >
        <View style={styles.mapContainer}>
          <MapView
            liteMode
            initialRegion={mapInitialRegion}
            style={styles.mapStyle}
            toolbarEnabled={false}
          >
            <Marker
              coordinate={{ latitude: markerLat, longitude: markerLng }}
            />
          </MapView>
        </View>

        <View
          style={{
            flex: 1,
            margin: 20,
            marginRight: 25,
            marginLeft: 15,
          }}
        >
          {displayDriver && <RiderCard name={`${firstName} ${lastName}`} />}
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
              <Detail title="Price" icon="credit" value={pricePerRider} />
              <Detail title="Riders" icon="user" value={numberOfRiders} />
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
    marginTop: 15,
    alignItems: "center",
    elevation: 8,
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
