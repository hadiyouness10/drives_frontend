import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MapComponent } from "components";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useRef, useState } from "react";

export const DropPin = ({ route, navigation }) => {
  const {
    locationMarkers: {
      startLocationMarker,
      destinationMarker,
      setStartLocationMarker,
      setDestinationMarker,
    },
    position,
  } = route.params;

  const mapRef = useRef(null);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.dropMarkerText}>
        <Text style={{ fontSize: 22, color: "darkred" }}>
          Tap on the map to drop pin.
        </Text>
      </View>

      <MapComponent
        mapRef={mapRef}
        position={position}
        startLocationMarker={startLocationMarker}
        setStartLocationMarker={setStartLocationMarker}
        destinationMarker={destinationMarker}
        setDestinationMarker={setDestinationMarker}
      />

      <View style={styles.dropDoneButtonView}>
        <TouchableOpacity
          style={styles.dropDoneButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Done</Text>
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity
        onPress={async () => {
          startingInputRef.current.blur();
          let location = await Location.getCurrentPositionAsync({});
          setStartLocationMarker({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          mapRef.current.animateToRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }}
      >
        <MaterialIcons name="my-location" size={30} color="#404040" />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    flex: 1,
    backgroundColor: "white",
  },
  mapDiv: {
    flexGrow: 1,
    marginTop: -10,
    borderWidth: 1,
    borderColor: "red",
  },
  dropMarkerText: {
    position: "absolute",
    zIndex: 1,
    top: 50,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  dropDoneButtonView: {
    position: "absolute",
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  dropDoneButton: {
    width: "90%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(0, 150, 255)",
    elevation: 2,
  },
});
