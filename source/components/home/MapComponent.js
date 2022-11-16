import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
// import MapViewDirections from "react-native-maps-directions";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as Location from "expo-location";

export const MapComponent = ({
  mapRef,
  startLocationMarker = null,
  setStartLocationMarker = () => {},
  destinationMarker = null,
  setDestinationMarker = () => {},
  initialRegion = {
    latitude: 33.8938,
    longitude: 35.5018,
  },
  initialDelta = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  route,
  position = null,
}) => {
  const [region, setRegion] = useState({
    ...initialRegion,
    ...initialDelta,
  });

  const [tempStartLocationMarker, setTempStartLocationMarker] =
    useState(startLocationMarker);
  const [tempDestinationMarker, setTempDestinationMarker] =
    useState(destinationMarker);

  useEffect(() => {
    const getUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }
    };
    getUserLocation();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        ref={mapRef}
        region={region}
        onRegionChangeComplete={(region) => setRegion(region)}
        showsUserLocation={true}
        showsMyLocationButton={false}
        toolbarEnabled={false}
        onPress={(e) => {
          if (position === "start") {
            setTempStartLocationMarker(e.nativeEvent.coordinate);
            setStartLocationMarker(e.nativeEvent.coordinate);
          } else if (position === "destination") {
            setTempDestinationMarker(e.nativeEvent.coordinate);
            setDestinationMarker(e.nativeEvent.coordinate);
          }
        }}
      >
        {tempStartLocationMarker && (
          <Marker title="Start Location" coordinate={tempStartLocationMarker} />
        )}

        {tempDestinationMarker && (
          <Marker
            title="Destination"
            coordinate={tempDestinationMarker}
            pinColor="green"
          />
        )}
        {route && <Polyline coordinates={route} />}
      </MapView>
      <TouchableOpacity
        style={[
          styles.myLocationButton,
          { bottom: position === null ? 20 : 70 },
        ]}
        onPress={async () => {
          let location = await Location.getCurrentPositionAsync({});
          mapRef.current.animateToRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }}
      >
        <MaterialIcons name="my-location" size={25} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  myLocationButton: {
    position: "absolute",
    right: 30,
    backgroundColor: "white",
    padding: 13,
    borderRadius: 30,
    elevation: 2,
    zIndex: 1,
  },
});
