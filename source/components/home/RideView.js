import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import RiderCard from "components/home/RiderCard";
import Icon from "react-native-vector-icons/Entypo";
import { dateTimeFormatter } from "utils";

const Detail = ({ title, icon, value }) => (
  <View style={{ flexDirection: "row", alignItems: "center", marginTop: 12 }}>
    <Icon name={icon} size={20} color="#404040" style={{ marginRight: 10 }} />
    <View>
      <Text style={{ color: "grey", fontSize: 12 }}>{title}</Text>
      <Text style={{ fontSize: 13 }}>{value} </Text>
    </View>
  </View>
);
export const RideView = ({
  riderInfo,
  rideInfo,
  markerLat,
  markerLng,
  mapInitialRegion,
  navigation,
}) => {
  return (
    <TouchableOpacity
      style={styles.riderView}
      onPress={() => navigation.push("Ride Details")}
    >
      <View style={styles.mapContainer}>
        <MapView
          liteMode
          initialRegion={mapInitialRegion}
          style={styles.mapStyle}
          toolbarEnabled={false}
        >
          <Marker coordinate={{ latitude: markerLat, longitude: markerLng }} />
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
        <RiderCard name={riderInfo.name} source={riderInfo.source} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flex: 1,
          }}
        >
          <View style={{ justifyContent: "space-around" }}>
            <Detail
              title="Date"
              icon="calendar"
              value={dateTimeFormatter(new Date(), "short-date")}
            />
            <Detail
              title="Time"
              icon="clock"
              value={dateTimeFormatter(new Date())}
            />
          </View>
          <View style={{ justifyContent: "space-around" }}>
            <Detail title="Price" icon="credit" value={`${rideInfo.price} $`} />
            <Detail title="Riders" icon="user" value={rideInfo.nbofRiders} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

RideView.defaultProps = {
  markerLat: 37.78825,
  markerLng: -122.4324,
  mapInitialRegion: {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0922,
  },
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
