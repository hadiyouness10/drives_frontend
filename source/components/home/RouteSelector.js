import { decode } from "@mapbox/polyline";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MapComponent } from "./MapComponent";

export const RouteSelector = ({
  startCoordinates,
  destinationCoordinates,
  routes,
  enabled,
  setEnabled,
  displayedRoute,
  setDisplayedRoute,
  createRide,
}) => {
  if (!enabled) return <View />;
  else
    return (
      <View style={styles.mainDiv}>
        <View style={styles.mapDiv}>
          <MapComponent
            startLocationMarker={startCoordinates}
            destinationMarker={destinationCoordinates}
            showMyLocation={false}
            initialRegion={{
              longitude:
                (startCoordinates.longitude +
                  destinationCoordinates.longitude) /
                2,
              latitude:
                (startCoordinates.latitude + destinationCoordinates.latitude) /
                2,
            }}
            initialDelta={{
              latitudeDelta:
                Math.abs(
                  startCoordinates.latitude - destinationCoordinates.latitude
                ) * 1.75,
              longitudeDelta:
                Math.abs(
                  startCoordinates.longitude - destinationCoordinates.longitude
                ) * 1.75,
            }}
            route={decode(routes[displayedRoute]).map((point) => ({
              latitude: point[0],
              longitude: point[1],
            }))}
          />
        </View>
        <View
          style={{
            width: "100%",
            height: 50,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {routes.map((route, index) => (
            <TouchableOpacity
              style={[
                styles.buttonDiv,
                displayedRoute === index ? { backgroundColor: "grey" } : {},
              ]}
              disabled={displayedRoute === index}
              onPress={() => setDisplayedRoute(index)}
            >
              <Text style={styles.buttonText}>{index + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() => {
              setEnabled(false);
              setDisplayedRoute(0);
            }}
            style={[
              styles.buttonDiv,
              {
                height: 50,
                width: 140,
                backgroundColor: "red",
                marginTop: 20,
              },
            ]}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setEnabled(false);
              createRide();
              setDisplayedRoute(0);
            }}
            style={[
              styles.buttonDiv,
              {
                height: 50,
                width: 140,
                backgroundColor: "green",
                marginTop: 20,
              },
            ]}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  mainDiv: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  mapDiv: {
    width: 300,
    height: 300,
    borderWidth: 1,
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 30,
  },
  buttonDiv: {
    backgroundColor: "rgb(0, 125, 200)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    elevation: 5,
    height: "100%",
    width: 70,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
