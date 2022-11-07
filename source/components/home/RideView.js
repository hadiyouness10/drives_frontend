import React from "react";
import PropTypes from "prop-types";
import { Text, View, FlatList, Dimensions, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import RiderCard from "components/home/RiderCard";
import Icon from "react-native-vector-icons/Entypo";
import Androw from "react-native-androw";

const { width: ScreenWidth } = Dimensions.get("window");

export const RideView = (props) => {
  const { riderInfo, rideInfo, markerLat, markerLng, mapInitialRegion } = props;

  return (
    <View style={styles.riderView}>
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

      <View style={styles.listContainer}>
        <View style={styles.riderinfoStyle}>
          <RiderCard
            name={riderInfo.name}
            source={riderInfo.source}
            {...props}
          />
        </View>

        <View style={styles.listContainer}>
          <View style={styles.listContainerGlue}>
            <Icon
              name="user"
              size={14}
              color="#404040"
              style={{ marginBottom: 10 }}
            />
            <Text style={styles.titleStyle}>{rideInfo.nbofRiders} </Text>
          </View>
          <View style={styles.listContainerGlue}>
            <Text style={styles.titleStyle}>{rideInfo.price} $</Text>
          </View>
        </View>
      </View>
    </View>
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
    backgroundColor: "white",
    borderRadius: 24,
    height: 150,
    marginTop: 10,
    alignItems: "center",
  },
  mapContainer: {
    marginLeft: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    width: 125,
    height: 125,
  },
  mapStyle: {
    width: 125,
    height: 125,
    borderColor: "black",
  },
  listContainer: {
    marginTop: 12,
    marginBottom: 12,
    marginLeft: 20,
    marginRight: 12,
    flexShrink: 1,
  },
  listContainerGlue: {
    marginTop: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  riderinfoStyle: {
    marginVertical: 4,
  },
  titleStyle: {
    fontSize: 18,
    marginLeft: 5,
    fontWeight: "600",
  },
});
